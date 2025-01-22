import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getBonjour(): string {
    return 'Bonjour le monde!';
  }
}
