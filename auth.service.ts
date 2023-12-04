import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const generateToken = (payload: any): string => {
    return jwt.sign(payload, 'Jesse_API_Key', { expiresIn: '1h'});
};

const hashPassword = async (password: string): Promise<string> => {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
};

const comparePasswords = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
    return bcrypt.compare(plainPassword, hashedPassword);
};

export { generateToken, hashPassword, comparePasswords};
