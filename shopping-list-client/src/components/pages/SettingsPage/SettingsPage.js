import React from 'react';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@mui/material/CardActionArea';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const cards = [
    {
        path: 'products',
        title: 'Products',
        description: 'Manage products',
    },
    {
        path: 'categories',
        title: 'Categories',
        description: 'Manage categories',
    },
    {
        path: 'tags',
        title: 'Tags',
        description: 'Manage tags',
    },
    {
        path: 'markets',
        title: 'Markets',
        description: 'Manage markets',
    },
];

function SettingsCard({ card }) {
    return (
        <Grid item xs={12} sm={4}>
            <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
                <CardActionArea to={card.path} component={Link}>
                    <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="h2">
                            {card.title}
                        </Typography>
                        <Typography>
                            {card.description}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button variant='contained'>Edit</Button>
                    </CardActions>
                </CardActionArea>
            </Card>
        </Grid>
    );
}

function SettingsPage() {
    return (
        <Container maxWidth="lg">
            <Typography
                component="h1"
                variant="h5"
                color="text.primary"
                gutterBottom
            >
                Settings
            </Typography>
            <Grid container spacing={4}>
                {cards.map(card => <SettingsCard key={card.path} card={card} />)}
            </Grid>
        </Container>
    );
}

export default SettingsPage;
