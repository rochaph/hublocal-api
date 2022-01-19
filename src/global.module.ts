import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

const JWT_MODULE = JwtModule.register({
  secret: new ConfigService().get('JWT_SECRET'),
  signOptions: { expiresIn: '2h' },
});

@Global()
@Module({
  imports: [JWT_MODULE],
  exports: [JWT_MODULE],
})
export class GlobalModule {}
