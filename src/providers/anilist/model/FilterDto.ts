import {
  IsOptional,
  IsNumber,
  IsBoolean,
  IsEnum,
  IsString,
  IsArray,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';
import {
  MediaFormat,
  MediaSeason,
  MediaSort,
  MediaStatus,
  MediaType,
  MediaSource,
} from '../graphql/types/MediaEnums';

export class FilterDto {
  constructor(partial?: Partial<FilterDto>) {
    Object.assign(this, partial)
  }

  @IsOptional()
  @IsArray()
  @IsEnum(MediaSort, { each: true })
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  sort?: MediaSort[];

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  perPage?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page?: number;

  @IsOptional()
  @IsArray()
  @IsEnum(MediaSource, { each: true })
  @Type(() => String)
  sourceIn?: MediaSource[];

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  popularityLesser?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  popularityGreater?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  popularityNot?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  averageScoreLesser?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  averageScoreGreater?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  averageScoreNot?: number;

  @IsOptional()
  @IsArray()
  @Type(() => String)
  licensedByIdIn?: string[];

  @IsOptional()
  @IsArray()
  @Type(() => String)
  licensedByIn?: string[];

  @IsOptional()
  @IsArray()
  @Type(() => String)
  tagCategoryNotIn?: string[];

  @IsOptional()
  @IsArray()
  @Type(() => String)
  tagCategoryIn?: string[];

  @IsOptional()
  @IsArray()
  @Type(() => String)
  tagNotIn?: string[];

  @IsOptional()
  @IsArray()
  @Type(() => String)
  tagIn?: string[];

  @IsOptional()
  @IsArray()
  @Type(() => String)
  genreNotIn?: string[];

  @IsOptional()
  @IsArray()
  @Type(() => String)
  genreIn?: string[];

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  durationLesser?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  durationGreater?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  episodesLesser?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  episodesGreater?: number;

  @IsOptional()
  @IsArray()
  @IsEnum(MediaStatus, { each: true })
  @Type(() => String)
  statusNotIn?: MediaStatus[];

  @IsOptional()
  @IsEnum(MediaStatus)
  @Type(() => String)
  statusNot?: MediaStatus;

  @IsOptional()
  @IsArray()
  @IsEnum(MediaStatus, { each: true })
  @Type(() => String)
  statusIn?: MediaStatus[];

  @IsOptional()
  @IsArray()
  @IsEnum(MediaFormat, { each: true })
  @Type(() => String)
  formatNotIn?: MediaFormat[];

  @IsOptional()
  @IsEnum(MediaFormat)
  @Type(() => String)
  formatNot?: MediaFormat;

  @IsOptional()
  @IsArray()
  @IsEnum(MediaFormat, { each: true })
  @Type(() => String)
  formatIn?: MediaFormat[];

  @IsOptional()
  @IsString()
  endDateLike?: string;

  @IsOptional()
  @IsString()
  endDateLesser?: string;

  @IsOptional()
  @IsString()
  endDateGreater?: string;

  @IsOptional()
  @IsString()
  startDateLike?: string;

  @IsOptional()
  @IsString()
  startDateLesser?: string;

  @IsOptional()
  @IsString()
  startDateGreater?: string;

  @IsOptional()
  @IsArray()
  @Type(() => Number)
  idMalNotIn?: number[];

  @IsOptional()
  @IsArray()
  @Type(() => Number)
  idMalIn?: number[];

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  idMalNot?: number;

  @IsOptional()
  @IsArray()
  @Type(() => Number)
  idNotIn?: number[];

  @IsOptional()
  @IsArray()
  @Type(() => Number)
  idIn?: number[];

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  idNot?: number;

  @IsOptional()
  @IsString()
  query?: string;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  isLicensed?: boolean;

  @IsOptional()
  @IsString()
  countryOfOrigin?: string;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  isAdult?: boolean;

  @IsOptional()
  @IsEnum(MediaFormat)
  @Type(() => String)
  format?: MediaFormat;

  @IsOptional()
  @IsEnum(MediaType)
  @Type(() => String)
  type?: MediaType;

  @IsOptional()
  @IsEnum(MediaStatus)
  @Type(() => String)
  status?: MediaStatus;

  @IsOptional()
  @IsEnum(MediaSeason)
  @Type(() => String)
  season?: MediaSeason;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  idMal?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  id?: number;
}