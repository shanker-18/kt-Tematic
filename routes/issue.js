const express = require('express');
const router = express.Router();
const db = require('../config/database');

router.get('/', async (req, res) => {
  try {
    const employees = await db.Employee.findAll({ where: { isActive: true } });

    const assets = await db.Asset.findAll({
      where: { status: 'available', isObsolete: false },
      include: [{ model: db.AssetCategory }]
    });

    res.render('issue/form', { employees, assets });
  } catch (err) {
    res.status(500).send('Error: ' + err.message);
  }
});

router.post('/', async (req, res) => {
  try {
    const { assetId, employeeId, notes } = req.body;

    await db.Issue.create({
      assetId,
      employeeId,
      notes
    });

    await db.Asset.update(
      { status: 'issued' },
      { where: { id: assetId } }
    );

    await db.AssetHistory.create({
      assetId,
      employeeId,
      action: 'Issued',
      notes
    });

    res.redirect('/issue');
  } catch (err) {
    res.status(500).send('Error issuing asset: ' + err.message);
  }
});

module.exports = router;
