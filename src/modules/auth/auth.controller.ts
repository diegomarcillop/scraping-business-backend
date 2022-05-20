import { Controller, Get } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Get()
  findCode(): string {
    return 'This string';
  }
}
