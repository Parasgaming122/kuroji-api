export class TVDB {
  static readonly API_KEY: string = '''';
  static readonly URL: string = 'https://api4.thetvdb.com/v4/';

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
}