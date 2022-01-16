import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
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

    return this.health.check([
      async () => await this.db.check('database'),
      async () => await this.http.pingCheck('api', url),
    ]);
  }
}
