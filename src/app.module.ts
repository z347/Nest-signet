import { Module } from '@nestjs/common';

import { rootConfigModule } from './configure.root';
import { MovieModule } from './movie/movie.module';

@Module({
  imports: [rootConfigModule, MovieModule],
})
export class AppModule {}
