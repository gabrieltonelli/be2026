import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';
import { SupabaseClient } from '@supabase/supabase-js';
import { UsersService } from '../users/users.service';

@Injectable()
export class SupabaseAuthStrategy extends PassportStrategy(Strategy, 'supabase-auth') {
    constructor(
        @Inject('SUPABASE_CLIENT')
        private readonly supabase: SupabaseClient,
        private readonly usersService: UsersService,
    ) {
        super();
    }

    async validate(token: string) {
        try {
            // 1. Validar el token contra Supabase
            const { data: { user: supabaseUser }, error } = await this.supabase.auth.getUser(token);

            if (error || !supabaseUser) {
                throw new UnauthorizedException('Token de Supabase inválido o expirado');
            }

            // 2. Buscar al usuario en nuestra DB por su supabase_uid
            let user = await this.usersService.findOneBySupabaseUid(supabaseUser.id);

            // 3. Auto-provisión: Si no existe en nuestra DB, lo creamos
            if (!user) {
                user = await this.usersService.create({
                    supabase_uid: supabaseUser.id,
                    email: supabaseUser.email,
                    name: supabaseUser.user_metadata?.full_name || supabaseUser.email,
                    avatar_url: supabaseUser.user_metadata?.avatar_url || '',
                });
            }

            // 4. Retornar el usuario para req.user
            return user;
        } catch (error) {
            console.error('Error validando token de Supabase:', error);
            throw new UnauthorizedException('Error de autenticación con Supabase');
        }
    }
}
