import { Debts } from 'src/database/entities/debts.entity';
import { Connection } from 'typeorm';

export const debtsProviders = [
  {
    provide: 'DEBTS_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Debts),
    inject: ['DATABASE_CONNECTION'],
  },
];
