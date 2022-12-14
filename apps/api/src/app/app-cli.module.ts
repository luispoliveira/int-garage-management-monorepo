import { CoreModule } from '@int-garage-management-monorepo/core';
import { ResourcesUsersModule } from '@int-garage-management-monorepo/resources/users';
import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';

@Module({
  imports: [CommandModule, CoreModule, ResourcesUsersModule],
})
export class AppCliModule {}
