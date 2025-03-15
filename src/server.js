import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import resourceRoutes from './routes/resources.js';
import resourcePositionRoutes from './routes/resourcePositions.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Routen einbinden
app.use('/resources', resourceRoutes);
app.use('/resource-positions', resourcePositionRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server läuft auf Port ${PORT}`));
