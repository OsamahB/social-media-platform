import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, Min } from 'class-validator';

export class PaginationParamsDto {
  @ApiProperty({
    description: 'Page number',
    required: false,
  })
  @IsOptional()
  @IsInt({ message: 'The page must be an integer value.' })
  @Min(1, { message: 'The page must be more than 0.' })
  page: number = 1;

  @ApiProperty({
    description: 'Number of items per page',
    required: false,
  })
  @IsOptional()
  @IsInt({ message: 'The limit must be an integer value.' })
  @Min(1, { message: 'The limit must be more than 0.' })
  limit: number = 10;
}
