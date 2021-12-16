import {ExceptionFilter, Catch, ArgumentsHost} from '@nestjs/common';
import {Request, Response} from 'express';

@Catch(Error)
export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const errorMessage = exception.message;

        response
            .status(500)
            .json({
                statusCode: 500,
                timestamp: new Date().toISOString(),
                path: request.url,
                message: errorMessage
            });
    }
}
