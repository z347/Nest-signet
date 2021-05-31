import { Injectable } from '@nestjs/common';

import { IMovie } from './interfaces/movie.interface';
import { FindMovieDto } from './dto/find-movie.dto';
import { streamData } from '../main';

@Injectable()
export class MovieService {
  searchByYear(year: FindMovieDto) {
    const copiedYear: string = JSON.parse(JSON.stringify(year));
    let result: IMovie[] | string = streamData.filter((object) => object.year === copiedYear);

    if (result.length === 0) result = 'A movie with this date was not found';

    return result;
  }
}
