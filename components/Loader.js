import React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

function Loader() {
    return (
        <Box sx={{
            position: 'fixed',
            inset: 1,
            backgroundColor: 'hsl(0, 0%, 0%, 0.5)',
            zIndex: 1,
        }}>
            <LinearProgress />
        </Box>
    )
}

export default Loader;