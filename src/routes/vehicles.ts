import { Router, Request, Response } from 'express';
import connection  from '../db';
import Vehicle from '../models/vehicle';
import { error } from 'console';
import jwt from 'jsonwebtoken';

import { generateToken, comparePasswords, hashPassword } from '../../auth.service';


const router = Router();
let vehicles: Vehicle[] = [];





// router.post('/login', async (req: Request, res: Response) => {
//     // Authenticate user (check username and password)
//     const validUser = await comparePasswords(req.body.password, 'FtmsPassword');
  
//     if (validUser) {
//       // Generate authentication token
//       const token = generateToken({ userId: 1, username: 'Jesse' });
//       res.json({ token });
//     } else {
//       res.status(401).json({ error: 'Invalid credentials' });
//     }
//   });
  
//   // Other routes requiring authentication
//   router.get('/', async (req: Request, res: Response) => {
//     // Check the presence of the authentication token in the request headers
//     const token = req.headers.authorization?.replace('Bearer ', '');
    
//     if (!token) {
//       return res.status(401).json({ error: 'Unauthorized' });
//     }
  
//     try {
//       // Verify the token
//       const decoded = jwt.verify(token, 'Jesse_API_Key');
//       // If verification is successful, proceed with the route logic
//       res.json({ message: 'Authenticated route', user: decoded });
//     } catch (error) {
//       // If verification fails, send an unauthorized response
//       res.status(401).json({ error: 'Unauthorized' });
//     }
//   });

// CRUD Implementation start

// Create
router.post('/', async(req: Request, res: Response) => {
    try{
        const newVehicle = await Vehicle.create({
            registration: req.body.registration,
            model: req.body.model,
            completed: req.body.completed || false,
        });

        res.status(201).json(newVehicle);
    } catch (error) {
        console.error('Error adding vehicle:', error);
        res.status(500).send('Internal server error');
    }
});

//  Read all vehicles
router.get('/', async (req: Request, res: Response) => {
    try {
        const vehicles = await Vehicle.findAll();
        res.json(vehicles);
    } catch (error) {
        console.error('Error fetching vehicles:', error);
        res.status(500).send('Internal server error');
    }
});


// Read a single vehicle
router.get('/:id', async (req: Request, res: Response) => {
    try {
      const vehicle = await Vehicle.findByPk(req.params.id);
  
      if (!vehicle) {
        res.status(404).send('Vehicle not found');
      } else {
        res.json(vehicle);
      }
    } catch (error) {
      console.error('Error fetching vehicle:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  // Update a vehicle by ID
  router.put('/:id', async (req: Request, res: Response) => {
    try {
      const vehicle = await Vehicle.findByPk(req.params.id);
  
      if (!vehicle) {
        res.status(404).send('Vehicle not found');
      } else {
        await vehicle.update({
          registration: req.body.registration || vehicle.registration,
          model: req.body.model || vehicle.model,
          completed: req.body.completed || vehicle.completed,
        });
  
        res.json(vehicle);
      }
    } catch (error) {
      console.error('Error updating vehicle:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  // Delete a vehicle by ID
  router.delete('/:id', async (req: Request, res: Response) => {
    try {
      const vehicle = await Vehicle.findByPk(req.params.id);
  
      if (!vehicle) {
        res.status(404).send('Vehicle not found');
      } else {
        await vehicle.destroy();
        res.status(204).send();
      }
    } catch (error) {
      console.error('Error deleting vehicle:', error);
      res.status(500).send('Internal Server Error');
    }
  });


// CRUD Implementation end

export default router;

