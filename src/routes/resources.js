import express from 'express';
import prisma from '../db.js';

const router = express.Router();

// 🔹 GET – Alle Ressourcen abrufen
router.get('/', async (req, res) => {
  try {
    const resources = await prisma.resource.findMany();
    res.json(resources);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔹 GET – Einzelne Ressource nach ID abrufen
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const resource = await prisma.resource.findUnique({
      where: { id }
    });

    if (!resource) {
      return res.status(404).json({ error: 'Ressource nicht gefunden' });
    }

    res.json(resource);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔹 POST – Neue Ressource erstellen
router.post('/', async (req, res) => {
  try {
    const { id, name, type, respawnTimer } = req.body;

    // ✅ Prisma-Client verwenden, um die Ressource zu erstellen
    const newResource = await prisma.resource.create({
      data: {
        id,
        name,
        type,
        respawnTimer
      }
    });

    res.status(201).json(newResource);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔹 PUT – Bestehende Ressource aktualisieren
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type, respawnTimer } = req.body;

    // ✅ Prisma-Client verwenden, um die Ressource zu aktualisieren
    const updatedResource = await prisma.resource.update({
      where: { id },
      data: {
        name,
        type,
        respawnTimer
      }
    });

    res.json(updatedResource);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔹 DELETE – Ressource löschen
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.resource.delete({
      where: { id }
    });

    res.json({ message: 'Ressource erfolgreich gelöscht' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
