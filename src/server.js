const express = require('express');
const cors = require('cors');
const path = require("path");
const dotenv = require('dotenv');
const fs = require('fs');
const helmet = require('helmet');
const logStream = fs.createWriteStream(path.join(__dirname, 'logs/app.log'), { flags: 'a' });

const resourceRoutes = require('./routes/resources.js');
const resourcePositionRoutes = require('./routes/resourcePositions.js');

dotenv.config();

const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(helmet());

// ✅ Routen einbinden
app.use('/resources', resourceRoutes);
app.use('/resource-positions', resourcePositionRoutes);

// 🛑 Fehlerbehandlung für nicht gefundene Routen
app.use((req, res) => {
    if (req.accepts('json')) {
        res.status(404).json({ success: false, message: 'Route nicht gefunden' });
    } else {
        res.status(404).send('<h1>404 - Route nicht gefunden</h1>');
    }
});

// 🛑 Globaler Error-Handler
app.use((err, req, res, next) => {
    const logMessage = `[${new Date().toISOString()}] ${req.method} ${req.url} - Error: ${err.message}\n`;
    logStream.write(logMessage);
    console.error(logMessage);

    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Ein interner Serverfehler ist aufgetreten.',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server läuft auf Port ${PORT}`));