const express = require('express');
const router = express.Router();
const db = require('../config/database');

router.get('/', async (req, res) => {
  try {
    const assets = await db.Asset.findAll({
      where: {
        status: 'available',
        isObsolete: false
      },
      include: [{ model: db.AssetCategory }]
    });

    res.render('scrap/list', { assets });
  } catch (err) {
    res.status(500).send('Error: ' + err.message);
  }
});

router.post('/:id', async (req, res) => {
  try {
    const { notes } = req.body;
    const assetId = req.params.id;

    await db.Asset.update(
      { status: 'scrapped', isObsolete: true },
      { where: { id: assetId } }
    );

    await db.AssetHistory.create({
      assetId,
      action: 'Scrapped',
      notes
    });

    res.redirect('/scrap');
  } catch (err) {
    res.status(500).send('Error scrapping asset: ' + err.message);
  }
});

module.exports = router;
