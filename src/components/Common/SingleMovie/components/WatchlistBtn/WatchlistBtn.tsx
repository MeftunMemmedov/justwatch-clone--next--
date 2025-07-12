// 'use client';
// import { GlobalContext } from '@/context/GlobalContext';
// import { use } from 'react';
// import { IoBookmarkSharp } from 'react-icons/io5';
// const WatchlistBtn = () => {
//     const
//   const { user } = use(GlobalContext) as any;
//   return (
//     <div className="absolute top-0 left-0 z-20 w-full rounded-br-lg shadow-[inset_0_15px_10px_-10px_rgba(0,0,0,0.75)]">
//       {user ? (
//         <IoBookmarkSharp
//           // onClick={handleWatchlistAction}
//           size={35}
//           className={`text-shadow-2xl mt-[-3px] transition-all duration-300 text-shadow-black ${
//             isInWatchlist
//               ? 'text-yellow-500'
//               : 'text-white opacity-75 hover:opacity-100'
//           }`}
//         />
//       ) : (
//         <>
//           {' '}
//           <AskAuth type={'watchlist-singlemovie'} />{' '}
//         </>
//       )}
//     </div>
//   );
// };

// export default WatchlistBtn;
