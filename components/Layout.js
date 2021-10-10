import dynamic from 'next/dynamic';
import Head from 'next/head';
import Navbar from './Navbar';
import Paper from '@mui/material/Paper';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useContext } from 'react';
import { Store } from '../utils/Store';

function Layout({ title, children }) {
    const themeBundle = {
        light: {
            primaryColor: 'hsl(200, 20%, 80%)',
            bgColor: 'hsl(200, 20%, 95%)',
            textColor: '#000000',
        },
        dark: {
            primaryColor: 'hsl(200, 20%, 20%)',
            bgColor: 'hsl(200, 20%, 10%)',
            textColor: '#ffffff',
        }
    };
    const { state } = useContext(Store);
    const selectedTheme = state.darkMode ? themeBundle.dark : themeBundle.light;
    const theme = createTheme({
        breakpoints: {
            values: {
                xs: 0,
                sm: 480,
                md: 800,
                lg: 1200,
                xl: 1600
            }
        },
        typography: {
            fontFamily: [
                'Catamaran',
                'sans-serif',
            ].join(','),
        },
        components: {
            MuiAppBar: {
                styleOverrides: {
                    root: {
                        backgroundColor: selectedTheme.primaryColor,
                        color: selectedTheme.textColor,
                    },
                },
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        backgroundColor: selectedTheme.bgColor,
                        color: selectedTheme.textColor,
                    },
                },
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        backgroundColor: selectedTheme.primaryColor,
                        color: selectedTheme.textColor,
                    },
                },
            },
            MuiDivider: {
                styleOverrides: {
                    root: {
                        borderColor: selectedTheme.textColor,
                        opacity: 0.5,
                    },
                },
            },
        },
    });

    return (
        <>
            <Head>
                <title>{title ? `${title} - The Shopping Booth` : 'The Shopping Booth'}</title>
            </Head>
            <ThemeProvider theme={theme}>
                <Paper elevation={0} sx={{ minHeight: '100vh' }}>
                    <Navbar />
                    {children}
                </Paper>
            </ThemeProvider>
        </>
    )
}

export default dynamic(() => Promise.resolve(Layout), { ssr: false });