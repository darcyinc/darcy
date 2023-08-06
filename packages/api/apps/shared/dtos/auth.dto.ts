import { IsIn, IsNotEmpty } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  @IsIn(['github', 'google', 'discord'])
  service: 'github' | 'google' | 'discord';
}
