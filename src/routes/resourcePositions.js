const express = require('express');
const prisma = require('../db.js');
const { v4: uuid } = require('uuid');

const router = express.Router();

// 🔹 GET – Alle Positionen abrufen
router.get('/', async (req, res) => {
  try {
    const positions = await prisma.resourcePosition.findMany();
    res.json(positions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;