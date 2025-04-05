import { ReleaseFilter } from '@prisma/client';
import Dimens from '../../../../configs/Dimens';
import { MediaSort } from '../types/MediaEnums';

type FlexibleField = string | number | boolean | object | null | undefined;

export default class AnilistQueryBuilder {
  private variables: { [key: string]: FlexibleField } = {};

  constructor() {
    this.variables.page = 1;
    this.variables.perPage = parseInt(Dimens.PER_PAGE, 10); // Assuming Dimens.PER_PAGE is a string
  }

  public convertToReleaseFilter(): ReleaseFilter {
    return {
      sort: this.variables.sort as MediaSort[],
      perPage: this.variables.perPage as number,
      page: this.variables.page as number,
      sourceIn: this.variables.source_in as string[],
      popularityLesser: this.variables.popularity_lesser as number,
      popularityGreater: this.variables.popularity_greater as number,
      popularityNot: this.variables.popularity_not as number,
      averageScoreLesser: this.variables.averageScore_lesser as number,
      averageScoreGreater: this.variables.averageScore_greater as number,
      averageScoreNot: this.variables.averageScore_not as number,
      licensedByIdIn: this.variables.licensedById_in as string[],
      licensedByIn: this.variables.licensedBy_in as string[],
      tagCategoryNotIn: this.variables.tagCategory_not_in as string[],
      tagCategoryIn: this.variables.tagCategory_in as string[],
      tagNotIn: this.variables.tag_not_in as string[],
      tagIn: this.variables.tag_in as string[],
      genreIn: this.variables.genreIn as string[],
      genreNotIn: this.variables.genreNotIn as string[],
      durationLesser: this.variables.durationLesser as number,
      durationGreater: this.variables.durationGreater as number,
      episodesLesser: this.variables.episodesLesser as number,
      episodesGreater: this.variables.episodesGreater as number,
      statusNotIn: this.variables.statusNotIn as string[],
      statusNot: this.variables.statusNot as string,
      statusIn: this.variables.statusIn as string[],
      formatNotIn: this.variables.formatNotIn as string[],
      formatNot: this.variables.formatNot as string,
      formatIn: this.variables.formatIn as string[],
      endDateLike: this.variables.endDateLike as string,
      endDateLesser: this.variables.endDateLesser as string,
      endDateGreater: this.variables.endDateGreater as string,
      startDateLike: this.variables.startDateLike as string,
      startDateLesser: this.variables.startDateLesser as string,
      startDateGreater: this.variables.startDateGreater as string,
      idMalNotIn: this.variables.idMalNotIn as number[],
      idMalIn: this.variables.idMalIn as number[],
      idMalNot: this.variables.idMalNot as number,
      idNotIn: this.variables.idNotIn as number[],
      idIn: this.variables.idIn as number[],
      idNot: this.variables.idNot as number,
      search: this.variables.search as string,
      isLicensed: this.variables.isLicensed as boolean,
      countryOfOrigin: this.variables.countryOfOrigin as string,
      isAdult: this.variables.isAdult as boolean,
      format: this.variables.format as string | null,
      type: this.variables.type as string | null,
      status: this.variables.status as string | null,
      season: this.variables.season as string | null,
      id: this.variables.id as number,
      idMal: this.variables.idMal as number,
    };
  }

  public getByQuery(query: any): this {
    // Pagination
    if (query.page) this.setPage(+query.page);
    if (query.perPage) this.setPerPage(+query.perPage);

    // Basic filters
    if (query.search) this.setSearch(query.search);
    if (query.type) this.setType(query.type);
    if (query.status) this.setStatus(query.status);
    if (query.format) this.setFormat(query.format);
    if (query.season) this.setSeason(query.season);
    if (query.isAdult !== undefined) this.setIsAdult(query.isAdult === 'true');
    if (query.isLicensed !== undefined) this.setIsLicensed(query.isLicensed === 'true');
    if (query.countryOfOrigin) this.setCountryOfOrigin(query.countryOfOrigin);

    // ID filters
    if (query.id) this.setId(+query.id);
    if (query.idMal) this.setIdMal(+query.idMal);
    if (query.idNot) this.setIdNot(+query.idNot);
    if (query.idIn) this.setIdIn(query.idIn.split(',').map(Number));
    if (query.idNotIn) this.setIdNotIn(query.idNotIn.split(',').map(Number));
    if (query.idMalNot) this.setIdMalNot(+query.idMalNot);
    if (query.idMalIn) this.setIdMalIn(query.idMalIn.split(',').map(Number));
    if (query.idMalNotIn) this.setIdMalNotIn(query.idMalNotIn.split(',').map(Number));

    // Date filters
    if (query.startDateGreater) this.setStartDateGreater(query.startDateGreater);
    if (query.startDateLesser) this.setStartDateLesser(query.startDateLesser);
    if (query.startDateLike) this.setStartDateLike(query.startDateLike);
    if (query.endDateGreater) this.setEndDateGreater(query.endDateGreater);
    if (query.endDateLesser) this.setEndDateLesser(query.endDateLesser);
    if (query.endDateLike) this.setEndDateLike(query.endDateLike);

    // Format filters
    if (query.formatIn) this.setFormatIn(query.formatIn.split(','));
    if (query.formatNotIn) this.setFormatNotIn(query.formatNotIn.split(','));
    if (query.formatNot) this.setFormatNot(query.formatNot);

    // Status filters
    if (query.statusIn) this.setStatusIn(query.statusIn.split(','));
    if (query.statusNotIn) this.setStatusNotIn(query.statusNotIn.split(','));
    if (query.statusNot) this.setStatusNot(query.statusNot);

    // Episode and duration filters
    if (query.episodesGreater) this.setEpisodesGreater(+query.episodesGreater);
    if (query.episodesLesser) this.setEpisodesLesser(+query.episodesLesser);
    if (query.durationGreater) this.setDurationGreater(+query.durationGreater);
    if (query.durationLesser) this.setDurationLesser(+query.durationLesser);

    // Genre and tag filters
    if (query.genreIn) this.setGenreIn(query.genreIn.split(','));
    if (query.genreNotIn) this.setGenreNotIn(query.genreNotIn.split(','));
    if (query.tagIn) this.setTagIn(query.tagIn.split(','));
    if (query.tagNotIn) this.setTagNotIn(query.tagNotIn.split(','));
    if (query.tagCategoryIn) this.setTagCategoryIn(query.tagCategoryIn.split(','));
    if (query.tagCategoryNotIn) this.setTagCategoryNotIn(query.tagCategoryNotIn.split(','));

    // License filters
    if (query.licensedByIn) this.setLicensedByIn(query.licensedByIn.split(','));
    if (query.licensedByIdIn) this.setLicensedByIdIn(query.licensedByIdIn.split(','));

    // Score and popularity filters
    if (query.averageScoreGreater) this.setAverageScoreGreater(+query.averageScoreGreater);
    if (query.averageScoreLesser) this.setAverageScoreLesser(+query.averageScoreLesser);
    if (query.averageScoreNot) this.setAverageScoreNot(+query.averageScoreNot);
    if (query.popularityGreater) this.setPopularityGreater(+query.popularityGreater);
    if (query.popularityLesser) this.setPopularityLesser(+query.popularityLesser);
    if (query.popularityNot) this.setPopularityNot(+query.popularityNot);

    // Source filters
    if (query.sourceIn) this.setSourceIn(query.sourceIn.split(','));

    // Sort
    if (query.sort) {
      const sortArray = query.sort.split(',') as MediaSort[];
      this.setSort(sortArray);
    }
    
    return this;
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
