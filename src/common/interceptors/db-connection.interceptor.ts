import { catchError, switchMap } from 'rxjs/operators';
import { from, Observable, throwError } from 'rxjs';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor, NotFoundException } from '@nestjs/common';
import { IndicatorRepository } from '../../indicators/indicator.repository';

@Injectable()
export class DbConnectionInterceptor implements NestInterceptor {
  constructor(private readonly indicatorsRepository: IndicatorRepository) {}

  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    return from(this.indicatorsRepository.testConnection()).pipe(
      switchMap(() => next.handle()),
      catchError((err) => {
        return throwError(() => new NotFoundException(err.message));
      }),
    );
  }
}