import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Length } from 'class-validator';

export class FindMovieDto {
  @ApiProperty({ type: String, description: 'year', example: '2007' })
  @IsString({ message: 'must be string' })
  @IsNotEmpty({ message: 'must be not empty' })
  @Length(4, 4, { message: 'invalid length' })
  readonly year: string;
}
