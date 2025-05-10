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
- [Anime](#anime)
- [Shikimori](#shikimori)
- [Streaming Sources](#streaming-sources)
- [Exceptions](#exceptions)
- [Console](#console)
- [TMDB](#tmdb)
- [TVDB](#tvdb)
- [Filters and DTOs](#filters-and-dtos)

### Anime

<details>
<summary>Get Anime Details</summary>

**URL**: `/anime/info/:id`  
**Method**: `GET`  
**Description**: Get detailed information about an anime by ID

**Path Parameters**:
```
id: number
```

**Response Type**: `AnimeWithRelations`

**Response**:
```json
{
  "id": "number",
  "title": {
    "romaji": "string",
    "english": "string",
    "native": "string"
  },
  "coverImage": {
    "extraLarge": "string",
    "large": "string",
    "medium": "string",
    "color": "string"
  },
  "bannerImage": "string",
  "description": "string",
  "genres": ["string"],
  "episodes": "number",
  "status": "string",
  "season": "string",
  "seasonYear": "number",
  "format": "string",
  "duration": "number",
  "averageScore": "number",
  "popularity": "number",
  "source": "string",
  "studios": ["string"],
  "startDate": {
    "year": "number",
    "month": "number",
    "day": "number"
  },
  "endDate": {
    "year": "number",
    "month": "number",
    "day": "number"
  },
  "relations": [
    {
      "id": "number",
      "relationType": "string",
      "anime": {
        "id": "number",
        "title": {
          "romaji": "string",
          "english": "string",
          "native": "string"
        },
        "coverImage": {
          "medium": "string"
        }
      }
    }
  ],
  "trailer": {
    "id": "string",
    "site": "string",
    "thumbnail": "string"
  }
}
```
</details>

<details>
<summary>Get Anime Recommendations</summary>

**URL**: `/anime/info/:id/recommendations`  
**Method**: `GET`  
**Description**: Get anime recommendations based on an anime ID

**Path Parameters**:
```
id: number
```

**Query Parameters**:
```
perPage?: number (default: 20)
page?: number (default: 1)
```

**Response Type**: `PaginatedAnimeRecommendations`

**Response**:
```json
{
  "data": [
    {
      "id": "number",
      "title": {
        "romaji": "string",
        "english": "string",
        "native": "string"
      },
      "coverImage": {
        "extraLarge": "string",
        "large": "string",
        "medium": "string",
        "color": "string"
      }
    }
  ],
  "pageInfo": {
    "total": "number",
    "perPage": "number",
    "currentPage": "number",
    "lastPage": "number",
    "hasNextPage": "boolean"
  }
}
```
</details>

<details>
<summary>Get Anime Characters</summary>

**URL**: `/anime/info/:id/characters`  
**Method**: `GET`  
**Description**: Get characters from an anime

**Path Parameters**:
```
id: number
```

**Query Parameters**:
```
perPage?: number (default: 20)
page?: number (default: 1)
```

**Response Type**: `PaginatedCharacters`

**Response**:
```json
{
  "data": [
    {
      "id": "number",
      "name": {
        "full": "string",
        "native": "string"
      },
      "image": {
        "large": "string",
        "medium": "string"
      },
      "role": "string",
      "voiceActors": [
        {
          "id": "number",
          "name": {
            "full": "string",
            "native": "string"
          },
          "image": {
            "large": "string",
            "medium": "string"
          },
          "language": "string"
        }
      ]
    }
  ],
  "pageInfo": {
    "total": "number",
    "perPage": "number",
    "currentPage": "number",
    "lastPage": "number",
    "hasNextPage": "boolean"
  }
}
```
</details>

<details>
<summary>Get Anime Chronology</summary>

**URL**: `/anime/info/:id/chronology`  
**Method**: `GET`  
**Description**: Get chronological order of related anime

**Path Parameters**:
```
id: number
```

**Query Parameters**:
```
perPage?: number (default: 20)
page?: number (default: 1)
```

**Response Type**: `PaginatedAnimeChronology`

**Response**:
```json
{
  "data": [
    {
      "id": "number",
      "title": {
        "romaji": "string",
        "english": "string",
        "native": "string"
      },
      "format": "string",
      "type": "string",
      "startDate": {
        "year": "number",
        "month": "number",
        "day": "number"
      }
    }
  ],
  "pageInfo": {
    "total": "number",
    "perPage": "number",
    "currentPage": "number",
    "lastPage": "number",
    "hasNextPage": "boolean"
  }
}
```
</details>

<details>
<summary>Get Anime Episodes</summary>

**URL**: `/anime/info/:id/episodes`  
**Method**: `GET`  
**Description**: Get episode list for an anime

**Path Parameters**:
```
id: number
```

**Response Type**: `AnimeEpisodeList`

**Response**:
```json
{
  "episodes": [
    {
      "id": "string",
      "number": "number",
      "title": "string",
      "description": "string",
      "image": "string",
      "airDate": "string"
    }
  ]
}
```
</details>

<details>
<summary>Get Specific Episode</summary>

**URL**: `/anime/info/:id/episodes/:number`  
**Method**: `GET`  
**Description**: Get details of a specific episode

**Path Parameters**:
```
id: number
number: number
```

**Response Type**: `Episode`

**Response**:
```json
{
  "id": "string",
  "number": "number",
  "title": "string",
  "description": "string",
  "image": "string",
  "airDate": "string"
}
```
</details>

<details>
<summary>Get Episode Providers</summary>

**URL**: `/anime/info/:id/providers/:number`  
**Method**: `GET`  
**Description**: Get available streaming providers for a specific episode

**Path Parameters**:
```
id: number
number: number
```

**Response Type**: `ProvidersList`

**Response**:
```json
{
  "providers": ["string"]
}
```
</details>

<details>
<summary>Get All Providers for Anime</summary>

**URL**: `/anime/info/:id/providers`  
**Method**: `GET`  
**Description**: Get all available streaming providers for all episodes of an anime

**Path Parameters**:
```
id: number
```

**Response Type**: `AllProviders`

**Response**:
```json
{
  "providers": {
    "1": ["string"],
    "2": ["string"]
  }
}
```
</details>

<details>
<summary>Get Streaming Sources</summary>

**URL**: `/anime/watch/:id/episodes/:number`  
**Method**: `GET`  
**Description**: Get streaming sources for a specific episode

**Path Parameters**:
```
id: number
number: number
```

**Query Parameters**:
```
provider?: string (default: "ANIWATCH")
dub?: boolean (default: false)
```

**Response Type**: `StreamingSources`

**Response**:
```json
{
  "sources": [
    {
      "url": "string",
      "quality": "string",
      "isM3U8": "boolean"
    }
  ],
  "subtitles": [
    {
      "url": "string",
      "lang": "string"
    }
  ],
  "headers": {
    "Referer": "string"
  }
}
```
</details>

<details>
<summary>Filter Anime List</summary>

**URL**: `/anime/filter`  
**Method**: `GET`  
**Description**: Filter anime list based on various criteria

**Query Parameters**:
```typescript
// FilterDto
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
  sort?: string[];          // Sort options
}
```

**Response Type**: `PaginatedAnimeList`

**Response**:
```json
{
  "data": [
    {
      "id": "number",
      "title": {
        "romaji": "string",
        "english": "string",
        "native": "string"
      },
      "coverImage": {
        "extraLarge": "string",
        "large": "string",
        "medium": "string",
        "color": "string"
      },
      "bannerImage": "string",
      "format": "string",
      "status": "string",
      "episodes": "number",
      "season": "string",
      "seasonYear": "number",
      "averageScore": "number",
      "genres": ["string"]
    }
  ],
  "pageInfo": {
    "total": "number",
    "perPage": "number",
    "currentPage": "number",
    "lastPage": "number",
    "hasNextPage": "boolean"
  }
}
```
</details>

<details>
<summary>Search Anime</summary>

**URL**: `/anime/search/:q`  
**Method**: `GET`  
**Description**: Search for anime by query string

**Path Parameters**:
```
q: string
```

**Response Type**: `AnimeSearchResults`

**Response**:
```json
{
  "data": [
    {
      "id": "number",
      "title": {
        "romaji": "string",
        "english": "string",
        "native": "string"
      },
      "coverImage": {
        "extraLarge": "string",
        "large": "string",
        "medium": "string",
        "color": "string"
      }
    }
  ]
}
```
</details>

<details>
<summary>Get Anime Schedule</summary>

**URL**: `/anime/schedule`  
**Method**: `GET`  
**Description**: Get currently airing anime schedule

**Response Type**: `AnimeSchedule`

**Response**:
```json
{
  "sunday": [
    {
      "id": "number",
      "title": {
        "romaji": "string",
        "english": "string",
        "native": "string"
      },
      "coverImage": {
        "extraLarge": "string",
        "large": "string",
        "medium": "string",
        "color": "string"
      },
      "airingAt": "string",
      "episode": "number"
    }
  ],
  "monday": [],
  "tuesday": [],
  "wednesday": [],
  "thursday": [],
  "friday": [],
  "saturday": []
}
```
</details>

<details>
<summary>Get Franchise Info</summary>

**URL**: `/anime/franchise/:franchise`  
**Method**: `GET`  
**Description**: Get information about an anime franchise

**Path Parameters**:
```
franchise: string
```

**Query Parameters**:
```
perPage?: number (default: 20)
page?: number (default: 1)
```

**Response Type**: `PaginatedFranchise`

**Response**:
```json
{
  "data": [
    {
      "id": "number",
      "title": {
        "romaji": "string",
        "english": "string",
        "native": "string"
      },
      "format": "string",
      "startDate": {
        "year": "number",
        "month": "number",
        "day": "number"
      }
    }
  ],
  "pageInfo": {
    "total": "number",
    "perPage": "number",
    "currentPage": "number",
    "lastPage": "number",
    "hasNextPage": "boolean"
  }
}
```
</details>

<details>
<summary>Start Indexing</summary>

**URL**: `/anime/index`  
**Method**: `PUT`  
**Description**: Start the anime indexing process

**Query Parameters**:
```
delay?: number (default: 10)
```

**Response Type**: `IndexerStatus`

**Response**:
```json
{
  "status": "Indexing started"
}
```
</details>

<details>
<summary>Stop Indexing</summary>

**URL**: `/anime/index/stop`  
**Method**: `PUT`  
**Description**: Stop the anime indexing process

**Response Type**: `IndexerStatus`

**Response**:
```json
{
  "status": "Indexing stopped"
}
```
</details>

<details>
<summary>Schedule Indexing</summary>

**URL**: `/anime/index/schedule`  
**Method**: `PUT`  
**Description**: Schedule periodic indexing

**Response Type**: `IndexerStatus`

**Response**:
```json
{
  "status": "Indexing scheduled"
}
```
</details>

<details>
<summary>Unschedule Indexing</summary>

**URL**: `/anime/index/unschedule`  
**Method**: `PUT`  
**Description**: Cancel scheduled indexing

**Response Type**: `IndexerStatus`

**Response**:
```json
{
  "status": "Indexing unscheduled"
}
```
</details>

### Shikimori

<details>
<summary>Get Shikimori Anime Info</summary>

**URL**: `/shikimori/info/:id`  
**Method**: `GET`  
**Description**: Get anime information from Shikimori

**Path Parameters**:
```
id: number
```

**Response Type**: `ShikimoriAnime`

**Response**:
```json
{
  "id": "number",
  "name": "string",
  "russian": "string",
  "image": {
    "original": "string",
    "preview": "string",
    "x96": "string",
    "x48": "string"
  },
  "url": "string",
  "kind": "string",
  "score": "number",
  "status": "string",
  "episodes": "number",
  "episodesAired": "number",
  "aired_on": "string",
  "released_on": "string",
  "rating": "string",
  "genres": [
    {
      "id": "number",
      "name": "string",
      "russian": "string"
    }
  ],
  "studios": [
    {
      "id": "number",
      "name": "string",
      "filtered_name": "string"
    }
  ]
}
```
</details>

<details>
<summary>Update Shikimori Anime Info</summary>

**URL**: `/shikimori/info/:id`  
**Method**: `PUT`  
**Description**: Update anime information from Shikimori

**Path Parameters**:
```
id: number
```

**Response Type**: `ShikimoriUpdateResponse`

**Response**:
```json
{
  "id": "number",
  "name": "string",
  "russian": "string",
  "image": {
    "original": "string",
    "preview": "string",
    "x96": "string",
    "x48": "string"
  },
  "updatedAt": "string"
}
```
</details>

<details>
<summary>Get Shikimori Franchise</summary>

**URL**: `/shikimori/franchise/:franchise`  
**Method**: `GET`  
**Description**: Get franchise information from Shikimori

**Path Parameters**:
```
franchise: string
```

**Response Type**: `ShikimoriFranchise`

**Response**:
```json
{
  "links": [
    {
      "id": "number",
      "source_id": "number",
      "target_id": "number",
      "source": {
        "id": "number",
        "name": "string",
        "russian": "string",
        "image": {
          "original": "string",
          "preview": "string",
          "x96": "string",
          "x48": "string"
        },
        "kind": "string",
        "status": "string"
      },
      "target": {
        "id": "number",
        "name": "string",
        "russian": "string",
        "image": {
          "original": "string",
          "preview": "string",
          "x96": "string",
          "x48": "string"
        },
        "kind": "string",
        "status": "string"
      },
      "relation": "string",
      "relation_russian": "string"
    }
  ]
}
```
</details>

<details>
<summary>Get Franchise IDs</summary>

**URL**: `/shikimori/franchiseId/:franchise`  
**Method**: `GET`  
**Description**: Get list of IDs in a franchise

**Path Parameters**:
```
franchise: string
```

**Response Type**: `FranchiseIDs`

**Response**:
```json
{
  "ids": ["number"]
}
```
</details>

### Streaming Sources

#### AnimePahe

<details>
<summary>Get AnimePahe Anime Info</summary>

**URL**: `/anime/animepahe/info/:id`  
**Method**: `GET`  
**Description**: Get anime information from AnimePahe

**Path Parameters**:
```
id: number
```

**Response Type**: `AnimePaheAnime`

**Response**:
```json
{
  "id": "string",
  "title": "string",
  "image": "string",
  "episodes": [
    {
      "id": "string",
      "number": "number",
      "title": "string",
      "created_at": "string"
    }
  ]
}
```
</details>

<details>
<summary>Get AnimePahe Streaming Sources</summary>

**URL**: `/anime/animepahe/watch/:id`  
**Method**: `GET`  
**Description**: Get streaming sources from AnimePahe

**Path Parameters**:
```
id: string (AnimePahe ID)
```

**Response Type**: `AnimePaheSources`

**Response**:
```json
{
  "sources": [
    {
      "url": "string",
      "quality": "string",
      "isM3U8": false
    }
  ],
  "subtitles": [],
  "headers": {
    "Referer": "string"
  }
}
```
</details>

#### AnimeKai

<details>
<summary>Get AnimeKai Anime Info</summary>

**URL**: `/anime/animekai/info/:id`  
**Method**: `GET`  
**Description**: Get anime information from AnimeKai

**Path Parameters**:
```
id: number
```

**Response Type**: `AnimeKaiAnime`

**Response**:
```json
{
  "id": "string",
  "title": "string",
  "image": "string",
  "episodes": [
    {
      "id": "string",
      "number": "number",
      "title": "string"
    }
  ]
}
```
</details>

<details>
<summary>Get AnimeKai Streaming Sources</summary>

**URL**: `/anime/animekai/watch/:id`  
**Method**: `GET`  
**Description**: Get streaming sources from AnimeKai

**Path Parameters**:
```
id: string (AnimeKai ID)
```

**Query Parameters**:
```
dub?: boolean (default: false)
```

**Response Type**: `AnimeKaiSources`

**Response**:
```json
{
  "sources": [
    {
      "url": "string",
      "quality": "string",
      "isM3U8": "boolean"
    }
  ],
  "subtitles": [
    {
      "url": "string",
      "lang": "string"
    }
  ],
  "headers": {
    "Referer": "string"
  }
}
```
</details>

#### Zoro

<details>
<summary>Get Zoro Anime Info</summary>

**URL**: `/anime/zoro/info/:id`  
**Method**: `GET`  
**Description**: Get anime information from Zoro

**Path Parameters**:
```
id: string (Zoro ID)
```

**Response Type**: `ZoroAnime`

**Response**:
```json
{
  "id": "string",
  "title": "string",
  "image": "string",
  "episodes": [
    {
      "id": "string",
      "number": "number",
      "title": "string"
    }
  ]
}
```
</details>

<details>
<summary>Get Zoro Info by Anilist ID</summary>

**URL**: `/anime/zoro/anilist/:id`  
**Method**: `GET`  
**Description**: Get Zoro anime information using Anilist ID

**Path Parameters**:
```
id: number
```

**Response Type**: `ZoroAnime`

**Response**:
```json
{
  "id": "string",
  "title": "string",
  "image": "string",
  "episodes": [
    {
      "id": "string",
      "number": "number",
      "title": "string"
    }
  ]
}
```
</details>

<details>
<summary>Get Zoro Streaming Sources</summary>

**URL**: `/anime/zoro/watch/:id`  
**Method**: `GET`  
**Description**: Get streaming sources from Zoro

**Path Parameters**:
```
id: string (Zoro ID)
```

**Query Parameters**:
```
dub?: boolean (default: false)
```

**Response Type**: `ZoroSources`

**Response**:
```json
{
  "sources": [
    {
      "url": "string",
      "quality": "string",
      "isM3U8": "boolean"
    }
  ],
  "subtitles": [
    {
      "url": "string",
      "lang": "string"
    }
  ],
  "headers": {
    "Referer": "string"
  }
}
```
</details>

### Exceptions

<details>
<summary>Get All Exceptions</summary>

**URL**: `/exceptions`  
**Method**: `GET`  
**Description**: Get all logged exceptions

**Query Parameters**:
```typescript
// ExceptionFilterDto
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

**Response Type**: `PaginatedExceptions`

**Response**:
```json
{
  "data": [
    {
      "id": "number",
      "statusCode": "number",
      "message": "string",
      "path": "string",
      "method": "string",
      "timestamp": "string",
      "stack": "string"
    }
  ],
  "pageInfo": {
    "total": "number",
    "perPage": "number",
    "currentPage": "number",
    "lastPage": "number",
    "hasNextPage": "boolean"
  }
}
```
</details>

<details>
<summary>Delete Exception</summary>

**URL**: `/exceptions/delete/:id`  
**Method**: `DELETE`  
**Description**: Delete a logged exception

**Path Parameters**:
```
id: number
```

**Response Type**: `DeleteExceptionResponse`

**Response**:
```json
{
  "deleted": true,
  "id": "number"
}
```
</details>

### Console

<details>
<summary>Get Console Logs</summary>

**URL**: `/console/logs`  
**Method**: `GET`  
**Description**: Get all console logs

**Response Type**: `ConsoleLogEntry[]`

**Response**:
```json
[
  {
    "message": "string",
    "timestamp": "string"
  }
]
```
</details>

<details>
<summary>Get Console Warnings</summary>

**URL**: `/console/warns`  
**Method**: `GET`  
**Description**: Get all console warnings

**Response Type**: `ConsoleWarnEntry[]`

**Response**:
```json
[
  {
    "message": "string",
    "timestamp": "string"
  }
]
```
</details>

<details>
<summary>Get Console Errors</summary>

**URL**: `/console/errors`  
**Method**: `GET`  
**Description**: Get all console errors

**Response Type**: `ConsoleErrorEntry[]`

**Response**:
```json
[
  {
    "message": "string",
    "timestamp": "string",
    "stack": "string"
  }
]
```
</details>

### TMDB

<details>
<summary>Get TMDB Info by Anilist ID</summary>

**URL**: `/anime/info/:id/tmdb`  
**Method**: `GET`  
**Description**: Get TMDB information using Anilist ID

**Path Parameters**:
```
id: number
```

**Response Type**: `TMDBShow`

**Response**:
```json
{
  "id": "number",
  "name": "string",
  "original_name": "string",
  "overview": "string",
  "poster_path": "string",
  "backdrop_path": "string",
  "first_air_date": "string",
  "seasons": [
    {
      "id": "number",
      "name": "string",
      "overview": "string",
      "season_number": "number",
      "episode_count": "number",
      "poster_path": "string",
      "air_date": "string"
    }
  ],
  "genres": [
    {
      "id": "number",
      "name": "string"
    }
  ],
  "status": "string",
  "vote_average": "number"
}
```
</details>

<details>
<summary>Get TMDB Season Info</summary>

**URL**: `/anime/info/:id/tmdb/season`  
**Method**: `GET`  
**Description**: Get TMDB season information

**Path Parameters**:
```
id: number
```

**Response Type**: `TMDBSeason`

**Response**:
```json
{
  "id": "number",
  "name": "string",
  "overview": "string",
  "season_number": "number",
  "air_date": "string",
  "episodes": [
    {
      "id": "number",
      "name": "string",
      "overview": "string",
      "episode_number": "number",
      "still_path": "string",
      "air_date": "string",
      "vote_average": "number",
      "runtime": "number"
    }
  ],
  "poster_path": "string"
}
```
</details>

### TVDB

<details>
<summary>Get TVDB Info by Anilist ID</summary>

**URL**: `/anime/info/:id/tvdb`  
**Method**: `GET`  
**Description**: Get TVDB information using Anilist ID

**Path Parameters**:
```
id: number
```

**Response Type**: `TVDBShow`

**Response**:
```json
{
  "id": "number",
  "name": "string",
  "overview": "string",
  "firstAired": "string",
  "image": "string",
  "network": "string",
  "status": "string",
  "seasons": [
    {
      "id": "number",
      "name": "string",
      "overview": "string",
      "number": "number",
      "imageUrl": "string",
      "episodes": [
        {
          "id": "number",
          "name": "string",
          "overview": "string",
          "number": "number",
          "image": "string",
          "firstAired": "string",
          "directors": ["string"],
          "writers": ["string"],
          "runtime": "number"
        }
      ]
    }
  ],
  "genres": ["string"]
}
```
</details>

<details>
<summary>Get TVDB Translations</summary>

**URL**: `/anime/info/:id/tvdb/translations/:language`  
**Method**: `GET`  
**Description**: Get TVDB translations for a specific language

**Path Parameters**:
```
id: number
language: string
```

**Response Type**: `TVDBTranslation`

**Response**:
```json
{
  "name": "string",
  "overview": "string",
  "language": "string"
}
```
</details>

<details>
<summary>Get TVDB Available Languages</summary>

**URL**: `/anime/tvdb/languages`  
**Method**: `GET`  
**Description**: Get list of available languages in TVDB

**Response Type**: `TVDBLanguage[]`

**Response**:
```json
[
  {
    "id": "string",
    "name": "string",
    "shortCode": "string",
    "englishName": "string"
  }
]
```
</details>

<details>
<summary>Update TVDB Languages</summary>

**URL**: `/anime/tvdb/languages`  
**Method**: `PUT`  
**Description**: Update the list of available TVDB languages

**Response Type**: `TVDBLanguageUpdateResponse`

**Response**:
```json
{
  "success": true,
  "message": "Languages updated",
  "count": "number"
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
  stack?: string; // Only in development mode
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