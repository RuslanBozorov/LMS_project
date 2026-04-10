import { Injectable, OnModuleInit } from '@nestjs/common';
import { Redis } from '@upstash/redis';

@Injectable()
export class RedisService implements OnModuleInit {
    private client: Redis;

    onModuleInit() {
        this.client = new Redis({
            url: process.env.UPSTASH_REDIS_REST_URL!,
            token: process.env.UPSTASH_REDIS_REST_TOKEN!,
        });
    }

    async set(key: string, value: number | string) {
        await this.client.set(key, value, { ex: 120 }); // 120 sec
    }

    async get(key: string) {
        return await this.client.get(key);
    }

    async del(key: string) {
        await this.client.del(key);
    }
}