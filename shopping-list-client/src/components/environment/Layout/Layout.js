import React from 'react';
import { Outlet, Link as RouterLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import styles from './styles.layout.css';

const theme = createTheme();

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            {'Nikamanon'}
            {' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

function Layout() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box className={styles.root}>
                <AppBar position="relative" className={styles.header}>
                    <Toolbar>
                        <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                            Shopping List
                        </Typography>
                        <nav>
                            <Link
                                variant="button"
                                color="inherit"
                                to="/"
                                sx={{ my: 1, mx: 1.5 }}
                                component={RouterLink}
                            >
                                Home
                            </Link>
                            <Link
                                variant="button"
                                color="inherit"
                                to="/checklist"
                                sx={{ my: 1, mx: 1.5 }}
                                component={RouterLink}
                            >
                                Checklist
                            </Link>
                            <Link
                                variant="button"
                                color="inherit"
                                to="/settings"
                                sx={{ my: 1, mx: 1.5 }}
                                component={RouterLink}
                            >
                                Order
                            </Link>
                            <Link
                                variant="button"
                                color="inherit"
                                to="/settings"
                                sx={{ my: 1, mx: 1.5 }}
                                component={RouterLink}
                            >
                                Settings
                            </Link>
                        </nav>
                    </Toolbar>
                </AppBar>
                <main>
                    <Box className={styles.main} sx={{ py: 2 }}>
                        <Outlet />
                    </Box>
                </main>
                <Box className={styles.footer} component="footer">
                    <Copyright />
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default Layout;
