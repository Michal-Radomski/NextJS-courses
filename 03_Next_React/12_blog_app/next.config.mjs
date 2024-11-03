/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;

//* .env file or this below:
// // Importing PHASE_DEVELOPMENT_SERVER from next/constants
// import { PHASE_DEVELOPMENT_SERVER } from 'next/constants';

// // Exporting the configuration as a default export
// export default (phase) => {
//   if (phase === PHASE_DEVELOPMENT_SERVER) {
//     return {
//       env: {
//         mongodb_username: '',
//         mongodb_password: '',
//         mongodb_clustername: '',
//         mongodb_database: '',
//       },
//     };
//   }

//   return {
//     env: {
//       mongodb_username: '',
//       mongodb_password: '',
//       mongodb_clustername: '',
//       mongodb_database: '',
//     },
//   };
// };
