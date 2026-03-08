import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { Contact } from './contact.entity';
import { SupabaseAuthGuard } from '../auth/supabase-auth.guard';

@Controller('contacts')
export class ContactsController {
    constructor(private readonly contactsService: ContactsService) { }

    @UseGuards(SupabaseAuthGuard)
    @Get()
    findAll(@Request() req: any) {
        // req.user es inyectado por Passport después de validar el token de Supabase
        const userId = req.user.id;
        return this.contactsService.findAllByUser(userId);
    }

    @UseGuards(SupabaseAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.contactsService.findOne(+id);
    }

    @UseGuards(SupabaseAuthGuard)
    @Post()
    create(@Request() req: any, @Body() contact: Partial<Contact>) {
        contact.user_id = req.user.id;
        return this.contactsService.create(contact);
    }
}
