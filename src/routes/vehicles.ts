import { Router, Request, Response } from 'express';
import connection  from '../db';
import Vehicle from '../models/vehicle';
import { error } from 'console';
import jwt from 'jsonwebtoken';

import { generateToken, comparePasswords, hashPassword } from '../auth.service';
import { authenticateToken } from './auth.middleware';


const router = Router();

router.use(authenticateToken);

let vehicles: Vehicle[] = [];


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

