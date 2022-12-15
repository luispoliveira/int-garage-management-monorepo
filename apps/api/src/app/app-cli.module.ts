import { NestCoreModule } from '@int-garage-management-monorepo/nest-core';
import { ResourcesUsersModule } from '@int-garage-management-monorepo/resources/users';
import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';

@Module({
  imports: [CommandModule, NestCoreModule, ResourcesUsersModule],
})
export class AppCliModule {}
