'use client';
import Dialog from '@mui/material/Dialog';
import { useState } from 'react';

import { FaCirclePlay } from 'react-icons/fa6';
import ReactPlayer from 'react-player';

interface Props {
  trailerUrl: string;
}

export default function TrailerPlayer({ trailerUrl }: Props) {
  const [open, setOpen] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="h-full">
        <FaCirclePlay
          onClick={handleClickOpen}
          size={63}
          color="#fbc500"
          className="mt-6 cursor-pointer transition-all duration-500 hover:scale-120 min-[500px]:mt-14"
        />
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="xl"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="bg-main h-[300px] w-full p-2 md:h-[690px] md:p-10">
          <ReactPlayer
            width={'100%'}
            height={'100%'}
            url={trailerUrl}
            controls
          />
        </div>
      </Dialog>
    </>
  );
}
