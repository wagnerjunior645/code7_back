import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { DebtsController } from './debts.controller';
import { debtsProviders } from './debts.providers';
import { DebtsService } from './debts.service';

@Module({
  imports: [DatabaseModule],
  controllers: [DebtsController],
  providers: [...debtsProviders, DebtsService],
})
export class DebtsModule {}
