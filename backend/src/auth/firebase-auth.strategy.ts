import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';
import * as admin from 'firebase-admin';
import { UsersService } from '../users/users.service';

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(Strategy, 'firebase-auth') {
    constructor(private readonly usersService: UsersService) {
        super();
    }

    async validate(token: string) {
        try {
            // 1. Validar el token contra Firebase Admin
            const decodedToken = await admin.auth().verifyIdToken(token);

            if (!decodedToken) {
                throw new UnauthorizedException('Token inválido');
            }

            // 2. Buscar al usuario en nuestra DB de MySQL por su firebase_uid
            let user = await this.usersService.findOneByFirebaseUid(decodedToken.uid);

            // 3. Auto-provisión: Si no existe, lo creamos
            if (!user) {
                user = await this.usersService.create({
                    firebase_uid: decodedToken.uid,
                    email: decodedToken.email,
                    name: decodedToken.name || decodedToken.email,
                    avatar_url: decodedToken.picture || '',
                });
            }

            // 4. Retornar el usuario para que Passport lo inyecte en req.user
            return user;
        } catch (error) {
            console.error('Error validando token de Firebase:', error);
            throw new UnauthorizedException('Error de autenticación');
        }
    }
}
