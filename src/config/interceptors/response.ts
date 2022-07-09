import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
  import { ResponseFormat } from 'src/lib/dto/responses/format';
  
  @Injectable()
  export class ResponseInterceptor<T>
    implements NestInterceptor<T, ResponseFormat<T>>
  {
    intercept(
      context: ExecutionContext,
      next: CallHandler,
    ): Observable<ResponseFormat<T>> {
      const now = Date.now();
      const httpContext = context.switchToHttp();
      const request = httpContext.getRequest();
      const response = httpContext.getResponse();
  
      return next.handle().pipe(
        map((data) => ({
          data,
          path: request.path,
          duration: `${Date.now() - now}ms`,
          method: request.method,
          code: response.statusCode,
        })),
      );
    };
};