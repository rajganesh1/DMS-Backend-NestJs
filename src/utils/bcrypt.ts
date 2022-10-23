/* eslint-disable prettier/prettier */
import * as bcrypt from 'bcrypt';
const salt = 10;

export function hashPassword(rawPassword: string) {
    return bcrypt.hashSync(rawPassword, salt);
}

export function comparePassword(rawPassword: string, hashedPassword: string) {
    return bcrypt.compareSync(rawPassword, hashedPassword);
}