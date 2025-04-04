import { PageInfo } from './PageInfo';

export class MediaPage<T> {
  constructor(
    public pageInfo?: PageInfo,
    public media?: T[],
  ) {}
}
