import { CircularProgress } from '@mui/material';

const Loading = () => {
  return (
    <div className="flex justify-center items-center py-5 min-h-screen bg-main">
      <CircularProgress color="warning" />
    </div>
  );
};

export default Loading;
