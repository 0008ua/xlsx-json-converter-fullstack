// import { useState, useCallback } from "react";
// import { errorNormilizer } from '../modules/error.module';

// export const useHttp = () => {
//   const [loading, setLoading] = useState(false);

//   const request = useCallback(async (url, method = 'get', body = null, headers) => {
//     setLoading(true);
//     try {
//       // if (body) {
//       //   body = JSON.stringify(body);
//         // headers['Content-Type'] = 'application/json';
//       // }
//       const response = await fetch(url, { method, body, headers });
//       const data = await response.json();

//       if (!response.ok) {
//         // response.status not 2xx
//         throw errorNormilizer(data);
//       }
//       setLoading(false);
//       return data;
//     } catch (error) {
//       setLoading(false);
//       throw error;
//     }
//   }, [ ]);

//   return { loading, request };
// }