"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vehicle_1 = __importDefault(require("../models/vehicle"));
const auth_middleware_1 = require("./auth.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticateToken);
let vehicles = [];
// CRUD Implementation start
// Create
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newVehicle = yield vehicle_1.default.create({
            registration: req.body.registration,
            model: req.body.model,
            completed: req.body.completed || false,
        });
        res.status(201).json(newVehicle);
    }
    catch (error) {
        console.error('Error adding vehicle:', error);
        res.status(500).send('Internal server error');
    }
}));
//  Read all vehicles
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vehicles = yield vehicle_1.default.findAll();
        res.json(vehicles);
    }
    catch (error) {
        console.error('Error fetching vehicles:', error);
        res.status(500).send('Internal server error');
    }
}));
// Read a single vehicle
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vehicle = yield vehicle_1.default.findByPk(req.params.id);
        if (!vehicle) {
            res.status(404).send('Vehicle not found');
        }
        else {
            res.json(vehicle);
        }
    }
    catch (error) {
        console.error('Error fetching vehicle:', error);
        res.status(500).send('Internal Server Error');
    }
}));
// Update a vehicle by ID
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vehicle = yield vehicle_1.default.findByPk(req.params.id);
        if (!vehicle) {
            res.status(404).send('Vehicle not found');
        }
        else {
            yield vehicle.update({
                registration: req.body.registration || vehicle.registration,
                model: req.body.model || vehicle.model,
                completed: req.body.completed || vehicle.completed,
            });
            res.json(vehicle);
        }
    }
    catch (error) {
        console.error('Error updating vehicle:', error);
        res.status(500).send('Internal Server Error');
    }
}));
// Delete a vehicle by ID
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vehicle = yield vehicle_1.default.findByPk(req.params.id);
        if (!vehicle) {
            res.status(404).send('Vehicle not found');
        }
        else {
            yield vehicle.destroy();
            res.status(204).send();
        }
    }
    catch (error) {
        console.error('Error deleting vehicle:', error);
        res.status(500).send('Internal Server Error');
    }
}));
// CRUD Implementation end
exports.default = router;
