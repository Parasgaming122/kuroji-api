export class Video {
  public videoId?: string;
  public videoImageUrl?: string;
  public kind?: string;
  public videoName?: string;
  public playerUrl?: string;
  public videoUrl?: string;

  constructor(data: Partial<Video>) {
    Object.assign(this, data);
  }
}
