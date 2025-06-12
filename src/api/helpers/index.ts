import { apiKey, apiUrl } from '@/constants/index';

// GETLIST
export const fetchList = async <T>(
  params: string,
  revalidateTime: number | false | undefined
) => {
  const response = await fetch(`${apiUrl}${params}`, {
    headers: {
      apikey: apiKey,
      Authorization: `Bearer ${apiKey}`,
    } as Record<string, string>,
    next: {
      revalidate: revalidateTime,
    },
  }).then((res) => res.json());

  return response as T;
};

export const fetchDetails = async <T>(params: string) => {
  const response = await fetch(`${apiUrl}${params}`, {
    headers: {
      apikey: apiKey,
      Authorization: `Bearer ${apiKey}`,
    } as Record<string, string>,
  }).then((res) => res.json());

  return response[0] as T;
};

// export const fetchFilteredData = async (params) => {
//   const response = await fetch(`${apiUrl}${params}`, {
//     headers: {
//       apikey: apiKey,
//       Authorization: `Bearer ${apiKey}`,
//     },
//   }).then((res) => res.json());

//   return response;
// };

// // POST
// export const sendNewData = async (params, data) => {
//   await fetch(`${apiUrl}${params}`, {
//     method: 'POST',
//     body: JSON.stringify(data),
//     headers: {
//       apikey: apiKey,
//       Authorization: `Bearer ${apiKey}`,
//       'Content-Type': 'application/json',
//     },
//   });
// };

// PATCH
