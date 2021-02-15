import { HttpException } from '@nestjs/common';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Debts } from 'src/database/entities/debts.entity';
import { Repository } from 'typeorm/repository/Repository';
import { CreateOrUpdateDebtsDTO } from './dto/createDebts.dto';

@Injectable()
export class DebtsService {
  constructor(
    @Inject('DEBTS_REPOSITORY')
    private debtsRepository: Repository<Debts>,
  ) {}
  async findAll(): Promise<Debts[]> {
    const debts = await this.debtsRepository.find();
    return debts;
  }

  async findById(id: number): Promise<Debts> {
    const debt = await this.debtsRepository.findOne({ where: { id } });
    if (!debt) {
      throw new HttpException(
        { message: 'Essa dívida não existe.' },
        HttpStatus.BAD_REQUEST,
      );
    }
    return debt;
  }

  async createDebt(createDebt: CreateOrUpdateDebtsDTO): Promise<Debts> {
    const debt = await this.debtsRepository.save(createDebt);
    return debt;
  }

  async updateDebt(
    debtsId: number,
    debtData: CreateOrUpdateDebtsDTO,
  ): Promise<void> {
    let debt = await this.findById(debtsId);
    debt = { ...debt, ...debtData };
    await this.debtsRepository.save(debt);
  }

  async deleteDebt(debtsId: number): Promise<void> {
    await this.findById(debtsId);
    await this.debtsRepository.delete(debtsId);
  }

  async getDebtsByCustomersId(customersId: number): Promise<Debts[]> {
    const debts = await this.debtsRepository.find({
      where: {
        customersId,
      },
    });
    return debts;
  }
}
