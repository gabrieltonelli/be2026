import { Module, Global, OnModuleInit } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import { FirebaseAuthStrategy } from './firebase-auth.strategy';
import { UsersModule } from '../users/users.module';

@Global()
@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'firebase-auth' }),
        UsersModule,
        ConfigModule,
    ],
    providers: [FirebaseAuthStrategy],
    exports: [PassportModule],
})
export class AuthModule implements OnModuleInit {
    constructor(private readonly configService: ConfigService) { }

    onModuleInit() {
        const projectId = this.configService.get<string>('FIREBASE_PROJECT_ID');
        const clientEmail = this.configService.get<string>('FIREBASE_CLIENT_EMAIL');
        const privateKey = this.configService.get<string>('FIREBASE_PRIVATE_KEY');

        if (!projectId || !clientEmail || !privateKey) {
            console.warn(
                '--- WARNING: Firebase Admin credentials missing. Auth will fail! ---',
            );
            return;
        }

        // Initialize Firebase Admin SDK
        if (admin.apps.length === 0) {
            admin.initializeApp({
                credential: admin.credential.cert({
                    projectId,
                    clientEmail,
                    privateKey: privateKey.replace(/\\n/g, '\n'),
                }),
            });
            console.log('--- Firebase Admin Initialized Successfully ---');
        }
    }
}
