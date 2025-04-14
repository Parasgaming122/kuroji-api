<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ yarn install
```

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ yarn install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

# VeAnime API Documentation

## Table of Contents
- [Authentication](#authentication)
- [User](#user)
- [Anilist](#anilist)
- [Shikimori](#shikimori)
- [TMDB](#tmdb)
- [TVDB](#tvdb)
- [Streaming Sources](#streaming-sources)
- [Exceptions](#exceptions)

## Authentication
| Endpoint | Method | Description | Query/Body Parameters |
|----------|--------|-------------|---------------------|
| `/auth/register` | POST | Register new user | `CreateUserDto` |
| `/auth/login` | POST | Login user | `LoginUserDto` |
| `/auth/oauth2/register` | POST | Register with OAuth2 | `OAuth2Dto` |
| `/auth/oauth2/login` | POST | Login with OAuth2 | `OAuth2Dto` |
| `/auth/logout` | POST | Logout user | - |
| `/auth/refresh` | POST | Refresh access token | - |
| `/auth/verify-email` | GET | Verify email address | `token` |

## User
| Endpoint | Method | Description | Query/Body Parameters |
|----------|--------|-------------|---------------------|
| `/user/profile` | GET | Get user profile | `id?` (optional) |
| `/user/avatar/upload` | POST | Upload user avatar | `file` (multipart) |

## Anilist
| Endpoint | Method | Description | Query/Body Parameters |
|----------|--------|-------------|---------------------|
| `/anilist/info/:id` | GET | Get anime details | - |
| `/anilist/info/:id/recommendations` | GET | Get recommendations | `perPage`, `page` |
| `/anilist/info/:id/chronology` | GET | Get chronological order | `perPage`, `page` |
| `/anilist/info/:id/episodes` | GET | Get episode list | - |
| `/anilist/info/:id/episodes/:number` | GET | Get specific episode | - |
| `/anilist/watch/:id/episodes/:number` | GET | Get streaming sources | `provider`, `dub` |
| `/anilist/filter` | GET | Filter anime list | `Filter` |
| `/anilist/search/:q` | GET | Search anime | - |
| `/anilist/franchise/:franchise` | GET | Get franchise info | `perPage`, `page` |

### Indexing Endpoints
| Endpoint | Method | Description | Query Parameters |
|----------|--------|-------------|-----------------|
| `/anilist/index` | PUT | Start indexing | `resume`, `delay` |
| `/anilist/index/stop` | PUT | Stop indexing | - |
| `/anilist/index/resume` | PUT | Resume indexing | `delay` |
| `/anilist/index/schedule` | PUT | Schedule indexing | - |
| `/anilist/index/unschedule` | PUT | Unschedule indexing | - |

## Shikimori
| Endpoint | Method | Description | Query/Body Parameters |
|----------|--------|-------------|---------------------|
| `/shikimori/info/:id` | GET | Get anime info | - |
| `/shikimori/info/:id/update` | GET | Update anime info | - |
| `/shikimori/franchise/:franchise` | GET | Get franchise info | - |
| `/shikimori/franchiseId/:franchise` | GET | Get franchise IDs | - |

## TMDB
| Endpoint | Method | Description | Query/Body Parameters |
|----------|--------|-------------|---------------------|
| `/tmdb/info/:id` | GET | Get TMDB info by Anilist ID | - |
| `/tmdb/info/:id/season` | GET | Get season info | - |

## TVDB
| Endpoint | Method | Description | Query/Body Parameters |
|----------|--------|-------------|---------------------|
| `/tvdb/info/:id` | GET | Get TVDB info by Anilist ID | - |

## Streaming Sources

### AnimePahe
| Endpoint | Method | Description | Query/Body Parameters |
|----------|--------|-------------|---------------------|
| `/animepahe/info/:id` | GET | Get anime info by Anilist ID | - |
| `/animepahe/watch/:id` | GET | Get streaming sources | - |

### AnimeKai
| Endpoint | Method | Description | Query/Body Parameters |
|----------|--------|-------------|---------------------|
| `/animekai/info/:id` | GET | Get anime info by Anilist ID | - |
| `/animekai/watch/:id` | GET | Get streaming sources | `dub` |

### Zoro
| Endpoint | Method | Description | Query/Body Parameters |
|----------|--------|-------------|---------------------|
| `/zoro/info/:id` | GET | Get anime info | - |
| `/zoro/anilist/:id` | GET | Get Zoro info by Anilist ID | - |
| `/zoro/watch/:id` | GET | Get streaming sources | `dub` |

## Exceptions
| Endpoint | Method | Description | Query/Body Parameters |
|----------|--------|-------------|---------------------|
| `/exceptions/all` | GET | Get all exceptions | `perPage`, `page` |
| `/exceptions/delete/:id` | DELETE | Delete exception | - |

## Response Formats

### Basic API Response
```typescript
interface ApiResponse<T> {
  data: T;
  pageInfo: {
    total: number;
    perPage: number;
    currentPage: number;
    lastPage: number;
    hasNextPage: boolean;
  };
}
```

### Error Response
```typescript
{
  statusCode: number;
  message: string;
}
```

### Filter
```typescript
export interface Filter {
  sort?: MediaSort[];
  perPage?: number;
  page?: number;
  sourceIn?: MediaSource[];
  popularityLesser?: number;
  popularityGreater?: number;
  popularityNot?: number;
  averageScoreLesser?: number;
  averageScoreGreater?: number;
  averageScoreNot?: number;
  licensedByIdIn?: string[];
  licensedByIn?: string[];
  tagCategoryNotIn?: string[];
  tagCategoryIn?: string[];
  tagNotIn?: string[];
  tagIn?: string[];
  genreNotIn?: string[];
  genreIn?: string[];
  durationLesser?: number;
  durationGreater?: number;
  episodesLesser?: number;
  episodesGreater?: number;
  statusNotIn?: MediaStatus[];
  statusNot?: MediaStatus;
  statusIn?: MediaStatus[];
  formatNotIn?: MediaFormat[];
  formatNot?: MediaFormat;
  formatIn?: MediaFormat[];
  endDateLike?: string;
  endDateLesser?: string;
  endDateGreater?: string;
  startDateLike?: string;
  startDateLesser?: string;
  startDateGreater?: string;
  idMalNotIn?: number[];
  idMalIn?: number[];
  idMalNot?: number;
  idNotIn?: number[];
  idIn?: number[];
  idNot?: number;
  query?: string;
  isLicensed?: boolean;
  countryOfOrigin?: string;
  isAdult?: boolean;
  format?: MediaFormat;
  type?: MediaType;
  status?: MediaStatus;
  season?: MediaSeason;
  idMal?: number;
  id?: number;
}
```

### Media Enums
```typescript
export enum MediaType {
  ANIME = 'ANIME',
  MANGA = 'MANGA',
}

