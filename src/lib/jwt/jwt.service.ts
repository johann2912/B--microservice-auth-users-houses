import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { sign, verify } from 'jsonwebtoken';
import { ExceptionsService } from 'src/config/exceptions/exceptions.service';
import { RedisService } from 'src/frameworks/redis/redis.service';
import { IAccess } from './interfaces/access';
import { IRefresh } from './interfaces/refresh';

@Injectable()
export class JWTService {
  constructor(
    private readonly redisService: RedisService,
    private readonly config: ConfigService,
    private readonly exceptions: ExceptionsService,
  ) {};

  public async verifyAccess(token: string) {
    const access: any = this.config.get<string>('JWT_ACCESS_KEY');
    try {
      return verify(token, access);
    } catch (error) {
      this.exceptions.forbiddenException({
        message: 'Invalid access token',
      });
    }
  };
  verifyRefresh = (token: string) => {
    const refresh: any = this.config.get<string>('JWT_REFRESH_KEY');
    try {
      return verify(token, refresh);
    } catch (error) {
      this.exceptions.forbiddenException({
          message: 'Invalid refresh token'
      });
    }
  };
  createAccess = async (payload: IAccess) => {
    const access: any = this.config.get<string>('JWT_ACCESS_KEY');
    const token = sign(payload, access, { expiresIn: '8h' });
    await this.redisService.setSessionValue(
      'access',
      payload.id,
      token,
      3600 * 3,
    );
    return token;
  };
  createRefresh = async (payload: IRefresh) => {
    const access: any = this.config.get<string>('JWT_REFRESH_KEY');
    const token = sign(payload, access, { expiresIn: '14d' });
    await this.redisService.setSessionValue(
      'refresh',
      payload.id,
      token,
      3600 * 24 * 14,
    );
    return token;
  };
};