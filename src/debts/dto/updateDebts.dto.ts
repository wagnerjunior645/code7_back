import { ApiProperty } from '@nestjs/swagger';

export class UpdateDebtsDTO {
  @ApiProperty({ required: false })
  value: number;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty()
  debtsDate?: string;
}
