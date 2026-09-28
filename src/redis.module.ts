import { BullModule } from '@nestjs/bullmq';
import { Global, Module } from '@nestjs/common';
import Redis from 'ioredis';
import { redisConnection } from './redis.connection';

@Global()
@Module({
  imports: [
    BullModule.forRoot({
      connection: redisConnection,
    }),
  ],
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: () => {
        return new Redis({
          host: process.env.REDIS_HOST || 'localhost',
          port: Number(process.env.REDIS_PORT) || 6379,
          db: Number(process.env.REDIS_DB) || 0,
        });
      },
    },
  ],
  exports: ['REDIS_CLIENT', BullModule],
})
export class RedisModule {}