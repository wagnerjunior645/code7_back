import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Debts } from 'src/database/entities/debts.entity';
import { DebtsService } from './debts.service';
import { CreateDebtsDTO } from './dto/createDebts.dto';
import { UpdateDebtsDTO } from './dto/updateDebts.dto';

@ApiTags('Dívidas')
@Controller('debts')
export class DebtsController {
  constructor(private debtsService: DebtsService) {}

  @ApiResponse({ status: 200 })
  @Get()
  async findAll(): Promise<Debts[]> {
    const debts = await this.debtsService.findAll();
    return debts;
  }

  @ApiResponse({ status: 200 })
  @Get(':debtsId')
  async findById(@Param('debtsId') debtsId: number): Promise<Debts> {
    const debt = await this.debtsService.findById(debtsId);
    return debt;
  }

  @ApiResponse({ status: 201 })
  @Post()
  async createDebt(@Body() createDebt: CreateDebtsDTO): Promise<Debts> {
    const debt = await this.debtsService.createDebt(createDebt);
    return debt;
  }

  @ApiResponse({ status: 204 })
  @Patch(':debtsId')
  @HttpCode(204)
  async deleteDebt(
    @Param('debtsId') debtsId: number,
    @Body() updateDebt: UpdateDebtsDTO,
  ): Promise<void> {
    await this.debtsService.updateDebt(debtsId, updateDebt);
  }

  @ApiResponse({ status: 204 })
  @Delete(':debtsId')
  @HttpCode(204)
  async updateDebt(@Param('debtsId') debtsId: number): Promise<void> {
    await this.debtsService.deleteDebt(debtsId);
  }
}
