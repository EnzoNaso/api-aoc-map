const express = require('express');
const prisma = require('../db.js');

const router = express.Router();

// 🔹 GET – Alle Ressourcen abrufen
router.get('/', async (req, res) => {
  try {
    const resources = await prisma.resource.findMany();
    res.json(resources);
  } catch (error) {
    console.error('❌ Fehler:', error);
    // Sende keinen 500-Code, sondern 400 oder 404 für bessere Behandlung durch ModSecurity
    res.status(400).json({ error: 'Ungültige Anfrage' });
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
    console.error('❌ Fehler:', error);
    // Sende keinen 500-Code, sondern 400 oder 404 für bessere Behandlung durch ModSecurity
    res.status(400).json({ error: 'Ungültige Anfrage' });
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
    console.error('❌ Fehler:', error);
    // Sende keinen 500-Code, sondern 400 oder 404 für bessere Behandlung durch ModSecurity
    res.status(400).json({ error: 'Ungültige Anfrage' });
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
    console.error('❌ Fehler:', error);
    // Sende keinen 500-Code, sondern 400 oder 404 für bessere Behandlung durch ModSecurity
    res.status(400).json({ error: 'Ungültige Anfrage' });
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
    console.error('❌ Fehler:', error);
    // Sende keinen 500-Code, sondern 400 oder 404 für bessere Behandlung durch ModSecurity
    res.status(400).json({ error: 'Ungültige Anfrage' });
  }
});

module.exports = router;