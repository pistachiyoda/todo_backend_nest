import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;
}
