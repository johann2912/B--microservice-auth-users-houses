import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { verify } from 'jsonwebtoken';
import { ExceptionsService } from 'src/config/exceptions/exceptions.service';
import { IAccess } from '../jwt/interfaces/access';
import { GuardsService } from './guard.service';
  
@Injectable()
export class AccessGuard implements CanActivate {
  constructor(
    private readonly guardService: GuardsService,
    private readonly config: ConfigService,
    private readonly exceptions: ExceptionsService,
  ) {};

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) this.exceptions.forbiddenException({message:'Null Access Token'});
    try {
      const user = verify(
        token,
        `${this.config.get<string>('JWT_ACCESS_KEY')}`,
      ) as IAccess;
      req.session = user;
      await this.guardService.validateAccess(token, user.id);
    } catch (error) {
      this.exceptions.forbiddenException({message:'Invalid Access Token'});
    }
    return true;
  };
};