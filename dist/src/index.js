"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const vehicles_1 = __importDefault(require("./routes/vehicles"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json()); // Place this middleware before your routes
app.use('/vehicles', vehicles_1.default);
app.use('/auth', auth_routes_1.default);
app.get('/', (req, res) => {
    res.send('Hello, Typescript Express!');
});
app.listen(port, () => {
    console.log('Server running at http://localhost:${port}');
});
