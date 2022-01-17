import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  HealthIndicatorFunction,
  HttpHealthIndicator,
} from '@nestjs/terminus';
import { ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { PrismaHealthcheckService } from '../../infrastructure/database/prisma/healthcheck/prisma.healthcheck.service';

@ApiTags('Health Check')
@Controller()
export class AppController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly configService: ConfigService,
    private readonly http: HttpHealthIndicator,
    private readonly db: PrismaHealthcheckService,
  ) {}

  @Get()
  @HealthCheck()
  healthCheck() {
    const url = this.configService.get<string>('API_URL');
    const indicators: HealthIndicatorFunction[] = [
      async () => await this.db.check('database'),
    ];

    const isDev = this.configService.get<string>('NODE_ENV') === 'development';

    if (isDev) {
      indicators.push(async () => await this.http.pingCheck('api', url));
    }

    return this.health.check(indicators);
  }
}
