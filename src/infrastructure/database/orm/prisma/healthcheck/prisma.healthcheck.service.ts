import { HealthIndicator } from '@nestjs/terminus';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaHealthcheckService extends HealthIndicator {
  constructor(private readonly db: PrismaService) {
    super();
  }

  public async check(key: string) {
    let isHealthy = true;
    let message = 'Up and running';

    try {
      await this.db.$connect();
    } catch (e) {
      isHealthy = false;
      message = 'Database is down';
    }
    return super.getStatus(key, isHealthy, { message });
  }
}
