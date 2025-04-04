type FlexibleField = string | number | boolean | object | null | undefined;

export class AiringSchedulesQueryBuilder {
  private variables: { [key: string]: FlexibleField } = {};

  constructor() {
    this.variables.page = null;
    this.variables.perPage = null;
  }

  public setSort(sort: FlexibleField): this {
    if (sort !== null) this.variables.sort = sort;
    return this;
  }

  public setPerPage(perPage: number | null): this {
    if (perPage !== null) this.variables.perPage = perPage;
    return this;
  }

  public setPage(page: number | null): this {
    if (page !== null) this.variables.page = page;
    return this;
  }

  public setAiringAtGreater(airingAtGreater: number | null): this {
    if (airingAtGreater !== null)
      this.variables.airingAt_greater = airingAtGreater;
    return this;
  }

  public setAiringAtLesser(airingAtLesser: number | null): this {
    if (airingAtLesser !== null)
      this.variables.airingAt_lesser = airingAtLesser;
    return this;
  }

  public setEpisodeLesser(episodeLesser: number | null): this {
    if (episodeLesser !== null) this.variables.episode_lesser = episodeLesser;
    return this;
  }

  public setEpisodeGreater(episodeGreater: number | null): this {
    if (episodeGreater !== null)
      this.variables.episode_greater = episodeGreater;
    return this;
  }

  public setEpisodeNotIn(episodeNotIn: FlexibleField): this {
    if (episodeNotIn !== null) this.variables.episode_not_in = episodeNotIn;
    return this;
  }

  public setEpisodeIn(episodeIn: FlexibleField): this {
    if (episodeIn !== null) this.variables.episode_in = episodeIn;
    return this;
  }

  public setEpisodeNot(episodeNot: number | null): this {
    if (episodeNot !== null) this.variables.episode_not = episodeNot;
    return this;
  }

  public setMediaIdNotIn(mediaIdNotIn: FlexibleField): this {
    if (mediaIdNotIn !== null) this.variables.mediaId_not_in = mediaIdNotIn;
    return this;
  }

  public setMediaIdIn(mediaIdIn: FlexibleField): this {
    if (mediaIdIn !== null) this.variables.mediaId_in = mediaIdIn;
    return this;
  }

  public setMediaIdNot(mediaIdNot: number | null): this {
    if (mediaIdNot !== null) this.variables.mediaId_not = mediaIdNot;
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

  public setIdNot(idNot: number | null): this {
    if (idNot !== null) this.variables.id_not = idNot;
    return this;
  }

  public setNotYetAired(notYetAired: boolean | null): this {
    if (notYetAired !== null) this.variables.notYetAired = notYetAired;
    return this;
  }

  public setAiringAt(airingAt: number | null): this {
    if (airingAt !== null) this.variables.airingAt = airingAt;
    return this;
  }

  public setEpisode(episode: number | null): this {
    if (episode !== null) this.variables.episode = episode;
    return this;
  }

  public setMediaId(mediaId: number | null): this {
    if (mediaId !== null) this.variables.mediaId = mediaId;
    return this;
  }

  public setAiringSchedulesId(airingSchedulesId: number | null): this {
    if (airingSchedulesId !== null)
      this.variables.airingSchedulesId = airingSchedulesId;
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
