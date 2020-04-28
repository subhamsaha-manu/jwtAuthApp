import { HttpInterceptor, HttpHandler,HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { take, exhaustMap } from 'rxjs/operators';

const TOKEN_HEADER_KEY = 'Authorization';


@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    

    constructor(private authService: AuthService){}

    intercept(req: HttpRequest<any>, next: HttpHandler){

      return this.authService.user.pipe(
          take(1),
          exhaustMap(user => {
              if (!user){
                  return next.handle(req);
              }
              const modifiedReq = req.clone({
                headers : req.headers.set(TOKEN_HEADER_KEY,'Bearer '+user.token)
              });
              return next.handle(modifiedReq)
          }))
        }
}


export const authInterceptorProviders = [
    {provide: HTTP_INTERCEPTORS,useClass: AuthInterceptor, multi:true}
];