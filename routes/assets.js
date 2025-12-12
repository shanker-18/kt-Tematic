const express = require('express');
const router = express.Router();
const db = require('../config/database');

router.get('/', async (req, res) => {
  try {
    const { categoryId, search } = req.query;
    const where = { isObsolete: false };

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (search) {
      const like = { [db.Sequelize.Op.iLike]: `%${search}%` };
      where[db.Sequelize.Op.or] = [
        { make: like },
        { model: like },
        { serialNumber: like }
      ];
    }

    const assets = await db.Asset.findAll({
      where,
      include: [{ model: db.AssetCategory }]
    });

    const categories = await db.AssetCategory.findAll();
    res.render('assets/list', { assets, categories, categoryId, search });
  } catch (err) {
    res.status(500).send('Error fetching assets: ' + err.message);
  }
});

router.get('/add', async (req, res) => {
  try {
    const categories = await db.AssetCategory.findAll();
    res.render('assets/form', { asset: null, categories });
  } catch (err) {
    res.status(500).send('Error: ' + err.message);
  }
});

router.post('/add', async (req, res) => {
  try {
    const asset = await db.Asset.create(req.body);

    await db.AssetHistory.create({
      assetId: asset.id,
      action: 'Purchase',
      actionDate: asset.purchaseDate,
      amount: asset.purchasePrice,
      notes: `Asset purchased - ${asset.make} ${asset.model}`
    });

    res.redirect('/assets');
  } catch (err) {
    res.status(500).send('Error adding asset: ' + err.message);
  }
});

router.get('/edit/:id', async (req, res) => {
  try {
    const asset = await db.Asset.findByPk(req.params.id);
    const categories = await db.AssetCategory.findAll();
    res.render('assets/form', { asset, categories });
  } catch (err) {
    res.status(500).send('Error: ' + err.message);
  }
});

router.post('/edit/:id', async (req, res) => {
  try {
    await db.Asset.update(req.body, { where: { id: req.params.id } });
    res.redirect('/assets');
  } catch (err) {
    res.status(500).send('Error updating asset: ' + err.message);
  }
});

module.exports = router;
