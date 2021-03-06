import { ApiProperty } from '@nestjs/swagger';

export class CreateDebtsDTO {
  @ApiProperty()
  customerId: number;

  @ApiProperty()
  value: number;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty()
  debtsDate: string;
}
