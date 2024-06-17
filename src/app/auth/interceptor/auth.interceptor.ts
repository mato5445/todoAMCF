import { inject } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { HttpInterceptorFn, HttpParams } from '@angular/common/http';
import { exhaustMap, take } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  return authService.user.pipe(
    take(1),
    exhaustMap((user) => {
      if (!user) {
        return next(req);
      }
      if (user.token != null) {
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', user.token),
        });
        return next(modifiedReq);
      } else {
        throw new Error('User is not authenticated');
      }
    }),
  );
};
