import { HttpException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { Debts } from 'src/database/entities/debts.entity';
import { DebtsService } from 'src/debts/debts.service';
import { CustomersDTO } from './dto/customers.dto';

@Injectable()
export class CustomersService {
  constructor(private debtsService: DebtsService) {}
  async getCustomers(): Promise<CustomersDTO[]> {
    try {
      const customers = await axios
        .get(`${process.env.API_URL}/users`)
        .then((res) => res.data);
      return customers;
    } catch (err) {
      throw new HttpException(err.response.data, err.response.status);
    }
  }
  async getCustomersById(customersId: number): Promise<CustomersDTO> {
    try {
      const customers = await axios
        .get(`${process.env.API_URL}/users/${customersId}`)
        .then((res) => res.data);
      return customers;
    } catch (err) {
      throw new HttpException(err.response.data, err.response.status);
    }
  }
  async getDebtsByCustomers(customersId: number): Promise<Debts[]> {
    await this.getCustomersById(customersId);
    const debts = this.debtsService.getDebtsByCustomersId(customersId);
    return debts;
  }
}
