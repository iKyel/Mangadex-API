import Manga from "./manga";

const MangaClass = new Manga();

async function getCovers(mangas) {
  const mangasWithCovers = await Promise.all(
    mangas.data.map(async (manga) => {
      try {
        const coverID = manga.relationships[2].id;
        const mangaTitle = manga.attributes.title.en;
        const mangaID = manga.id;     
        // Thêm lấy tên tác giả
        const authorID = manga.relationships.find(rel => rel.type === "author").id;
        const authorName = await MangaClass.getAuthor(authorID);
        const coverSource = await MangaClass.getCover(coverID);
        return { mangaTitle, mangaID, authorName, coverSource};
      } catch (err) {
        console.log(`Error: ${err}`);
        return null;
      }
    })
  );

  return mangasWithCovers.filter(Boolean);
}

async function getMangas() {
  const url = new URL('https://api.mangadex.org/manga');
  const params = { limit: 35, 'order[rating]': 'desc' };
  Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));
  const response = await fetch(url);
  const result = await response.json();
  const mangasWithCovers = await getCovers(result);
  return mangasWithCovers;
}

export default { getMangas };