import { Injectable, Logger } from '@nestjs/common';
import { ResourcesUsersService } from './resources-users.service';
import { Command, Positional } from 'nestjs-command';

@Injectable()
export class ResourcesUsersCommand {
  constructor(private readonly usersService: ResourcesUsersService) {}

  @Command({
    command: 'users:create <username> <password> <email>',
    describe: 'Creates an user',
  })
  async create(
    @Positional({
      name: 'username',
      describe: 'The username',
      type: 'string',
    })
    username: string,
    @Positional({
      name: 'password',
      describe: 'The password',
      type: 'string',
    })
    password: string,
    @Positional({
      name: 'email',
      describe: 'The email',
      type: 'string',
    })
    email: string
  ) {
    Logger.log(
      `Creating user ${username} with password ${password} and email ${email}`
    );
  }
}
