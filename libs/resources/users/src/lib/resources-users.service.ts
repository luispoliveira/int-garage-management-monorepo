import { Prisma } from '@prisma/client';
import { PrismaService } from '@int-garage-management-monorepo/core';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PasswordUtils } from '@int-garage-management-monorepo/utils';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ResourcesUsersService implements OnModuleInit {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService
  ) {}

  private adminUser: {
    username: string;
    password: string;
    email: string;
  } | null = null;

  async onModuleInit() {
    const adminConfig = this.configService.get<{
      username: string;
      password: string;
      email: string;
    }>('admin');

    if (!adminConfig) {
      Logger.warn('Admin user not configured', ResourcesUsersService.name);
      return;
    }

    this.adminUser = adminConfig;
    await this.ensureAdminUser();
  }

  private async ensureAdminUser() {
    if (!this.adminUser) return;

    const adminUser = await this.prisma.user.findUnique({
      where: {
        username: this.adminUser.username,
      },
    });
    if (adminUser) {
      Logger.log('Admin user already exists', ResourcesUsersService.name);
      return;
    }

    Logger.log('Creating admin user', ResourcesUsersService.name);
    const admin = await this.prisma.user.create({
      data: {
        username: this.adminUser.username,
        password: await PasswordUtils.hash(this.adminUser.password),
        email: this.adminUser.email,
      },
    });

    Logger.log(`Admin: ${admin.username}`, ResourcesUsersService.name);
  }

  async create(args: Prisma.UserCreateArgs) {
    try {
      args.data.password = await PasswordUtils.hash(args.data.password);

      return await this.prisma.user.create(args);
    } catch (e) {
      Logger.error(e, ResourcesUsersService.name);
      throw e;
    }
  }

  async findUnique(args: Prisma.UserFindUniqueArgs) {
    return await this.prisma.user.findUnique(args);
  }

  async findMany(args: Prisma.UserFindManyArgs) {
    return await this.prisma.user.findMany(args);
  }

  async update(args: Prisma.UserUpdateArgs) {
    try {
      if (args.data.password) {
        args.data.password = await PasswordUtils.hash(
          args.data.password.toString()
        );
      }

      return await this.prisma.user.update(args);
    } catch (e) {
      Logger.error(e, ResourcesUsersService.name);
      throw e;
    }
  }
}
