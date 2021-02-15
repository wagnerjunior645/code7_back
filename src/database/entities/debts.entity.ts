import { PrimaryGeneratedColumn, Column } from 'typeorm';
import { Entity } from 'typeorm/decorator/entity/Entity';

@Entity('debts')
export class Debts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customersId: number;

  @Column({ length: 255 })
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  value: number;
}
