import { Injectable } from '@nestjs/common';

@Injectable()
export class ScrapeHelper {
  private static readonly SPECIAL_CHARS_REGEX = /[^a-zA-Z0-9\s]/g;

  /**
   * Compares titles using two search strings.
   */
  public static compareTitles(
    romaji: string,
    english: string,
    nativeTitle: string,
    synonyms: string[],
    searchTitle: string,
    searchJapaneseTitle: string = ""
  ): boolean {
    const normalizedSearchTitle = this.normalizeTitle(searchTitle);
    const normalizedSearchJapaneseTitle = this.normalizeTitle(searchJapaneseTitle);

    return (
      this.matchesAny(romaji, english, nativeTitle, normalizedSearchTitle) ||
      this.matchesAny(romaji, english, nativeTitle, normalizedSearchJapaneseTitle) ||
      synonyms.some(
        (s) =>
          this.compareTitlesIgnoreCase(s, normalizedSearchTitle) ||
          this.compareTitlesIgnoreCase(s, normalizedSearchJapaneseTitle)
      )
    );
  }

  /**
   * Overload that compares titles using one search string.
   */
  public static compareTitlesSimple(
    romaji: string,
    english: string,
    nativeTitle: string,
    synonyms: string[],
    searchTitle: string
  ): boolean {
    return this.compareTitles(romaji, english, nativeTitle, synonyms, searchTitle, "");
  }

  /**
   * Compares two titles (after normalization) and checks if one contains the other.
   */
  public static compareTitlesIgnoreCase(title1: string, title2: string): boolean {
    const norm1 = this.normalizeTitle(title1);
    const norm2 = this.normalizeTitle(title2);
    if (!norm1 || !norm2) return false;
    return norm1.includes(norm2) || norm2.includes(norm1);
  }

  /**
   * Checks if any of the provided titles (except the last one) match the target title.
   */
  private static matchesAny(...titles: string[]): boolean {
    if (!titles || titles.length < 2) return false;
    const target = this.normalizeTitle(titles[titles.length - 1]);
    for (let i = 0; i < titles.length - 1; i++) {
      const current = this.normalizeTitle(titles[i]);
      if (this.compareTitlesIgnoreCase(current, target)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Normalizes the title by lowercasing, removing special characters,
   * and stripping out season/part/ova/movie indicators.
   */
  public static normalizeTitle(title: string): string {
    if (!title) return "";
    title = title.toLowerCase().trim();
    title = title.replace(this.SPECIAL_CHARS_REGEX, "");

    // Remove patterns: "2nd season", "season 2", "part 1", "ova", "movie"
    title = title
      .replace(/\b(\d+(st|nd|rd|th)\s*season)\b/g, "") // e.g., "2nd season"
      .replace(/\bseason\s*\d+\b/g, "")                // e.g., "season 2"
      .replace(/\bpart\s*\d+\b/g, "")                  // e.g., "part 1"
      .replace(/\bova\b/g, "")                         // e.g., "ova"
      .replace(/\bmovie\b/g, "");                      // e.g., "movie"

    // Replace multiple spaces with single space
    title = title.replace(/\s+/g, " ").trim();
    return title;
  }
}