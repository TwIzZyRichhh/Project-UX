
import express, {
  type Express,
  type Request,
  type Response
} from 'express';

import db from '../src/database.ts';

const app: Express = express();

app.use(express.json());

app.get('/restaurants', async (req: Request, res: Response) => {
  try {
    const [restaurants] = await db.query(
      'SELECT * FROM restaurants'
    );

    res.json(restaurants);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Tietokantavirhe'
    });
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
