import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { ApplicationException } from '../../application/exceptions/ApplicationException';
import { Response } from 'express';

@Catch(ApplicationException)
export class ApplicationExceptionFilter implements ExceptionFilter {
  catch(exception: ApplicationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    res.status(HttpStatus.BAD_REQUEST).json({
      statusCode: 400,
      message: exception.message,
      error: 'Bad Request',
    });
  }
}
