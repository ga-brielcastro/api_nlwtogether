import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
    sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    // Receber o token
    const authToken = request.headers.authorization; //vai vim aqui o token

    // Validar se token está preenchido
    if (!authToken) {
        return response.status(401).end();
    }
    
    // Validar se token é válido
    const [, token] = authToken.split(" ");

    try {
        // Recuperar informações do user
        const { sub } = verify(token, 'usuario') as IPayload;

        request.user_id = sub;

        return next();

    } catch (err) {
        return response.status(401).end();
    }

    
}
