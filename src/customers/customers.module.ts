import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { debtsProviders } from 'src/debts/debts.providers';
import { DebtsService } from 'src/debts/debts.service';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';

@Module({
  imports: [DatabaseModule],
  controllers: [CustomersController],
  providers: [CustomersService, DebtsService, ...debtsProviders],
})
export class CustomersModule {}
