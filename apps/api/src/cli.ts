import { NestFactory } from '@nestjs/core';
import { CommandModule, CommandService } from 'nestjs-command';
import { Logger } from '@nestjs/common';
import { AppCliModule } from './app/app-cli.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppCliModule);

  try {
    await app.select(CommandModule).get(CommandService).exec();
    await app.close();
  } catch (e) {
    Logger.error(e);
    await app.close();
    process.exit(1);
  }
}

bootstrap();
