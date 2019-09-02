import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {Observable} from "rxjs";
import * as jwt from 'jsonwebtoken';
import { common } from '../config/config';

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> |
        Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const { headers } = request;
         const token = headers.authorization.replace('Bearer ','');
         try {
             let a = jwt.verify(token, common.secret);
             return true;
         } catch(e) {
             console.log(e);
             return false;
         }
    }
    
}
