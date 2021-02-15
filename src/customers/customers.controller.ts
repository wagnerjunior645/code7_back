import { Controller, Get, Param } from '@nestjs/common';
import { Debts } from 'src/database/entities/debts.entity';
import { CustomersService } from './customers.service';
import { CustomersDTO } from './dto/customers.dto';

@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}
  @Get()
  async getCustumers(): Promise<CustomersDTO[]> {
    const customers = await this.customersService.getCustomers();
    return customers;
  }

  @Get(':customersId')
  async getCustumersById(
    @Param('customersId') customersId: number,
  ): Promise<CustomersDTO> {
    const customers = await this.customersService.getCustomersById(customersId);
    return customers;
  }

  @Get(':customersId/debts')
  async getDebtsByCustomers(
    @Param('customersId') customersId: number,
  ): Promise<Debts[]> {
    const debts = this.customersService.getDebtsByCustomers(customersId);
    return debts;
  }
}
