import { AuthModule } from '@int-garage-management-monorepo/auth';
import { NestCoreModule } from '@int-garage-management-monorepo/nest-core';
import { ResourcesUsersModule } from '@int-garage-management-monorepo/resources/users';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [NestCoreModule, ResourcesUsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
