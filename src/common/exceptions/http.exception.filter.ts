import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus ? exception.getStatus() : 500;
        const request = ctx.getRequest<Request>();

        response.status(exception.response.status | status).json({
            message: `Gateway error`,
            errors: exception.response.response?.data?.errors ? exception.response.response?.data?.errors : exception.response.message.map((msg) => { return { message: msg } }),
            meta: {
                statusCode: exception.response.status,
                timestamp: new Date().toISOString(),
                path: request.url,
            },
        })
    }
}
