export function encodeQuery(data: { [key: string]: string }): string {
    let query = "";
    for (const d in data) {
      query += encodeURIComponent(d) + "=" + encodeURIComponent(data[d]) + "&";
    }
    return query.slice(0, -1);
  }
  
  export function filterTitle(title: string): string {
    let newTitle = "";
    let counter = 0;
    for (let i = 0; i < title.length; i++) {
      newTitle += title[i];
      if (counter === 17) {
        newTitle += "...";
        break;
      }
      counter++;
    }
    return newTitle;
  }
  
  export function getQueryParams(): { [key: string]: string } {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop as string),
    });
  
    return params as { [key: string]: string };
  }
  
  export function filterGenres(data: any): string {
    const tags = data.data.attributes.tags;
    let genres = "";
    for (let i = 0; i < tags.length; i++) {
      if (tags[i].attributes.group === "genre") {
        genres += tags[i].attributes.name.en + " ";
      }
    }
    return genres;
  }