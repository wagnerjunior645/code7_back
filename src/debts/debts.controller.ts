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
import { Debts } from 'src/database/entities/debts.entity';
import { DebtsService } from './debts.service';
import { CreateOrUpdateDebtsDTO } from './dto/createDebts.dto';

@Controller('debts')
export class DebtsController {
  constructor(private debtsService: DebtsService) {}

  @Get()
  async findAll(): Promise<Debts[]> {
    const debts = await this.debtsService.findAll();
    return debts;
  }

  @Get(':debtsId')
  async findById(@Param('debtsId') debtsId: number): Promise<Debts> {
    const debt = await this.debtsService.findById(debtsId);
    return debt;
  }

  @Post()
  async createDebt(@Body() createDebt: CreateOrUpdateDebtsDTO): Promise<Debts> {
    const debt = await this.debtsService.createDebt(createDebt);
    return debt;
  }

  @Patch(':debtsId')
  @HttpCode(204)
  async deleteDebt(
    @Param('debtsId') debtsId: number,
    @Body() updateDebt: CreateOrUpdateDebtsDTO,
  ): Promise<void> {
    await this.debtsService.updateDebt(debtsId, updateDebt);
  }

  @Delete(':debtsId')
  @HttpCode(204)
  async updateDebt(@Param('debtsId') debtsId: number): Promise<void> {
    await this.debtsService.deleteDebt(debtsId);
  }
}
