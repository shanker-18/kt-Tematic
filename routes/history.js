const express = require('express');
const router = express.Router();
const db = require('../config/database');

router.get('/', async (req, res) => {
  try {
    const history = await db.AssetHistory.findAll({
      include: [
        {
          model: db.Asset,
          include: [{ model: db.AssetCategory }]
        },
        { model: db.Employee }
      ],
      order: [['actionDate', 'ASC']]
    });

    const assets = await db.Asset.findAll({
      include: [{ model: db.AssetCategory }]
    });

    res.render('history/view', { history, assets, asset: null });
  } catch (err) {
    res.status(500).send('Error fetching history: ' + err.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const asset = await db.Asset.findByPk(req.params.id, {
      include: [{ model: db.AssetCategory }]
    });

    const history = await db.AssetHistory.findAll({
      where: { assetId: req.params.id },
      include: [
        {
          model: db.Asset,
          include: [{ model: db.AssetCategory }]
        },
        { model: db.Employee }
      ],
      order: [['actionDate', 'ASC']]
    });

    const assets = await db.Asset.findAll({
      include: [{ model: db.AssetCategory }]
    });

    res.render('history/view', { history, assets, asset });
  } catch (err) {
    res.status(500).send('Error fetching history: ' + err.message);
  }
});

module.exports = router;
