import Anilist from './Anilist';
import AnilistQueryBuilder from './query/AnilistQueryBuilder';

describe('Anilist', () => {
  it('getQueryBasic', () => {
    const builder = new AnilistQueryBuilder();
    builder.setSearch('Naruto');
    const query: string = Anilist.getQueryBasic(builder);
    console.log(query);
    expect(query).toContain('Naruto');
  });
});
