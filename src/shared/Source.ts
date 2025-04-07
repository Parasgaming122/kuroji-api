export interface Source {
  headers: Source.Headers;
  intro: IntroOutro;
  outro: IntroOutro;
  sources: Source.SourceInfo[];
  subtitles: Source.SubtitleInfo[];
  // download: string;
}

export interface IntroOutro {
  start: number;
  end: number;
}

export namespace Source {
  export interface Headers {
    referer: string;
  }

  export interface SourceInfo {
    url: string;
    isM3U8: boolean;
    type: string;
    quality: string;
    isDub: boolean;
  }

  export interface SubtitleInfo {
    url: string;
    lang: string;
  }
}