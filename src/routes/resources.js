const express = require('express');
const prisma = require('../db.js');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const [resources] = await prisma.resource.findMany();
    res.json(resources);
  } catch (error) {
    console.error('❌ Fehler bei der Abfrage:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;