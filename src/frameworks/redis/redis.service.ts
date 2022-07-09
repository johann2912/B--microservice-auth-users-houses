import { Tedis } from 'tedis';
import { ConfigService } from '@nestjs/config';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class RedisService {
  private readonly logger: Logger = new Logger('Redis');
  private tedis: Tedis;
  constructor(config: ConfigService) {
    let redis = {
        host: config.get<string>('REDIS_HOST_DEV'),
        port: config.get<number>('REDIS_PORT_DEV'),
        password: config.get<string>('REDIS_PASSWORD'),
    };
    this.tedis = new Tedis(redis);
    this.logger.log('Redis connection established');
  };
  private generateSessionKey = (type: string, key: string) => `${type}:${key}`;
  getSessionValue = async (type: string, key: string) => {
    const redisKey = this.generateSessionKey(type, key);
    this.logger.log(`Getting session key -> ${redisKey}`);
    return await this.tedis.get(redisKey);
  };
  setSessionValue = async (
    type: string,
    id: string,
    token: string,
    expiredAt: number,
  ) => {
    const redisKey = this.generateSessionKey(type, id);
    try {
      await this.tedis.setex(redisKey, expiredAt, token);
      this.logger.log(`New session created -> ${redisKey}`);
    } catch (error) {
      this.logger.error(`Error creating session ${id}`);
      throw error;
    }
  };
  deleteSessionValue = async (id: string) => {
    const accessKey = this.generateSessionKey('access', id);
    const refreshKey = this.generateSessionKey('refresh', id);
    await this.tedis.del(accessKey, refreshKey);
  };
  existsKey = async (type: string, key: string) => {
    const redisKey = this.generateSessionKey(type, key);
    return await this.tedis.exists(redisKey);
  };
};