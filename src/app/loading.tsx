import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
const loading = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
      className="bg-main text-yellow-400"
    >
      <CircularProgress size={50} color="warning" />
    </Box>
  );
};

export default loading;
