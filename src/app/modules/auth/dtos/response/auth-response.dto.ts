import { Expose } from 'class-transformer';

export class AuthResponseDto {
  @Expose()
  token?: string;

  @Expose()
  message?: string;

  @Expose()
  data?: any;
}
