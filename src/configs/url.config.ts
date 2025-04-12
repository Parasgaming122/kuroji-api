export class UrlConfig {
  public static BASE: string;
  public static VERIFY_URL_BASE: string;

  public static readonly CONSUMET_BASE =
    'https://anime-api-eight-tawny.vercel.app/';

  public static readonly HIANIME_API =
    'https://aniwatch-api-git.vercel.app/api/v2/hianime/';
  public static readonly RENDER_HEALTH =
    'https://veanime-backend.onrender.com/health';

  public static readonly SHIKIMORI = 'https://shikimori.one/';
  public static readonly SHIKIMORI_API = UrlConfig.SHIKIMORI + 'api/';
  public static readonly SHIKIMORI_GRAPHQL =
    UrlConfig.SHIKIMORI_API + 'graphql';

  public static readonly MAL = 'https://myanimelist.net/anime/';
  public static readonly HIANIME = 'https://hianime.to/';
  public static readonly ANILIST = 'https://anilist.co/anime/';
  public static readonly JIKAN = 'https://api.jikan.moe/v4/';

  public static readonly ZORO = UrlConfig.CONSUMET_BASE + 'anime/zoro/';
  public static readonly ANIMEKAI = UrlConfig.CONSUMET_BASE + 'anime/animekai/';
  public static readonly ANIMEPAHE =
    UrlConfig.CONSUMET_BASE + 'anime/animepahe/';

  public static readonly ANILIST_GRAPHQL = 'https://graphql.anilist.co';

  public static readonly AVATAR_PATH = 'avatars';
  public static readonly AVATAR_FULL_PATH = '/' + UrlConfig.AVATAR_PATH + '/';

  public static init(baseValue: string): void {
    UrlConfig.BASE = baseValue;
    UrlConfig.VERIFY_URL_BASE = `${baseValue}api/auth/verify`;
  }
}
