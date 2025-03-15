const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const resourceRoutes = require('./routes/resources.js');
const resourcePositionRoutes = require('./routes/resourcePositions.js');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Routen einbinden
app.use('/resources', resourceRoutes);
app.use('/resource-positions', resourcePositionRoutes);

// 🛑 Fehlerbehandlung für nicht gefundene Routen
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: 'Die angeforderte Route wurde nicht gefunden.',
    });
});

// 🛑 Globaler Error-Handler
app.use((err, req, res, next) => {
    console.error('💥 Fehler: ', err.message);

    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Ein interner Serverfehler ist aufgetreten.',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }) // Stack-Trace nur in Entwicklung anzeigen
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server läuft auf Port ${PORT}`));