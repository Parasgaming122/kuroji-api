import Config from './Config';

export class TVDB {
  static readonly API_KEY: string =
    Config.TVDB_API || '''';
  static readonly URL: string = Config.TVDB || 'https://api4.thetvdb.com/v4/';

  static getLoginUrl(): string {
    return `${TVDB.URL}login`;
  }

  static getRemoteId(id: string): string {
    return `${TVDB.URL}search/remoteid/${id}`;
  }

  static getMovie(id: number): string {
    return `${TVDB.URL}movies/${id}/extended`;
  }

  static getSeries(id: number): string {
    return `${TVDB.URL}series/${id}/extended`;
  }

  static getMovieTranslations(id: number, translations: string): string {
    return `${TVDB.URL}movies/${id}/translations/${translations}`;
  }

  static getSeriesTranslations(id: number, translations: string): string {
    return `${TVDB.URL}series/${id}/translations/${translations}`;
  }

  static getLanguages(): string {
    return `${TVDB.URL}languages`;
  }
}
