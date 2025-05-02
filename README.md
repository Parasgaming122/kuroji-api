<p align="center">
  <a href="hhttps://github.com/veaquer/veanime__nestend">
    <img src="https://raw.githubusercontent.com/veaquer/veanime__nestend/main/images/background.jpg" alt="Background" width="100%" style="max-height: 300px; object-fit: cover; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);" />
  </a>
</p>

# <p align="center">VeAnime - Modern Anime API and Content Hub</p>

<p align="center">
  <a href="https://nestjs.com" target="_blank"><img src="https://img.shields.io/badge/Built%20with-NestJS-ea2845" alt="Built with NestJS"></a>
  <a href="#"><img src="https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white" alt="TypeScript"></a>
  <a href="#"><img src="https://img.shields.io/badge/Prisma-3982CE?style=flat&logo=Prisma&logoColor=white" alt="Prisma"></a>
  <a href="#"><img src="https://img.shields.io/badge/License-MIT-green.svg" alt="License"></a>
</p>

VeAnime is a powerful and flexible API for accessing anime information, streaming sources, and related content from various providers. Built on NestJS and TypeScript, it provides a robust and scalable solution for anime-related applications.

## Features

- 🔍 Search and retrieve detailed anime information
- 🎬 Access multiple streaming sources (AnimePahe, AnimeKai, Zoro)
- 📅 Get airing schedules and updates
- 🔑 Secure authentication system
- 🖼️ Cloudinary integration for image hosting
- 🧐 Detailed exception handling and logging

## Installation

```bash
# Install dependencies
$ yarn install

# Set up environment variables
$ cp .env.example .env
# Edit .env with your API keys and database settings

# Run database migrations
$ npx prisma migrate dev

# Start the server
$ yarn start:dev
```

## API Documentation

