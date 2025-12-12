const express = require('express');
const router = express.Router();
const db = require('../config/database');

router.get('/', async (req, res) => {
  try {
    const issuedAssets = await db.Issue.findAll({
      where: { isActive: true },
      include: [
        { model: db.Employee },
        {
          model: db.Asset,
          include: [{ model: db.AssetCategory }]
        }
      ]
    });

    res.render('return/form', { issuedAssets });
  } catch (err) {
    res.status(500).send('Error: ' + err.message);
  }
});

router.post('/', async (req, res) => {
  try {
    const { issueId, reason, notes } = req.body;

    const issue = await db.Issue.findByPk(issueId);

    await db.Return.create({
      assetId: issue.assetId,
      employeeId: issue.employeeId,
      reason,
      notes
    });

    await db.Issue.update(
      { isActive: false },
      { where: { id: issueId } }
    );

    await db.Asset.update(
      { status: 'available' },
      { where: { id: issue.assetId } }
    );

    await db.AssetHistory.create({
      assetId: issue.assetId,
      employeeId: issue.employeeId,
      action: 'Returned',
      notes: `Reason: ${reason}. ${notes || ''}`
    });

    res.redirect('/return');
  } catch (err) {
    res.status(500).send('Error returning asset: ' + err.message);
  }
});

module.exports = router;
