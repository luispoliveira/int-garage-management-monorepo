import { CoreModule } from '@int-garage-management-monorepo/core';
import { ResourcesUsersModule } from '@int-garage-management-monorepo/resources/users';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [CoreModule, ResourcesUsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