### Table of Contents
- [Authentication](#authentication)
- [User](#user)
- [Anime](#anime)
- [Shikimori](#shikimori)
- [Streaming Sources](#streaming-sources)
- [Exceptions](#exceptions)
- [Console](#console)
- [Cloudinary](#cloudinary)
- [Filters and DTOs](#filters-and-dtos)

### Authentication
| Endpoint | Method | Description | Query/Body Parameters |
|----------|--------|-------------|---------------------|
| `/auth/register` | POST | Register new user | `CreateUserDto` |
| `/auth/oauth2/register` | POST | Register with OAuth2 | `OAuth2Dto` |

### User
| Endpoint | Method | Description | Query/Body Parameters |
|----------|--------|-------------|---------------------|
| `/user/profile` | GET | Get user profile | `id?` (optional) |
| `/user/update` | POST | Update user profile | `UpdateUserDto` |
| `/user/avatar/upload` | POST | Upload user avatar | `file` (multipart) |

### Anime
| Endpoint | Method | Description | Query/Body Parameters |
|----------|--------|-------------|---------------------|
| `/anime/info/:id` | GET | Get anime details | - |
| `/anime/info/:id/characters` | GET | Get anime characters | `perPage`, `page` |
| `/anime/info/:id/episodes` | GET | Get episode list | - |
| `/anime/info/:id/episodes/:number` | GET | Get specific episode | - |
| `/anime/info/:id/providers/:number` | GET | Get specific episode provider | - |
| `/anime/filter` | GET | Filter anime list | `FilterDto` |
| `/anime/search/:q` | GET | Search anime | - |
| `/anime/schedule` | GET | Get anime airing schedule | - |
| `/anime/info/:id/tmdb` | GET | Get TMDB info by Anilist ID | - |
| `/anime/info/:id/tmdb/season` | GET | Get TMDB season info | - |
| `/anime/info/:id/tvdb` | GET | Get TVDB info by Anilist ID | - |
| `/anime/info/:id/tvdb/translations/:language` | GET | Get TVDB translations | - |
| `/anime/tvdb/languages` | GET | Get TVDB available languages | - |
| `/anime/tvdb/languages` | PUT | Update TVDB languages | - |

#### Indexing Endpoints
| Endpoint | Method | Description | Query Parameters |
|----------|--------|-------------|-----------------|
| `/anime/index` | PUT | Start indexing | `delay` |
| `/anime/index/stop` | PUT | Stop indexing | - |
| `/anime/index/sleep/:sleep` | PUT | Set indexer sleep time | - |
| `/anime/index/schedule` | PUT | Schedule indexing | - |
| `/anime/index/unschedule` | PUT | Unschedule indexing | - |

### Shikimori
| Endpoint | Method | Description | Query/Body Parameters |
|----------|--------|-------------|---------------------|
| `/shikimori/info/:id` | GET | Get anime info | - |
| `/shikimori/info/:id` | PUT | Update anime info | - |
| `/shikimori/franchise/:franchise` | GET | Get franchise info | - |
| `/shikimori/franchiseId/:franchise` | GET | Get franchise IDs | - |

### Streaming Sources

#### AnimePahe
| Endpoint | Method | Description | Query/Body Parameters |
|----------|--------|-------------|---------------------|
| `/animepahe/info/:id` | GET | Get anime info by Anilist ID | - |
| `/animepahe/watch/:id` | GET | Get streaming sources | - |

#### AnimeKai
| Endpoint | Method | Description | Query/Body Parameters |
|----------|--------|-------------|---------------------|
| `/animekai/info/:id` | GET | Get anime info by Anilist ID | - |
| `/animekai/watch/:id` | GET | Get streaming sources | `dub` (boolean) |

#### Zoro
| Endpoint | Method | Description | Query/Body Parameters |
|----------|--------|-------------|---------------------|
| `/zoro/info/:id` | GET | Get anime info | - |
| `/zoro/anilist/:id` | GET | Get Zoro info by Anilist ID | - |
| `/zoro/watch/:id` | GET | Get streaming sources | `dub` (boolean) |

### Exceptions
| Endpoint | Method | Description | Query/Body Parameters |
|----------|--------|-------------|---------------------|
| `/exceptions` | GET | Get all exceptions | `ExceptionFilterDto` |
| `/exceptions/delete/:id` | DELETE | Delete exception | - |

### Console
| Endpoint | Method | Description | Query/Body Parameters |
|----------|--------|-------------|---------------------|
| `/console/logs` | GET | Get logs from console | - |
| `/console/warns` | GET | Get warnings from console | - |
| `/console/errors` | GET | Get errors from console | - |

### Cloudinary
| Endpoint | Method | Description | Query/Body Parameters |
|----------|--------|-------------|---------------------|
| `/cloudinary` | - | Cloudinary integration endpoints | - |

### Filters and DTOs

<details>
<summary><strong>Anime Filter Parameters</strong> (click to expand)</summary>

```typescript
// Filter parameters for anime queries
{
  // Pagination
  page?: number;            // Page number for results
  perPage?: number;         // Number of results per page
  
  // Search and query
  query?: string;           // Text search query
  
  // Basic filters
  id?: number;              // Filter by Anilist ID
  idIn?: number[];          // Filter by multiple Anilist IDs
  idNot?: number;           // Exclude specific Anilist ID
  idNotIn?: number[];       // Exclude multiple Anilist IDs
  
  // MAL-specific filters
  idMal?: number;           // Filter by MyAnimeList ID
  idMalIn?: number[];       // Filter by multiple MAL IDs
  idMalNot?: number;        // Exclude specific MAL ID
  idMalNotIn?: number[];    // Exclude multiple MAL IDs
  
  // Format filters
  format?: "TV" | "TV_SHORT" | "MOVIE" | "SPECIAL" | "OVA" | "ONA" | "MUSIC";
  formatIn?: string[];      // Include multiple formats
  formatNot?: string;       // Exclude specific format
  formatNotIn?: string[];   // Exclude multiple formats
  
  // Status filters
  status?: "FINISHED" | "RELEASING" | "NOT_YET_RELEASED" | "CANCELLED" | "HIATUS";
  statusIn?: string[];      // Include multiple statuses
  statusNot?: string;       // Exclude specific status
  statusNotIn?: string[];   // Exclude multiple statuses
  
  // Season filters
  season?: "WINTER" | "SPRING" | "SUMMER" | "FALL";
  
  // Source material filters
  sourceIn?: ("ORIGINAL" | "MANGA" | "LIGHT_NOVEL" | "VISUAL_NOVEL" | 
              "VIDEO_GAME" | "OTHER" | "NOVEL" | "DOUJINSHI" | "ANIME")[];
  
  // Content filters
  isAdult?: boolean;        // Filter adult content
  isLicensed?: boolean;     // Filter licensed content
  countryOfOrigin?: string; // Filter by country code
  
  // Date filters
  startDateGreater?: string; // After this date (YYYY-MM-DD)
  startDateLesser?: string;  // Before this date (YYYY-MM-DD)
  startDateLike?: string;    // Similar to this date
  endDateGreater?: string;   // After this date
  endDateLesser?: string;    // Before this date
  endDateLike?: string;      // Similar to this date
  
  // Number filters
  episodesGreater?: number; // More than this many episodes
  episodesLesser?: number;  // Less than this many episodes
  durationGreater?: number; // Longer than this (minutes)
  durationLesser?: number;  // Shorter than this (minutes)
  
  // Popularity/score filters
  popularityGreater?: number;
  popularityLesser?: number;
  popularityNot?: number;
  scoreGreater?: number;
  scoreLesser?: number;
  scoreNot?: number;
  
  // Tag/genre filters
  genreIn?: string[];       // Include these genres
  genreNotIn?: string[];    // Exclude these genres
  tagIn?: string[];         // Include these tags
  tagNotIn?: string[];      // Exclude these tags
  tagCategoryIn?: string[]; // Include these tag categories
  tagCategoryNotIn?: string[]; // Exclude these tag categories
  
  // License filters
  licensedByIn?: string[];  // Include these licensors
  licensedByIdIn?: string[]; // Include these licensor IDs
  
  // Additional filters
  sort?: string[];          // Sort options (see MediaSort enum)
}
```
</details>

<details>
<summary><strong>Media Sort Options</strong> (click to expand)</summary>

```typescript
// Available sort options for media queries
{
  // ID-based sorting
  "id"                  // Sort by ID ascending
  "id_desc"             // Sort by ID descending
  
  // Title-based sorting
  "title_romaji"        // Sort by romaji title ascending
  "title_romaji_desc"   // Sort by romaji title descending
  "title_english"       // Sort by English title ascending
  "title_english_desc"  // Sort by English title descending
  "title_native"        // Sort by native title ascending
  "title_native_desc"   // Sort by native title descending
  
  // Type and format sorting
  "type"                // Sort by media type ascending
  "type_desc"           // Sort by media type descending
  "format"              // Sort by format ascending
  "format_desc"         // Sort by format descending
  
  // Date-based sorting
  "start_date"          // Sort by start date ascending
  "start_date_desc"     // Sort by start date descending
  "end_date"            // Sort by end date ascending
  "end_date_desc"       // Sort by end date descending
  "updated_at"          // Sort by last update ascending
  "updated_at_desc"     // Sort by last update descending
  
  // Popularity/score sorting
  "score"               // Sort by score ascending
  "score_desc"          // Sort by score descending
  "popularity"          // Sort by popularity ascending
  "popularity_desc"     // Sort by popularity descending
  "trending"            // Sort by trending score ascending
  "trending_desc"       // Sort by trending score descending
  
  // Content-based sorting
  "episodes"            // Sort by episode count ascending
  "episodes_desc"       // Sort by episode count descending
  "duration"            // Sort by duration ascending
  "duration_desc"       // Sort by duration descending
  "status"              // Sort by status ascending
  "status_desc"         // Sort by status descending
}
```
</details>

<details>
<summary><strong>Exception Filter Parameters</strong> (click to expand)</summary>

```typescript
// Filter parameters for exception queries
{
  // Filter by exception details
  statusCode?: number;     // HTTP status code
  path?: string;           // Request path
  message?: string;        // Error message
  method?: string;         // HTTP method (GET, POST, etc.)
  
  // Filter by date range
  fromDate?: string;       // Start date (ISO format)
  toDate?: string;         // End date (ISO format)
  
  // Pagination
  page?: number;           // Page number (min: 1)
  perPage?: number;        // Results per page (min: 1)
}
```
</details>

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

## Development

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Testing

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is [MIT licensed](LICENSE).

## Acknowledgments

- [NestJS](https://nestjs.com/) - The framework used
- [Prisma](https://www.prisma.io/) - ORM
- Various anime API providers for their data