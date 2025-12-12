const express = require('express');
const router = express.Router();
const db = require('../config/database');

router.get('/', async (req, res) => {
  try {
    const stockData = await db.Asset.findAll({
      where: {
        status: 'available',
        isObsolete: false
      },
      include: [{ model: db.AssetCategory }],
      attributes: [
        'branch',
        [db.sequelize.fn('COUNT', db.sequelize.col('Asset.id')), 'count'],
        [db.sequelize.fn('SUM', db.sequelize.col('purchasePrice')), 'totalValue']
      ],
      group: ['branch', 'AssetCategory.id', 'AssetCategory.name']
    });

    res.render('stock/view', { stockData });
  } catch (err) {
    res.status(500).send('Error fetching stock data: ' + err.message);
  }
});

module.exports = router;
