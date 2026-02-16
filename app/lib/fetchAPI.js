// lib/fetchAPI.js
import Bottleneck from "bottleneck";

// Dokładnie 3 requesty na sekundę
const limiter = new Bottleneck({
  reservoir: 3, // Początkowy bucket: 3 requesty
  reservoirRefreshAmount: 3, // Co sekundę dodaj 3 requesty
  reservoirRefreshInterval: 1000, // Co 1000ms
  maxConcurrent: 1, // Tylko 1 request naraz dla prostoty
  minTime: 333, // Minimum 333ms między requestami
});

export default async function getData(query, options = {}) {
  const {
    cache = "force-cache", // Domyślnie cache
    revalidate,
    variables,
  } = options;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.HYGRAPH_PROD_AUTH_TOKEN}`,
  };
  return limiter.schedule(async () => {
    try {
      const response = await fetch(process.env.HYGRAPH_RO_PROJECT_API, {
        method: "POST",
        headers,
        cache,
        ...(revalidate !== undefined && { next: { revalidate } }),
        body: JSON.stringify({
          query,
          ...(variables && { variables }),
        }),
      });

      // Sprawdza czy response jest OK
      if (!response.ok) {
        throw new Error(
          `HTTP error! Status: ${response.status} - ${response.statusText}`,
        );
      }

      const json = await response.json();

      // Sprawdza GraphQL errors
      if (json.errors) {
        console.error("GraphQL Errors:", json.errors);
        throw new Error(
          `GraphQL error: ${json.errors.map((e) => e.message).join(", ")}`,
        );
      }

      return json.data;
    } catch (error) {
      console.error("Error fetching from Hygraph:", error);
      throw error;
    }
  });
}

// async function fetchAPI(query, cache, revalidate, { variables } = {}) {
//   const headers = {
//     'Content-Type': 'application/json',
//     Authorization: `Bearer ${process.env.HYGRAPH_PROD_AUTH_TOKEN}`,
//   };
//   const res = await fetch(process.env.HYGRAPH_RO_PROJECT_API, {
//     method: 'POST',
//     headers,
//     cache: cache && cache,
//     next: { revalidate: revalidate && revalidate },
//     body: JSON.stringify({
//       query,
//       variables,
//     }),
//   });
//   const json = await res.json();

//   if (json.errors) {
//     console.error(json.errors);
//     throw new Error(`Failed to fetch API`);
//   }

//   return json.data;
// }

// export default async function getData(query, cache, revalidate) {
//   const data = await fetchAPI(query, cache, revalidate);
//   return { ...data };
// }
