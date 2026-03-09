import { Module, Global, OnModuleInit } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import { SupabaseAuthStrategy } from './supabase-auth.strategy';
import { FirebaseAuthStrategy } from './firebase-auth.strategy';
import { UsersModule } from '../users/users.module';

@Global()
@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'supabase-auth' }),
        UsersModule,
        ConfigModule,
    ],
    providers: [FirebaseAuthStrategy, SupabaseAuthStrategy],
    exports: [PassportModule],
})
export class AuthModule implements OnModuleInit {
    constructor(private readonly configService: ConfigService) { }

    onModuleInit() {
        const projectId = this.configService.get<string>('FIREBASE_PROJECT_ID');
        const clientEmail = this.configService.get<string>('FIREBASE_CLIENT_EMAIL');
        const privateKey = this.configService.get<string>('FIREBASE_PRIVATE_KEY');

        const isPlaceholder = (val: string) => !val || val.includes('YOUR_');

        if (isPlaceholder(projectId) || isPlaceholder(clientEmail) || isPlaceholder(privateKey)) {
            console.warn(
                '--- WARNING: Firebase Admin credentials are placeholders. Push notifications will not work! ---',
            );
            return;
        }

        // Initialize Firebase Admin SDK
        if (admin.apps.length === 0) {
            try {
                const formattedKey = privateKey.replace(/\\n/g, '\n').replace(/"/g, '');
                admin.initializeApp({
                    credential: admin.credential.cert({
                        projectId,
                        clientEmail,
                        privateKey: formattedKey,
                    }),
                });
                console.log('--- Firebase Admin Initialized Successfully ---');
            } catch (error) {
                console.error('--- ERROR: Failed to initialize Firebase Admin ---');
                console.error(error.message);
                console.warn('Push notifications and Firebase Auth features will be disabled.');
            }
        }
    }
}
