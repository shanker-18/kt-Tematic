const express = require('express');
const router = express.Router();
const db = require('../config/database');

router.get('/', async (req, res) => {
  try {
    const categories = await db.AssetCategory.findAll();
    res.render('categories/list', { categories });
  } catch (err) {
    res.status(500).send('Error fetching categories: ' + err.message);
  }
});

router.get('/add', (req, res) => {
  res.render('categories/form', { category: null });
});

router.post('/add', async (req, res) => {
  try {
    await db.AssetCategory.create(req.body);
    res.redirect('/categories');
  } catch (err) {
    res.status(500).send('Error adding category: ' + err.message);
  }
});

router.get('/edit/:id', async (req, res) => {
  try {
    const category = await db.AssetCategory.findByPk(req.params.id);
    res.render('categories/form', { category });
  } catch (err) {
    res.status(500).send('Error: ' + err.message);
  }
});

router.post('/edit/:id', async (req, res) => {
  try {
    await db.AssetCategory.update(req.body, {
      where: { id: req.params.id }
    });
    res.redirect('/categories');
  } catch (err) {
    res.status(500).send('Error updating category: ' + err.message);
  }
});

module.exports = router;
