import Dimens from '../../../../configs/Dimens';
import { ReleaseFilter } from '../../../../filters/ReleaseFilter';
import { MediaSort } from '../types/MediaEnums';

type FlexibleField = string | number | boolean | object | null | undefined;

export default class AnilistQueryBuilder {
  private variables: { [key: string]: FlexibleField } = {};

  constructor() {
    this.variables.page = 1;
    this.variables.perPage = parseInt(Dimens.PER_PAGE, 10); // Assuming Dimens.PER_PAGE is a string
  }

  public convertToReleaseFilter(): ReleaseFilter {
    return new ReleaseFilter(
      this.variables.sort as MediaSort[],
      this.variables.perPage as number,
      this.variables.page as number,
      this.variables.source_in,
      this.variables.popularity_lesser as number,
      this.variables.popularity_greater as number,
      this.variables.popularity_not as number,
      this.variables.averageScore_lesser as number,
      this.variables.averageScore_greater as number,
      this.variables.averageScore_not as number,
      this.variables.licensedById_in,
      this.variables.licensedBy_in,
      this.variables.tagCategory_not_in,
      this.variables.tagCategory_in,
      this.variables.tag_not_in,
      this.variables.tag_in,
      this.variables.genre_not_in,
      this.variables.genre_in,
      this.variables.duration_lesser as number,
      this.variables.duration_greater as number,
      this.variables.episodes_lesser as number,
      this.variables.episodes_greater as number,
      this.variables.status_not_in,
      this.variables.status_not,
      this.variables.status_in,
      this.variables.format_not_in,
      this.variables.format_not,
      this.variables.format_in,
      this.variables.endDate_like as string,
      this.variables.endDate_lesser as string,
      this.variables.endDate_greater as string,
      this.variables.startDate_like as string,
      this.variables.startDate_lesser as string,
      this.variables.startDate_greater as string,
      this.variables.idMal_not_in,
      this.variables.idMal_in,
      this.variables.idMal_not as number,
      this.variables.id_not_in,
      this.variables.id_in,
      this.variables.id_not as number,
      this.variables.search as string,
      this.variables.isLicensed as boolean,
      this.variables.countryOfOrigin as string,
      this.variables.isAdult as boolean,
      this.variables.format,
      this.variables.type,
      this.variables.status,
      this.variables.season,
      this.variables.id as number,
      this.variables.idMal as number,
    );
  }

  public setSort(sort: MediaSort[] | null): this {
    if (sort !== null) this.variables.sort = sort;
    return this;
  }

  public setPerPage(perPage: number): this {
    if (perPage !== null) this.variables.perPage = perPage;
    return this;
  }

  public setPage(page: number): this {
    if (page !== null) this.variables.page = page;
    return this;
  }

  public setSourceIn(sourceIn: FlexibleField): this {
    if (sourceIn !== null) this.variables.source_in = sourceIn;
    return this;
  }

  public setPopularityLesser(popularityLesser: number): this {
    if (popularityLesser !== null)
      this.variables.popularity_lesser = popularityLesser;
    return this;
  }

  public setPopularityGreater(popularityGreater: number): this {
    if (popularityGreater !== null)
      this.variables.popularity_greater = popularityGreater;
    return this;
  }

  public setPopularityNot(popularityNot: number): this {
    if (popularityNot !== null) this.variables.popularity_not = popularityNot;
    return this;
  }

  public setAverageScoreLesser(averageScoreLesser: number): this {
    if (averageScoreLesser !== null)
      this.variables.averageScore_lesser = averageScoreLesser;
    return this;
  }

  public setAverageScoreGreater(averageScoreGreater: number): this {
    if (averageScoreGreater !== null)
      this.variables.averageScore_greater = averageScoreGreater;
    return this;
  }

  public setAverageScoreNot(averageScoreNot: number): this {
    if (averageScoreNot !== null)
      this.variables.averageScore_not = averageScoreNot;
    return this;
  }

  public setLicensedByIdIn(licensedByIdIn: FlexibleField): this {
    if (licensedByIdIn !== null)
      this.variables.licensedById_in = licensedByIdIn;
    return this;
  }

  public setLicensedByIn(licensedByIn: FlexibleField): this {
    if (licensedByIn !== null) this.variables.licensedBy_in = licensedByIn;
    return this;
  }

  public setTagCategoryNotIn(tagCategoryNotIn: FlexibleField): this {
    if (tagCategoryNotIn !== null)
      this.variables.tagCategory_not_in = tagCategoryNotIn;
    return this;
  }

  public setTagCategoryIn(tagCategoryIn: FlexibleField): this {
    if (tagCategoryIn !== null) this.variables.tagCategory_in = tagCategoryIn;
    return this;
  }

  public setTagNotIn(tagNotIn: FlexibleField): this {
    if (tagNotIn !== null) this.variables.tag_not_in = tagNotIn;
    return this;
  }

  public setTagIn(tagIn: FlexibleField): this {
    if (tagIn !== null) this.variables.tag_in = tagIn;
    return this;
  }

  public setGenreNotIn(genreNotIn: FlexibleField): this {
    if (genreNotIn !== null) this.variables.genre_not_in = genreNotIn;
    return this;
  }

