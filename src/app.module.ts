import { Module } from '@nestjs/common';
import { CustomersModule } from './customers/customers.module';
import { ConfigModule } from '@nestjs/config';
import { DebtsModule } from './debts/debts.module';

@Module({
  imports: [CustomersModule, DebtsModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
