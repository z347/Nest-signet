import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

import { MovieService } from './movie.service';
import { FindMovieDto } from './dto/find-movie.dto';

@ApiTags('movie')
@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @ApiOperation({ summary: 'Find a movie' })
  @ApiResponse({ status: 200, description: 'Try to find some movie at the data' })
  @Get()
  year(@Query('year') query: FindMovieDto) {
    return this.movieService.searchByYear(query);
  }
}
