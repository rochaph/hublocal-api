import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as morgan from 'morgan';
import * as helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const helmetMiddleware = helmet as unknown as () => unknown;

(BigInt.prototype as Record<string, any>).toJSON = function () {
  return this.toString();
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();

  app.use(helmetMiddleware());

  app.use(morgan('combined'));

  const config = new DocumentBuilder()
    .setTitle('Hublocal API')
    .setVersion('1.0')
    .addTag('Hublocal')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
