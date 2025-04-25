import Config from './Config'

function withTrailingSlash(url: string): string {
  return url.endsWith('/') ? url : url + '/'
}

export class UrlConfig {
  // 🔧 Base values
  public static readonly BASE = withTrailingSlash(Config.BASE || 'http://localhost:4000');
  public static VERIFY_URL_BASE = `${UrlConfig.BASE}api/auth/verify`;

  // 🌐 API Base URLs
  public static readonly CONSUMET_BASE = withTrailingSlash(Config.CONSUMET || 'https://anime-api-eight-tawny.vercel.app');
  public static readonly SHIKIMORI = withTrailingSlash(Config.SHIKIMORI || 'https://shikimori.one');
  public static readonly JIKAN = withTrailingSlash(Config.JIKAN || 'https://api.jikan.moe/v4');
  public static readonly HIANIME = 'https://aniwatch-api-git.vercel.app/api/v2/hianime/';
  public static readonly ANILIST_GRAPHQL = Config.ANILIST || 'https://graphql.anilist.co';

  // 📡 External Links
  public static readonly MAL = 'https://myanimelist.net/anime/';
  public static readonly ANILIST = 'https://anilist.co/anime/';

  // 🔁 SHIKIMORI Sub Routes
  public static readonly SHIKIMORI_API = UrlConfig.SHIKIMORI + 'api/';
  public static readonly SHIKIMORI_GRAPHQL = UrlConfig.SHIKIMORI_API + 'graphql';

  // 📺 Stream/Source APIs via Consumet
  public static readonly ZORO = UrlConfig.CONSUMET_BASE + 'anime/zoro/';
  public static readonly ANIMEKAI = UrlConfig.CONSUMET_BASE + 'anime/animekai/';
  public static readonly ANIMEPAHE = UrlConfig.CONSUMET_BASE + 'anime/animepahe/';
}