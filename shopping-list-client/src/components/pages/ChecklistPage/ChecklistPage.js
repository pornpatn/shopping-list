import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@mui/material/CardActionArea';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Dialog, DialogContent, DialogActions, DialogTitle, TextField } from '@mui/material';

function ChecklistPage() {
    const [newChecklistDialogOpen, setNewChecklistDialogOpen] = useState(false);
    const [name, setName] = useState('');

    const handleNewChecklistClick = () => {
        const date = new Date();
        setName(`Checklist ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`);
        setNewChecklistDialogOpen(true);
    };

    const handleNewChecklistDialogClose = () => {
        setNewChecklistDialogOpen(false);
    };

    const handleNewChecklistCreate = () => {
        setNewChecklistDialogOpen(false);
    };

    return (
        <Container maxWidth="lg">
            <Typography
                component="h1"
                variant="h5"
                color="text.primary"
                gutterBottom
            >
                Checklist
            </Typography>
            {/* New Checklist or Current Checklist */}
            <Box sx={{ paddingBottom: 2 }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6} md={8}>
                        <Card
                            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                        >
                            <CardActionArea to={'1'} component={Link}>
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Continue Checklist
                                    </Typography>
                                    <Typography variant="body1" component="h3">
                                        Thai Market
                                    </Typography>
                                    <Typography variant="body2" component="div">Apr 22, 2023</Typography>
                                    <Typography variant="body2" component="div">5 Tomato, 2 Chicken, 1 Coconut Large, ...</Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button variant='contained' to={'1'} component={Link}>Continue</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card
                            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                        >
                            <CardActionArea onClick={handleNewChecklistClick}>
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        New Checklist
                                    </Typography>
                                    <Typography>
                                        Start a new checklist
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button variant='contained' onClick={handleNewChecklistClick}>New</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
            {/* List of other in-progress checklists */}
            <Typography
                variant="subtitle1"
                color="text.primary"
            >
                Other In-progress Checklist
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
                    <ListItemButton to={'2'} component={Link}>
                        <ListItemText
                            primary={'Thai Market'}
                            primaryTypographyProps={{ variant: "subtitle2" }}
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
                    <ListItemButton to={'3'} component={Link}>
                        <ListItemText
                            primary={'Wonder Market'}
                            primaryTypographyProps={{ variant: "subtitle2" }}
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
            <Link to="all">View all checklists</Link>
            {/* Link to view all checklists */}

            {/* New checklist dialog */}
            <Dialog
                fullWidth
                open={newChecklistDialogOpen}
                onClose={handleNewChecklistDialogClose}
            >
                <DialogTitle>New Checklist</DialogTitle>
                <DialogContent>
                    <Box component={'form'}>
                        <TextField
                            id="name"
                            label="Name"
                            fullWidth
                            required
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}
                            margin="normal"
                        />
                        <Typography component="subtitle2">
                            Copy from previous checklist:
                        </Typography>
                        <List
                            disablePadding
                            sx={{
                                maxHeight: 200,
                                position: 'relative',
                                overflow: 'auto',
                            }}
                        >
                            <ListItem
                                // key={item.id}
                                // onClick={() => handleItemClick(item.id)}
                                divider
                                dense
                                disablePadding
                                disableGutters
                            >
                                <ListItemButton to={'2'} component={Link}>
                                    <ListItemText
                                        primary={'Thai Market'}
                                        primaryTypographyProps={{ variant: "subtitle2" }}
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
                                disablePadding
                                disableGutters
                            >
                                <ListItemButton to={'3'} component={Link} disablePadding>
                                    <ListItemText
                                        primary={'Wonder Market (Apr 22, 2023)'}
                                        primaryTypographyProps={{ variant: "subtitle2" }}
                                        secondary={(
                                            <React.Fragment>
                                                {/* <Typography variant="body2" component="div">Apr 22, 2023</Typography> */}
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
                                disablePadding
                                disableGutters
                            >
                                <ListItemButton to={'3'} component={Link} disablePadding>
                                    <ListItemText
                                        primary={'Wonder Market (Apr 22, 2023)'}
                                        primaryTypographyProps={{ variant: "subtitle2" }}
                                        secondary={(
                                            <React.Fragment>
                                                {/* <Typography variant="body2" component="div">Apr 22, 2023</Typography> */}
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
                                disablePadding
                                disableGutters
                            >
                                <ListItemButton to={'3'} component={Link} disablePadding>
                                    <ListItemText
                                        primary={'Wonder Market (Apr 22, 2023)'}
                                        primaryTypographyProps={{ variant: "subtitle2" }}
                                        secondary={(
                                            <React.Fragment>
                                                {/* <Typography variant="body2" component="div">Apr 22, 2023</Typography> */}
                                                <Typography variant="body2" component="div">5 Tomato, 2 Chicken, 1 Coconut Large, ...</Typography>
                                            </React.Fragment>
                                        )}
                                    />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="inherit" onClick={handleNewChecklistDialogClose}>Cancel</Button>
                    <Button variant="contained" onClick={handleNewChecklistCreate}>Create</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

export default ChecklistPage;
