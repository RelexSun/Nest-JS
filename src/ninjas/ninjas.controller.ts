import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';
import { BeltGuard } from 'src/belt/belt.guard';

@Controller('ninjas')
// @UseGuards(BeltGuard) // Protecting route
export class NinjasController {
  constructor(private readonly ninjasService: NinjasService) {}

  // GET /ninjas?weapon=fast --> []
  @Get()
  getNinjas(@Query('weapon') weapon: 'stars' | 'nunchucks') {
    // const service = new NinjasService();
    return this.ninjasService.getNinjas(weapon);
  }

  // GET /ninjas/:id --> {...}
  @Get(':id')
  getOneNinja(@Param('id', ParseIntPipe) id: number) {
    // ParseIntPipe instead of typecast
    try {
      return this.ninjasService.getNinja(id); // (+id) typecast to change string to number
    } catch (err) {
      throw new NotFoundException();
    }
  }

  // POST /ninjas
  @Post()
  @UseGuards(BeltGuard) // Protecting route
  createNinja(@Body(new ValidationPipe()) createNinjaDto: CreateNinjaDto) {
    return this.ninjasService.createNinja(createNinjaDto);
  }

  // PUT /ninjas/:id --> {...}
  @Put(':id')
  updateNinja(@Param('id') id: string, @Body() updateNinjaDto: UpdateNinjaDto) {
    return this.ninjasService.updateNinja(+id, updateNinjaDto);
  }

  // DELETE /ninjas/:id
  @Delete(':id')
  removeNinja(@Param('id') id: string) {
    return this.ninjasService.removeNinja(+id);
  }
}