export enum MediaFormat {
  TV = 'TV',
  TV_SHORT = 'TV_SHORT',
  MOVIE = 'MOVIE',
  SPECIAL = 'SPECIAL',
  OVA = 'OVA',
  ONA = 'ONA',
  MUSIC = 'MUSIC',
  MANGA = 'MANGA',
  NOVEL = 'NOVEL',
  ONE_SHOT = 'ONE_SHOT',
}

export enum MediaStatus {
  FINISHED = 'FINISHED',
  RELEASING = 'RELEASING',
  NOT_YET_RELEASED = 'NOT_YET_RELEASED',
  CANCELLED = 'CANCELLED',
  HIATUS = 'HIATUS',
}

export enum MediaSeason {
  WINTER = 'WINTER',
  SPRING = 'SPRING',
  SUMMER = 'SUMMER',
  FALL = 'FALL',
}

export enum MediaSource {
  ORIGINAL = 'ORIGINAL',
  MANGA = 'MANGA',
  LIGHT_NOVEL = 'LIGHT_NOVEL',
  VISUAL_NOVEL = 'VISUAL_NOVEL',
  VIDEO_GAME = 'VIDEO_GAME',
  OTHER = 'OTHER',
  NOVEL = 'NOVEL',
  DOUJINSHI = 'DOUJINSHI',
  ANIME = 'ANIME',
}

export enum MediaSort {
  ID = 'id',
  ID_DESC = 'id_desc',
  TITLE_ROMAJI = 'title_romaji',
  TITLE_ROMAJI_DESC = 'title_romaji_desc',
  TITLE_ENGLISH = 'title_english',
  TITLE_ENGLISH_DESC = 'title_english_desc',
  TITLE_NATIVE = 'title_native',
  TITLE_NATIVE_DESC = 'title_native_desc',
  TYPE = 'type',
  TYPE_DESC = 'type_desc',
  FORMAT = 'format',
  FORMAT_DESC = 'format_desc',
  START_DATE = 'start_date',
  START_DATE_DESC = 'start_date_desc',
  END_DATE = 'end_date',
  END_DATE_DESC = 'end_date_desc',
  SCORE = 'score',
  SCORE_DESC = 'score_desc',
  POPULARITY = 'popularity',
  POPULARITY_DESC = 'popularity_desc',
  TRENDING = 'trending',
  TRENDING_DESC = 'trending_desc',
  EPISODES = 'episodes',
  EPISODES_DESC = 'episodes_desc',
  DURATION = 'duration',
  DURATION_DESC = 'duration_desc',
  STATUS = 'status',
  STATUS_DESC = 'status_desc',
  RECENT = 'recent',
  RECENT_DESC = 'recent_desc',
}

export enum MediaTrendSort {
  ID = 'id',
  ID_DESC = 'id_desc',
  MEDIA_ID = 'media_id',
  MEDIA_ID_DESC = 'media_id_desc',
  DATE = 'date',
  DATE_DESC = 'date_desc',
  SCORE = 'score',
  SCORE_DESC = 'score_desc',
  POPULARITY = 'popularity',
  POPULARITY_DESC = 'popularity_desc',
  TRENDING = 'trending',
  TRENDING_DESC = 'trending_desc',
}

export enum MediaRelation {
  ADAPTATION = 'ADAPTATION',
  PREQUEL = 'PREQUEL',
  SEQUEL = 'SEQUEL',
  PARENT = 'PARENT',
  SIDE_STORY = 'SIDE_STORY',
  CHARACTER = 'CHARACTER',
  SPIN_OFF = 'SPIN_OFF',
  SUMMARY = 'SUMMARY',
  ALTERNATIVE = 'ALTERNATIVE',
  OTHER = 'OTHER',
}

export enum MediaExternalLinkType {
  INFO = 'INFO',
  STREAMING = 'STREAMING',
}
```