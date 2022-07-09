import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { ConfigService } from '@nestjs/config';
  import { verify } from 'jsonwebtoken';
  import { IAccess } from '../jwt/interfaces/access';
  import { GuardsService } from './guard.service';
  
  @Injectable()
  export class RefreshGuard implements CanActivate {
    constructor(
      private readonly guardService: GuardsService,
      private readonly config: ConfigService,
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
      if (token == null) throw new UnauthorizedException('Null Refresh Token');
      try {
        const user = verify(
          token,
          `${this.config.get<string>('JWT_REFRESH_KEY')}`,
        ) as IAccess;
        req.session = user;
        await this.guardService.validateRefresh(token, user.id);
      } catch (error) {
        throw new ForbiddenException('Invalid Refresh Token');
      }
      return true;
    }
  }