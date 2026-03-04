import jwt, { JwtPayload, Secret, SignOptions } from 'jsonwebtoken';

const generateToken = <T extends object>(
    payload: T,
    secret: Secret,
    expiresIn: SignOptions['expiresIn']
): string => {
    return jwt.sign(payload, secret, {
        expiresIn,
        algorithm: 'HS256',
    });
};

const verifyToken = <T extends JwtPayload>(
    token: string,
    secret: Secret
): T => {
    const decoded = jwt.verify(token, secret);

    if (typeof decoded === 'string') {
        throw new Error('Invalid token payload');
    }

    return decoded as T;
};

export const jwtHelpers = {
    generateToken,
    verifyToken,
};
