import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(private readonly configService: ConfigService) {
    let log: Prisma.LogLevel[] = ['error'];
    if (configService.get('environment') === 'development')
      log = ['query', 'info', 'warn', ...log];

    if (configService.get('environment') === 'test') log = ['warn', ...log];

    super({
      log: log,
      errorFormat: 'pretty',
    });
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async onModuleInit() {
    await this.$connect();
  }
}
