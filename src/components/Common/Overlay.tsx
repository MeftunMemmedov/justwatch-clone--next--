'use client';
import { useEffect } from 'react';

interface Props {
  close: () => void;
}

const Overlay = ({ close }: Props) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'visible';
    };
  }, []);
  return (
    <div
      className="fixed top-0 left-0 z-30 h-full w-full bg-black opacity-50"
      onClick={close}
    ></div>
  );
};

export default Overlay;
