'use client';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import {
  forwardRef,
  MouseEvent,
  ReactElement,
  Ref,
  use,
  useEffect,
  useState,
} from 'react';
import { BiSolidDislike, BiSolidLike } from 'react-icons/bi';
import { FaBookmark } from 'react-icons/fa';
import { IoIosClose } from 'react-icons/io';
import { IoBookmark, IoBookmarkSharp } from 'react-icons/io5';
import { TransitionProps } from '@mui/material/transitions';
import { Movie } from '@/types';
import { GlobalContext } from '@/context/GlobalContext';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
  movie?: Movie;
  type: string;
}

export default function AskAuth({ movie, type }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { setUserDialogOpen } = use(GlobalContext) as any;

  const [open, setOpen] = useState(false);
  const [letFullScreen, setLetFullScreen] = useState(false);

  const handleClickOpen = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    setOpen(true);
  };

  const handleClose = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    setOpen(false);
  };
  useEffect(() => {
    window.addEventListener('resize', () => {
      if (window.innerWidth < 768) {
        setLetFullScreen(true);
      } else {
        setLetFullScreen(false);
      }
    });
  }, []);
  return (
    <>
      <button
        className={`flex items-center justify-center rounded-lg ${type === 'watchlist-singlemovie' ? 'bg-transparent' : 'bg-[#222c38] py-3'} ${type === 'watchlist' ? 'col-span-2' : ''}`}
        onClick={handleClickOpen}
      >
        {type === 'like' && (
          <div className="flex items-center gap-2">
            <BiSolidLike size={20} />
            <span>{movie?.likes?.length}</span>
          </div>
        )}
        {type === 'dislike' && (
          <div className="flex items-center gap-2">
            <BiSolidDislike size={20} />
            <span>{movie?.dislikes?.length}</span>
          </div>
        )}
        {type === 'watchlist' && (
          <div className="flex items-center gap-1">
            <IoBookmark size={20} />
            <p>Watchlist</p>
          </div>
        )}
        {type === 'watchlist-singlemovie' && (
          <IoBookmarkSharp
            size={35}
            className={`text-shadow-2xl z-80 mt-[-3px] text-white opacity-75 transition-all duration-300 text-shadow-black hover:opacity-100`}
          />
        )}
      </button>
      <Dialog
        open={open}
        slots={{
          transition: Transition,
        }}
        keepMounted
        fullWidth
        fullScreen={letFullScreen}
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <div className="bg-custom-dark1 flex h-full w-full flex-col items-center p-5 py-10 text-center text-gray-200 md:h-auto">
          <div className="flex w-full justify-end">
            <button onClick={handleClose}>
              <IoIosClose />
            </button>
          </div>
          <div className="flex flex-col gap-10">
            {(type === 'watchlist' || type === 'watchlist-singlemovie') && (
              <>
                <div className="flex justify-center">
                  <div className="bg-custom-slate2 flex h-15 w-15 items-center justify-center rounded-full">
                    <FaBookmark size={30} />
                  </div>
                </div>
                <div>
                  <h4 className="mb-5 text-xl font-semibold">
                    You need an account to use lists!
                  </h4>
                  <p className="text-sm">
                    Add titles to your Watchlist, track your favourite TV Shows
                    and get notified when new episodes drop. Plus you get the
                    added benefit of having access to all your favourite titles
                    on any device you use: mobile, web or TV.
                  </p>
                </div>
              </>
            )}
            {(type === 'like' || type === 'dislike') && (
              <>
                <div className="flex justify-center">
                  <div className="bg-custom-slate2 flex h-20 w-20 items-center justify-center rounded-full">
                    <BiSolidLike size={30} />
                    <BiSolidDislike size={30} />
                  </div>
                </div>
                <div>
                  <h4 className="mb-5 text-xl font-semibold">
                    You need an account to use like or dislike!
                  </h4>
                  <p className="text-sm">
                    Log in to like or dislike titles and help us recommend
                    content you&apos;ll enjoy. Without an account, your
                    preferences can&apos;t be saved.
                  </p>
                </div>
              </>
            )}
            <button
              className="m-auto rounded-md bg-yellow-400 px-10 py-2 text-black"
              onClick={() => {
                setOpen(false);
                setUserDialogOpen(true);
              }}
            >
              Sign In
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
