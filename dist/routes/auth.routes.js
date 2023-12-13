"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_model_1 = require("../models/user.model");
const jwt = __importStar(require("jsonwebtoken"));
const router = (0, express_1.Router)();
// Login endpoint
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const user = yield user_model_1.User.findOne({ where: { username } });
        if (!user || password !== user.password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user.id }, 'JesseAPIkey', { expiresIn: '1h' });
        const refreshToken = jwt.sign({ userId: user.id }, 'JesseRefreshToken', { expiresIn: '7d' });
        res.status(200).json({ token, refreshToken });
    }
    catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));
// Refresh
router.post('/refresh-token', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.body;
    try {
        const decoded = jwt.verify(refreshToken, 'RefreshTokenSecret');
        const user = yield user_model_1.User.findByPk(decoded.userId);
        if (!user) {
            return res.status(401).json({ message: 'Invalid refresh token' });
        }
        const newAccessToken = jwt.sign({ userId: user.id }, 'JesseAPIkey', { expiresIn: '1h' });
        res.status(200).json({ accessToken: newAccessToken });
    }
    catch (error) {
        console.error('Error refreshing token:', error);
        res.status(401).json({ message: 'Invalid refresh token' });
    }
}));
exports.default = router;
