import dynamic from 'next/dynamic';
import { useContext } from 'react';
import { Store } from '../utils/Store';
import { ThemeProvider, createTheme } from '@mui/material/styles';


function MuiTheme({ children }) {
    const { state: { darkMode } } = useContext(Store);
    const darkTheme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
            primary: {
                main: '#2196f3',
            },
        }
    });

    return (
        <ThemeProvider theme={darkTheme}>
            {children}
        </ThemeProvider>
    );
}

export default dynamic(() => Promise.resolve(MuiTheme), { ssr: false });