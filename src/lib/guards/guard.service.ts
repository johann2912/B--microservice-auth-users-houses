import { Injectable } from '@nestjs/common';
import { RedisService } from 'src/frameworks/redis/redis.service';
import { ExceptionsService } from 'src/config/exceptions/exceptions.service';

@Injectable()
export class GuardsService {
  constructor(
      private readonly redisService: RedisService,
      private readonly exceptions: ExceptionsService,
  ) {};

  validateAccess = async (token: string, user: string): Promise<Boolean> => {
    const storedToken = await this.redisService.getSessionValue(
      'access',
      user,
    );
    if (storedToken !== token)
      this.exceptions.forbiddenException({ 
        message: 'This access token is not longer valid'
    });
    return true;
  };
  validateRefresh = async (token: string, user: string): Promise<Boolean> => {
    const storedToken = await this.redisService.getSessionValue(
      'refresh',
      user,
    );
    if (storedToken !== token)
      this.exceptions.forbiddenException({
        message: 'This refresh token is not longer valid'
    });
    return true;
  };
};