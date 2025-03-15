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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server läuft auf Port ${PORT}`));