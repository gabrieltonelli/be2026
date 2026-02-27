import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ContactsModule } from './contacts/contacts.module';
import { RatingsModule } from './ratings/ratings.module';
import { AmbitsModule } from './ambits/ambits.module';
import { SeedModule } from './seed/seed.module';
import { AuthModule } from './auth/auth.module';

import { SupabaseModule } from './supabase/supabase.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => {
                const dbConfig = {
                    type: 'postgres' as const,
                    host: configService.get<string>('DB_HOST'),
                    port: configService.get<number>('DB_PORT'),
                    username: configService.get<string>('DB_USERNAME'),
                    password: configService.get<string>('DB_PASSWORD'),
                    database: configService.get<string>('DB_DATABASE'),
                    entities: [__dirname + '/**/*.entity{.ts,.js}'],
                    synchronize: true,
                    ssl: {
                        rejectUnauthorized: false,
                    },
                };
                console.log('--- Initializing TypeORM with: ---');
                console.log('Host:', dbConfig.host);
                console.log('User:', dbConfig.username);
                return dbConfig;
            },
            inject: [ConfigService],
        }),
        SupabaseModule,
        UsersModule,
        ContactsModule,
        RatingsModule,
        AmbitsModule,
        SeedModule,
        AuthModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }
