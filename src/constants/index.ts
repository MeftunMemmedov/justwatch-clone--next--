export const apiUrl = process.env.NEXT_PUBLIC_MOVIE_API_URL;
export const apiKey = process.env.NEXT_PUBLIC_MOVIE_API_KEY;

export const getOptions = {
  headers: {
    apikey: apiKey,
    Authorization: `Bearer ${apiKey}`,
  } as Record<string, string>,
};
