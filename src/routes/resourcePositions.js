import express from 'express';
import prisma from '../db.js';
import { v4 as uuid } from 'uuid';

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
    res.status(500).json({ error: error.message });
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
    res.status(500).json({ error: error.message });
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
    res.status(500).json({ error: error.message });
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
    res.status(500).json({ error: error.message });
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
    res.status(500).json({ error: error.message });
  }
});

export default router;
