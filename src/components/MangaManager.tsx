import Manga from "./manga";

const MangaClass = new Manga();

// async function getRating(mangaID) {
//   const url = new URL(`https://api.mangadex.org/rating?manga=${mangaID}`);
//   const response = await fetch(url, {
//     headers: {
//       Authorization: "Bearer personal-client-3bf8acb2-3a8b-4606-8e57-6aa12eb6aa75-7c2951c9", // Replace <YOUR_ACCESS_TOKEN> with your actual token
//     },
//   });
//   const result = await response.json();
//   // Assuming the API returns an array of ratings, you may need to process the response accordingly
//   // For example, if you want to get the average rating, you can calculate it from the ratings array
//   const ratings = result.data.map((rating) => rating.attributes.rating);
//   const averageRating =
//     ratings.reduce((acc, curr) => acc + curr, 0) / ratings.length;
//   return averageRating;
// }

async function getCovers(mangas) {
  const mangasWithCovers = await Promise.all(
    mangas.data.map(async (manga) => {
      try {
        const coverID = manga.relationships[2].id;
        const mangaTitle = manga.attributes.title.en;
        const mangaID = manga.id;
        const authorID = manga.relationships.find(
          (rel) => rel.type === "author"
        ).id;
        const authorName = await MangaClass.getAuthor(authorID);
        const coverSource = await MangaClass.getCover(coverID);
        // const rating = await getRating(mangaID); // Retrieve rating for manga
        return { mangaTitle, mangaID, authorName, coverSource };
      } catch (err) {
        console.log(`Error: ${err}`);
        return null;
      }
    })
  );

  return mangasWithCovers.filter(Boolean);
}

// async function getMangas() {
//   const url = new URL("https://api.mangadex.org/manga");
//   const params = { limit: 10, "order[rating]": "desc" };
//   Object.keys(params).forEach((key) =>
//     url.searchParams.append(key, params[key])
//   );
//   const response = await fetch(url);
//   const result = await response.json();
//   const mangasWithCovers = await getCovers(result);
//   return mangasWithCovers;
// }

async function getMangas() {
  const url = 'http://localhost:3000/api/manga';
  const response = await fetch(url);
  const result = await response.json();
  const mangasWithCovers = await getCovers(result);
  return mangasWithCovers;
}

export default { getMangas };
