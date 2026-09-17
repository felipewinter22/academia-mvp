import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth() {
    return {
      status: 'ok',
      service: 'academia-backend',
      message: 'API da Academia rodando com sucesso 💪',
    };
  }
}
