import { Module, Global } from '@nestjs/common';
import { NestCoreService } from './nest-core.service';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './config/configuration';
import { validationSchema } from './config/validation';
import { PrismaService } from './prisma.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from 'apollo-server-core';
import { NestCoreResolver } from './nest-core.resolver';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
    GraphQLModule.forRoot({
      debug: process.env['environment'] === 'development',
      playground: false,
      driver: ApolloDriver,
      plugins:
        process.env['environment'] === 'production'
          ? [ApolloServerPluginLandingPageProductionDefault()]
          : [ApolloServerPluginLandingPageLocalDefault()],
      subscriptions: {
        'graphql-ws': true,
        'subscriptions-transport-ws': true,
      },
      autoSchemaFile: true,
      sortSchema: true,
    }),
  ],
  providers: [NestCoreService, PrismaService, NestCoreResolver],
  exports: [NestCoreService, PrismaService],
})
export class NestCoreModule {}
