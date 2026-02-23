import { Controller, Get, Param } from '@nestjs/common';
import { AmbitsService } from './ambits.service';

@Controller('ambits')
export class AmbitsController {
    constructor(private readonly ambitsService: AmbitsService) { }

    @Get()
    findAll() {
        return this.ambitsService.findAll();
    }

    @Get(':id/attributes')
    findAttributesByAmbit(@Param('id') id: string) {
        return this.ambitsService.findAttributesByAmbit(+id);
    }
}
