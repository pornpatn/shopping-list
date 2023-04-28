import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { List, ListItem, ListItemButton, ListItemIcon, Checkbox, ListItemText, Toolbar } from '@mui/material';

function ChecklistReviewPage() {
    const navigate = useNavigate();
    const [checklist] = useState({
        id: 1,
        name: 'Checklist 4/26/2023',
        products: [],
        filters: [],
        status: 'in-progress',
    });

    const renderByCategory = () => (
        <List dense disablePadding disableGutters subheader={'Vegetables'}>
            <ListItem disablePadding disableGutters divider>
                <ListItemButton dense>
                    <ListItemIcon>
                        <Checkbox
                            edge="start"
                            tabIndex={-1}
                            disableRipple
                        />
                    </ListItemIcon>
                    <ListItemText primary={
                        <React.Fragment>
                            <Typography
                                sx={{ display: 'inline', width: 40, paddingRight: 1 }}
                                component="span"
                                variant="body1"
                            >
                                {'5'}
                            </Typography>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                            >
                                {'Cucumber'}
                            </Typography>
                        </React.Fragment>
                    } />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding disableGutters divider>
                <ListItemButton dense>
                    <ListItemIcon>
                        <Checkbox
                            edge="start"
                            tabIndex={-1}
                            disableRipple
                        />
                    </ListItemIcon>
                    <ListItemText primary={
                        <React.Fragment>
                            <Typography
                                sx={{ display: 'inline', width: 40, paddingRight: 1 }}
                                component="span"
                                variant="body1"
                            >
                                {'8'}
                            </Typography>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                            >
                                {'Tomato'}
                            </Typography>
                        </React.Fragment>
                    } />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding disableGutters>
                <ListItemButton dense>
                    <ListItemIcon>
                        <Checkbox
                            edge="start"
                            tabIndex={-1}
                            disableRipple
                        />
                    </ListItemIcon>
                    <ListItemText primary={
                        <React.Fragment>
                            <Typography
                                sx={{ display: 'inline', width: 40, paddingRight: 1 }}
                                component="span"
                                variant="body1"
                            >
                                {'20'}
                            </Typography>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                            >
                                {'Zucchini'}
                            </Typography>
                        </React.Fragment>
                    } />
                </ListItemButton>
            </ListItem>
        </List>
    );

    return (
        <Container disableGutters>
            <Box sx={{
                display: 'flex',
                padding: 1,
                position: 'sticky',
                top: 0,
                zIndex: 1100,
                backgroundColor: 'background.paper',
                alignItems: 'center'
            }}>
                <IconButton
                    size="sm"
                    onClick={() => navigate(-1)}
                >
                    <ArrowBackIcon />
                </IconButton>
                <Typography
                    component="h1"
                    variant="h5"
                    color="text.primary"
                    gutterBottom
                >
                    {checklist.name}
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
            </Box>

            <Toolbar disableGutters>
                <Checkbox
                    edge="start"
                    tabIndex={-1}
                    disableRipple
                    checked
                />
                <Typography variant="body2">Select All</Typography>
            </Toolbar>

            {renderByCategory()}
            {renderByCategory()}
            {renderByCategory()}
            {renderByCategory()}

            <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'center', gap: 1 }}>
                <Button
                    variant="contained"
                >
                    Order
                </Button>
                <Button
                    variant="contained"
                    to="/checklist"
                    component={Link}
                >
                    Close
                </Button>
            </Box>

            <Box sx={{ paddingTop: 2 }}>
                <Typography
                    variant="subtitle1"
                    color="text.primary"
                >
                    Orders
                </Typography>
                <List disablePadding>
                <ListItem
                    // key={item.id}
                    // onClick={() => handleItemClick(item.id)}
                    divider
                    dense
                    disableGutters
                    secondaryAction={
                        <IconButton edge="end" size="large" aria-label="continue">
                            <ArrowRightIcon fontSize="inherit" />
                        </IconButton>
                    }
                >
                    <ListItemButton>
                        <ListItemText
                            primary={'Thai Market'}
                            primaryTypographyProps={{ variant: "subtitle2"}}
                            secondary={(
                                <React.Fragment>
                                    <Typography variant="body2" component="div">Apr 22, 2023</Typography>
                                    <Typography variant="body2" component="div">5 Tomato, 2 Chicken, 1 Coconut Large, ...</Typography>
                                </React.Fragment>
                            )}
                        />
                    </ListItemButton>
                </ListItem>
                <ListItem
                    // key={item.id}
                    // onClick={() => handleItemClick(item.id)}
                    divider
                    dense
                    disableGutters
                    secondaryAction={
                        <IconButton edge="end" size="large" aria-label="continue">
                            <ArrowRightIcon fontSize="inherit" />
                        </IconButton>
                    }
                >
                    <ListItemButton>
                        <ListItemText
                            primary={'Wonder Market'}
                            primaryTypographyProps={{ variant: "subtitle2"}}
                            secondary={(
                                <React.Fragment>
                                    <Typography variant="body2" component="div">Apr 22, 2023</Typography>
                                    <Typography variant="body2" component="div">5 Tomato, 2 Chicken, 1 Coconut Large, ...</Typography>
                                </React.Fragment>
                            )}
                        />
                    </ListItemButton>
                </ListItem>
            </List>
            </Box>

        </Container>
    );
}

export default ChecklistReviewPage;
