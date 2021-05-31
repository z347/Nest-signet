import { ConfigModule } from '@nestjs/config';

export const rootConfigModule = ConfigModule.forRoot({
  envFilePath: `./config/.env.${process.env.NODE_ENV || 'development'}`,
  isGlobal: false,
});
