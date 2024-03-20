import { filterGenres } from "./helper";

export default class Manga {
  private alreadyGotCover: boolean = false;
  private alreadyGotChapters: boolean = false;
  private alreadyGotGenre: boolean = false;
  private coverSource: string = "";
  private chaptersText: string[] = [];
  private chaptersID: string[] = [];
  private genres: string = "";

  public async getCover(coverID: string): Promise<string> {
    if (this.alreadyGotCover) return this.coverSource;
    const url = `https://api.mangadex.org/cover/${coverID}`;

    const response = await fetch(url);
    const result = await response.json();

    const mangaID = result.data.relationships[0].id;
    const fileName = result.data.attributes.fileName;
    this.coverSource = `https://uploads.mangadex.org/covers/${mangaID}/${fileName}`;
    return this.coverSource;
  }
  
  public async getAuthor(authorID: string): Promise<string> {
    const url = `https://api.mangadex.org/author/${authorID}`;
    const response = await fetch(url);
    const result = await response.json();

    // Trích xuất tên của tác giả từ kết quả JSON
    const authorName = result.data.attributes.name;

    return authorName;
  }

  public async getGenreSynopsis(mangaID: string): Promise<[string, string]> {
    if (this.alreadyGotGenre) return [this.genres, ""];
    const url = `https://api.mangadex.org/manga/${mangaID}`;
    const response = await fetch(url);
    const result = await response.json();
    this.genres = filterGenres(result);
    return [this.genres, result.data.attributes.description.en];
  }

  public async getChapter(mangaID: string): Promise<[string[], string[]]> {
    if (this.alreadyGotChapters) return [this.chaptersText, this.chaptersID];
    const url = new URL(`https://api.mangadex.org/manga/${mangaID}/aggregate`);
    const params = { "translatedLanguage[]": ["en"] };
    Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));
    const response = await fetch(url);
    const result = await response.json();
    for (const volumeKey in result.volumes) {
      const volume = result.volumes[volumeKey];
      for (const chapterKey in volume.chapters) {
        const chapter = volume.chapters[chapterKey];
        this.chaptersText.push(`Chapter ${chapter.chapter}`);
        this.chaptersID.push(`${chapter.id}`);
      }
    }
    return [this.chaptersText, this.chaptersID];
  }
}