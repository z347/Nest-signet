import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { createReadStream } from 'fs';
import * as csv from 'csv-parser';

import { AppModule } from './app.module';
import { IMovie } from './movie/interfaces/movie.interface';

export const streamData: IMovie[] = [];

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');

  const configService = app.get(ConfigService);
  const host = configService.get<string>('SERVER_HOST');
  const port = configService.get<number>('SERVER_PORT');

  const Log = new Logger('bootstrap', true);

  const options = new DocumentBuilder()
    .setTitle('Documentation')
    .setDescription('sample API')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('doc', app, document);

  function parse(filePath: string, encoding: string): void {
    createReadStream(filePath, encoding)
      .pipe(csv({ strict: true, separator: ';' }))
      .on('data', (data: IMovie) => streamData.push(data))
      .on('error', (error) => Logger.error(error));
  }

  await app
    .listen(port)
    .then(() => {
      parse('./src/data/data.csv', 'utf8');
      Log.log(`Server is run and available at ${host}:${port}`);
      Log.log(`Documentation is available at ${host}:${port}/doc`);
    })
    .catch(() => Log.error("Something went wrong. Server can't be start."));
}

bootstrap();
