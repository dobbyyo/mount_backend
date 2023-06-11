import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class JoinRequestDto {
  @IsEmail()
  @ApiProperty({
    example: 'xxx@yyy.com',
    description: '이메일',
  })
  public email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'xxx',
    description: '닉네임',
  })
  public nickname: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'xxx',
    description: '비밀번호',
  })
  public password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'xxx',
    description: '비밀번호 확인',
  })
  public passwordConfirm: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'xxx',
    description: '성별',
  })
  public sex: string;
}
