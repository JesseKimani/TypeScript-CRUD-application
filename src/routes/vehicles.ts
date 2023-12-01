import { Router, Request, Response } from 'express';
import connection  from '../db';
import { Vehicle } from '../models/vehicle';
import { error } from 'console';

const router = Router();
let vehicles: Vehicle[] = [];

// CRUD Implementation start

router.post('/', (req:Request, res: Response) => {
    const vehicle: Vehicle = {
        id: vehicles.length + 1,
        registration: req.body.registration,
        model: req.body.model,
        completed: false,

    };

    // vehicles.push(vehicle);
    // res.status(201).json(vehicle)

    connection.query('INSERT INTO vehicles SET ?', vehicle, (error, results) => {
        if (error) {
            console.error('Error adding vehicle:', error);
            res.status(500).send('Internal Server Error');
        } else{
            vehicle.id = results.insertId;
            res.status(201).json(vehicle);
        }

    });

});

//  Read all vehicles
router.get('/', (req: Request, res: Response) => {
    // res.json(vehicles)
    connection.query('SELECT * FROM vehicles', (error, results: Vehicle[]) => {
        if (error) {
            console.error('Error fetching vehicles:', error);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(results);
        }
    });

});


// Read a single vehicle
router.get('/:id', (req:Request, res: Response) => {
    // const vehicle = vehicles.find((t) => t.id === parseInt(req.params.id));
    const vehicleId = req.params.id;
    connection.query('SELECT * FROM vehicles WHERE id = ?', [vehicleId], (error, results: Vehicle[]) => {
        if (error) {
            console.error('Error fetching vehicle:', error);
            res.status(500).send('Internal Server Error');
        } else if (results.length === 0) {
            res.status(404).send('Vehicle not found');
        } else {
            res.json(results[0]);
        }

    });

    // if (!vehicle) {
    //     res.status(404).send('Vehicle not found');
    // } else {
    //     res.json(vehicle); 
    // }
    
});


// Update a vehicle
router.put('/:id', (req: Request, res: Response) => {
    const vehicleId = req.params.id;
    const updatedVehicle: Vehicle = {
        id: parseInt(vehicleId),
        registration: req.body.registration,
        model: req.body.model,
        completed: req.body.completed,
    };

    connection.query('UPDATE vehicles SET ? WHERE id = ?', [updatedVehicle, vehicleId], (error) => {
        if (error) {
            console.error('Error updating vehicle:', error);
            res.status(500).send('Internal server error');
        } else {
            res.json(updatedVehicle);
        }

    });

});


// Delete vehicle
router.delete('/:id', (req: Request, res: Response) => {
    const vehicleId = req.params.id;
    connection.query('DELETE FROM vehicles WHERE id = ?', [vehicleId], (error) => {
        if (error) {
            console.error('Error deleting vehicle:', error);
            res.status(500).send('Internal Server Error');
        } else {
            res.status(204).send()
        }
    });  
    
  });



// CRUD Implementation end

export default router;

