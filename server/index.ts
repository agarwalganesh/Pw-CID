import express from 'express';
import cors from 'cors';
import { getDb } from './db.js';
import { seedDatabase } from './seedData.js';
import { categoriesRouter } from './routes/categories.js';
import { fitmentRouter } from './routes/fitment.js';
import { pitchRouter } from './routes/pitch.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/categories', categoriesRouter);
app.use('/api/fitment', fitmentRouter);
app.use('/api/pitch', pitchRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'EdTech Counsellor Intelligence API'
  });
});

async function startServer() {
  try {
    const db = await getDb();
    await seedDatabase(db);

    app.listen(PORT, () => {
      console.log(`🚀 EdTech Counsellor Intelligence Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to initialize server and database:', error);
    process.exit(1);
  }
}

startServer();
