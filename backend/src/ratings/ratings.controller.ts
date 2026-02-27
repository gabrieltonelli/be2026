import { Controller, Post, Body, Get, Param, UseGuards, Request } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { Rating } from './rating.entity';
import { SupabaseAuthGuard } from '../auth/supabase-auth.guard';

@Controller('ratings')
export class RatingsController {
    constructor(private readonly ratingsService: RatingsService) { }

    @UseGuards(SupabaseAuthGuard)
    @Post()
    create(@Request() req: any, @Body() ratingData: Partial<Rating>) {
        // El usuario que califica es el usuario autenticado
        ratingData.from_user_id = req.user.id;
        return this.ratingsService.create(ratingData);
    }

    @UseGuards(SupabaseAuthGuard)
    @Get('contact/:id')
    findByContact(@Param('id') id: string) {
        return this.ratingsService.findByContact(+id);
    }
}
