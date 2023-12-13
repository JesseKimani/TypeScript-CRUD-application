import express , {Request , Response} from 'express';
import vehicleRoutes from './routes/vehicles';
import mysql from 'mysql';
import connection from './db';
import authRoutes from './routes/auth.routes';

import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // Place this middleware before your routes


app.use('/vehicles', vehicleRoutes);
app.use('/auth', authRoutes);

app.get ('/', (req: Request, res: Response) => {
    res.send('Hello, Typescript Express!');
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);

});





