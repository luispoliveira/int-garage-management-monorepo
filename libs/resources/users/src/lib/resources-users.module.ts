import { Module, Global } from '@nestjs/common';
import { ResourcesUsersService } from './resources-users.service';

@Global()
@Module({
  providers: [ResourcesUsersService],
  exports: [ResourcesUsersService],
})
export class ResourcesUsersModule {}
