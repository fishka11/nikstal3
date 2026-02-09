async function fetchAPI(query, cache, revalidate, { variables } = {}) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.HYGRAPH_PROD_AUTH_TOKEN}`,
  };
  const res = await fetch(process.env.HYGRAPH_RO_PROJECT_API, {
    method: 'POST',
    headers,
    cache: cache && cache,
    next: { revalidate: revalidate && revalidate },
    body: JSON.stringify({
      query,
      variables,
    }),
  });
  const json = await res.json();

  if (json.errors) {
    console.error(json.errors);
    throw new Error(`Failed to fetch API`);
  }

  return json.data;
}

export default async function getData(query, cache, revalidate) {
  const data = await fetchAPI(query, cache, revalidate);
  return { ...data };
}
