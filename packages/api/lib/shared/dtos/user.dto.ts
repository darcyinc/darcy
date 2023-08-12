import { IsNotEmpty, IsEmail, Length, NotContains, IsBase64, IsOptional, IsBoolean } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @Length(1, 16, { message: 'Must be between 1 and 16 characters' })
  @NotContains(' ', { message: 'Cannot contain spaces' })
  @NotContains('@', { message: 'Cannot contain @' })
  handle: string;

  @IsNotEmpty()
  @Length(1, 30, { message: 'Must be between 1 and 30 characters' })
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class UpdateUserDto {
  @IsNotEmpty()
  @Length(1, 30, { message: 'Must be between 1 and 30 characters' })
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsBase64()
  banner?: string;

  @IsOptional()
  @Length(1, 160, { message: 'Must be between 1 and 160 characters' })
  bio?: string;

  @IsOptional()
  @IsBoolean()
  private?: boolean;

  @IsOptional()
  @IsBase64()
  avatar?: string;
}
