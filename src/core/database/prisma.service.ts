import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleDestroy, OnModuleInit
{
  constructor() {
    const stringConnection =
      process.env.DATABASE_URL ||
      process.env.RENDER_DATABASE_URL ||
      process.env.POSTGRES_URL ||
      process.env.PGDATABASE_URL;

    if (!stringConnection) {
      throw new Error(
        'DATABASE_URL is not defined. Set DATABASE_URL in Render env vars or attach the managed database to the service.'
      );
    }

    const pool = new Pool({
      connectionString: stringConnection,
    });
    const adapter = new PrismaPg(pool);
    super({
      adapter: adapter,
      log: ['error', 'warn'],
    });
  }

  async onModuleInit() {
    await this.$connect();
    console.log('✅ Database connected');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log('❌ Database disconnected');
  }
}
