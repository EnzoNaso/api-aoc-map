const express = require('express');
const prisma = require('../db.js');
const { v4: uuid } = require('uuid');

const router = express.Router();

// 🔹 GET – Alle Positionen abrufen
router.get('/', async (req, res) => {
  try {
    const positions = await prisma.resourcePosition.findMany({
      include: {
        resource: true // Gibt die zugehörige Resource mit aus
      }
    });
    res.json(positions);
  } catch (error) {
    console.error('❌ Fehler:', error);
    // Sende keinen 500-Code, sondern 400 oder 404 für bessere Behandlung durch ModSecurity
    res.status(400).json({ error: 'Ungültige Anfrage' });
  }
});

// 🔹 GET – Einzelne Position nach ID abrufen
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const position = await prisma.resourcePosition.findUnique({
      where: { id },
      include: {
        resource: true
      }
    });

    if (!position) {
      return res.status(404).json({ error: 'Position nicht gefunden' });
    }

    res.json(position);
  } catch (error) {
    console.error('❌ Fehler:', error);
    // Sende keinen 500-Code, sondern 400 oder 404 für bessere Behandlung durch ModSecurity
    res.status(400).json({ error: 'Ungültige Anfrage' });
  }
});

// 🔹 POST – Neue Position erstellen
router.post('/', async (req, res) => {
  try {
    const { resourceId, description, lat, lng, rarity, image, lastHarvest } = req.body;

    const newPosition = await prisma.resourcePosition.create({
      data: {
        id: uuid(), // ✅ Automatisch eine UUID generieren
        resourceId,
        description,
        lat,
        lng,
        rarity,
        image: image ? Buffer.from(image, 'base64') : undefined,
        lastHarvest: lastHarvest ? new Date(lastHarvest) : undefined
      }
    });

    res.status(201).json(newPosition);
  } catch (error) {
    console.error('❌ Fehler:', error);
    // Sende keinen 500-Code, sondern 400 oder 404 für bessere Behandlung durch ModSecurity
    res.status(400).json({ error: 'Ungültige Anfrage' });
  }
});

// 🔹 PUT – Bestehende Position aktualisieren
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { resourceId, description, lat, lng, rarity, image, lastHarvest } = req.body;

    const updatedPosition = await prisma.resourcePosition.update({
      where: { id },
      data: {
        resourceId,
        description,
        lat,
        lng,
        rarity,
        image: image ? Buffer.from(image, 'base64') : undefined,
        lastHarvest: lastHarvest ? new Date(lastHarvest) : undefined
      }
    });

    res.json(updatedPosition);
  } catch (error) {
    console.error('❌ Fehler:', error);
    // Sende keinen 500-Code, sondern 400 oder 404 für bessere Behandlung durch ModSecurity
    res.status(400).json({ error: 'Ungültige Anfrage' });
  }
});

// 🔹 DELETE – Position löschen
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.resourcePosition.delete({
      where: { id }
    });

    res.json({ message: 'Position erfolgreich gelöscht' });
  } catch (error) {
    console.error('❌ Fehler:', error);
    // Sende keinen 500-Code, sondern 400 oder 404 für bessere Behandlung durch ModSecurity
    res.status(400).json({ error: 'Ungültige Anfrage' });
  }
});

module.exports = router;