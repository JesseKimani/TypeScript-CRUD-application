import express , {Request , Response} from 'express';
import vehicleRoutes from './routes/vehicles';
import mysql from 'mysql';
import connection from './db';

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use('/vehicles', vehicleRoutes);

app.get ('/', (req: Request, res: Response) => {
    res.send('Hello, Typescript Express!');
});


app.listen(port, () => {
    console.log('Server running at http://localhost:${port}');
});





