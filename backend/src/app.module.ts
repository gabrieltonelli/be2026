import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ContactsModule } from './contacts/contacts.module';
import { RatingsModule } from './ratings/ratings.module';
import { AmbitsModule } from './ambits/ambits.module';
import { SeedModule } from './seed/seed.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get<string>('DB_HOST', 'localhost'),
                port: configService.get<number>('DB_PORT', 5432),
                username: configService.get<string>('DB_USERNAME', 'postgres'),
                password: configService.get<string>('DB_PASSWORD', ''),
                database: configService.get<string>('DB_DATABASE', 'postgres'),
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: true, // Only for development
                ssl: {
                    rejectUnauthorized: false,
                },
            }),
            inject: [ConfigService],
        }),
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
