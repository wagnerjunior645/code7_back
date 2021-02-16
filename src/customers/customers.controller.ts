import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Debts } from 'src/database/entities/debts.entity';
import { DebtsService } from 'src/debts/debts.service';
import { CustomersService } from './customers.service';
import { CustomersDTO } from './dto/customers.dto';

@ApiTags('Clientes')
@Controller('customers')
export class CustomersController {
  constructor(
    private customersService: CustomersService,
    private debtsService: DebtsService,
  ) {}

  @ApiResponse({ status: 200 })
  @Get()
  async getCustumers(): Promise<CustomersDTO[]> {
    const customers = await this.customersService.getCustomers();
    return customers;
  }

  @ApiResponse({
    status: 200,
    description:
      'Vai retornar os clientes que tiverem alguma dívida junto com o total delas',
  })
  @Get('/debts/total')
  async getCustomersWithDebts(): Promise<CustomersDTO[]> {
    const customers = await this.customersService.getCustomers();
    const debtsCustomersSum = (await this.debtsService.getTotalDebtsPerCustomers()) as {
      customersId: number;
      total: number;
    }[];
    let customersWithTotal = customers.filter((customer) => {
      debtsCustomersSum.forEach((debtsPerCustomers) => {
        if (debtsPerCustomers.customersId === customer.id) {
          customer.totalDebts = debtsPerCustomers.total;
        }
      });
      return customers;
    });
    customersWithTotal = customersWithTotal.filter(
      (customer) => customer.totalDebts !== undefined,
    );
    return customersWithTotal;
  }

  @ApiResponse({ status: 204 })
  @Get(':customersId')
  async getCustumersById(
    @Param('customersId') customersId: number,
  ): Promise<CustomersDTO> {
    const customers = await this.customersService.getCustomersById(customersId);
    return customers;
  }

  @ApiResponse({
    status: 200,
    description: 'Pegar todas as dívidas de um determinado cliente',
  })
  @Get(':customersId/debts')
  async getDebtsByCustomers(
    @Param('customersId') customersId: number,
  ): Promise<Debts[]> {
    const debts = this.customersService.getDebtsByCustomers(customersId);
    return debts;
  }

  @ApiResponse({
    status: 204,
    description: 'Remover todas as dividas do cliente',
  })
  @Delete(':customersId/debts')
  async deleteAllDebtsFromCustomers(
    @Param('customersId') customersId: number,
  ): Promise<void> {
    await this.getCustumersById(customersId);
    await this.debtsService.deleteAllDebtsFromCustomers(customersId);
  }
}
