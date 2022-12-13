import { Module, Global } from '@nestjs/common';
import { CoreService } from './core.service';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './config/configuration';
import { validationSchema } from './config/validation';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
  ],
  controllers: [],
  providers: [CoreService, PrismaService],
  exports: [CoreService, PrismaService],
})
export class CoreModule {}
