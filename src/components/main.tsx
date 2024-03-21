import { useEffect, useState } from 'react';
import MangaManager from './MangaManager';

function Main() {
  const [mangas, setMangas] = useState([]);

  useEffect(() => {
    const fetchMangas = async () => {
      const mangasData = await MangaManager.getMangas();
      setMangas(mangasData);
    };
    fetchMangas();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Manga Information</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {mangas.map((manga, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">{manga.mangaTitle}</h2> 
            <h3 className="text-sm font-semibold mb-2">Author: {manga.authorName}</h3> 
            <p className="text-sm mb-4">Rating: {manga.rating}</p>
            <div className="w-full h-64 overflow-hidden rounded-lg shadow-md">
              <img src={manga.coverSource} alt={manga.mangaTitle} className="w-full h-full object-cover" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Main;