  public setGenreIn(genreIn: FlexibleField): this {
    if (genreIn !== null) this.variables.genre_in = genreIn;
    return this;
  }

  public setDurationLesser(durationLesser: number): this {
    if (durationLesser !== null)
      this.variables.duration_lesser = durationLesser;
    return this;
  }

  public setDurationGreater(durationGreater: number): this {
    if (durationGreater !== null)
      this.variables.duration_greater = durationGreater;
    return this;
  }

  public setEpisodesLesser(episodesLesser: number): this {
    if (episodesLesser !== null)
      this.variables.episodes_lesser = episodesLesser;
    return this;
  }

  public setEpisodesGreater(episodesGreater: number): this {
    if (episodesGreater !== null)
      this.variables.episodes_greater = episodesGreater;
    return this;
  }

  public setStatusNotIn(statusNotIn: FlexibleField): this {
    if (statusNotIn !== null) this.variables.status_not_in = statusNotIn;
    return this;
  }

  public setStatusNot(statusNot: FlexibleField): this {
    if (statusNot !== null) this.variables.status_not = statusNot;
    return this;
  }

  public setStatusIn(statusIn: FlexibleField): this {
    if (statusIn !== null) this.variables.status_in = statusIn;
    return this;
  }

  public setFormatNotIn(formatNotIn: FlexibleField): this {
    if (formatNotIn !== null) this.variables.format_not_in = formatNotIn;
    return this;
  }

  public setFormatNot(formatNot: FlexibleField): this {
    if (formatNot !== null) this.variables.format_not = formatNot;
    return this;
  }

  public setFormatIn(formatIn: FlexibleField): this {
    if (formatIn !== null) this.variables.format_in = formatIn;
    return this;
  }

  public setEndDateLike(endDateLike: string): this {
    if (endDateLike !== null) this.variables.endDate_like = endDateLike;
    return this;
  }

  public setEndDateLesser(endDateLesser: FlexibleField): this {
    if (endDateLesser !== null) this.variables.endDate_lesser = endDateLesser;
    return this;
  }

  public setEndDateGreater(endDateGreater: FlexibleField): this {
    if (endDateGreater !== null)
      this.variables.endDate_greater = endDateGreater;
    return this;
  }

  public setStartDateLike(startDateLike: string): this {
    if (startDateLike !== null) this.variables.startDate_like = startDateLike;
    return this;
  }

  public setStartDateLesser(startDateLesser: FlexibleField): this {
    if (startDateLesser !== null)
      this.variables.startDate_lesser = startDateLesser;
    return this;
  }

  public setStartDateGreater(startDateGreater: FlexibleField): this {
    if (startDateGreater !== null)
      this.variables.startDate_greater = startDateGreater;
    return this;
  }

  public setIdMalNotIn(idMalNotIn: FlexibleField): this {
    if (idMalNotIn !== null) this.variables.idMal_not_in = idMalNotIn;
    return this;
  }

  public setIdMalIn(idMalIn: FlexibleField): this {
    if (idMalIn !== null) this.variables.idMal_in = idMalIn;
    return this;
  }

  public setIdMalNot(idMalNot: number): this {
    if (idMalNot !== null) this.variables.idMal_not = idMalNot;
    return this;
  }

  public setIdNotIn(idNotIn: FlexibleField): this {
    if (idNotIn !== null) this.variables.id_not_in = idNotIn;
    return this;
  }

  public setIdIn(idIn: FlexibleField): this {
    if (idIn !== null) this.variables.id_in = idIn;
    return this;
  }

  public setIdNot(idNot: number): this {
    if (idNot !== null) this.variables.id_not = idNot;
    return this;
  }

  public setSearch(search: string): this {
    if (search !== null) this.variables.search = search;
    return this;
  }

  public setIsLicensed(isLicensed: boolean): this {
    if (isLicensed !== null) this.variables.isLicensed = isLicensed;
    return this;
  }

  public setCountryOfOrigin(countryOfOrigin: string): this {
    if (countryOfOrigin !== null)
      this.variables.countryOfOrigin = countryOfOrigin;
    return this;
  }

  public setIsAdult(isAdult: boolean): this {
    if (isAdult !== null) this.variables.isAdult = isAdult;
    return this;
  }

  public setFormat(format: FlexibleField): this {
    if (format !== null) this.variables.format = format;
    return this;
  }

  public setType(type: FlexibleField): this {
    if (type !== null) this.variables.type = type;
    return this;
  }

  public setStatus(status: FlexibleField): this {
    if (status !== null) this.variables.status = status;
    return this;
  }

  public setSeason(season: FlexibleField): this {
    if (season !== null) this.variables.season = season;
    return this;
  }

  public setId(mediaId: number): this {
    if (mediaId !== null) this.variables.id = mediaId;
    return this;
  }

  public setIdMal(idMal: number): this {
    if (idMal !== null) this.variables.idMal = idMal;
    return this;
  }

  public buildMedia(): { [key: string]: FlexibleField } {
    const mediaVariables = { ...this.variables };
    delete mediaVariables.page;
    delete mediaVariables.perPage;
    return mediaVariables;
  }

  public build(): { [key: string]: FlexibleField } {
    return this.variables;
  }
}
