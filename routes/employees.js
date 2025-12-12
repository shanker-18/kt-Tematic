const express = require('express');
const router = express.Router();
const db = require('../config/database');

router.get('/', async (req, res) => {
  try {
    const { status, search } = req.query;
    const where = {};

    if (status) {
      where.isActive = status === 'active';
    }

    if (search) {
      const like = { [db.Sequelize.Op.iLike]: `%${search}%` };
      where[db.Sequelize.Op.or] = [
        { name: like },
        { email: like },
        { department: like }
      ];
    }

    const employees = await db.Employee.findAll({ where });
    res.render('employees/list', { employees, status, search });
  } catch (err) {
    res.status(500).send('Error fetching employees: ' + err.message);
  }
});

router.get('/add', (req, res) => {
  res.render('employees/form', { employee: null });
});

router.post('/add', async (req, res) => {
  try {
    await db.Employee.create(req.body);
    res.redirect('/employees');
  } catch (err) {
    res.status(500).send('Error adding employee: ' + err.message);
  }
});

router.get('/edit/:id', async (req, res) => {
  try {
    const employee = await db.Employee.findByPk(req.params.id);
    res.render('employees/form', { employee });
  } catch (err) {
    res.status(500).send('Error fetching employee: ' + err.message);
  }
});

router.post('/edit/:id', async (req, res) => {
  try {
    await db.Employee.update(req.body, {
      where: { id: req.params.id }
    });
    res.redirect('/employees');
  } catch (err) {
    res.status(500).send('Error updating employee: ' + err.message);
  }
});

module.exports = router;
