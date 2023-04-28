import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterListIcon from '@mui/icons-material/FilterList';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import AddIcon from '@mui/icons-material/Add';
import { Accordion, AccordionSummary, AccordionDetails, Fab, ButtonBase } from '@mui/material';
import Search from '../../../molecules/Search';

function ChecklistCheckingPage() {
    const navigate = useNavigate();
    const [checklist] = useState({
        id: 1,
        name: 'Checklist 4/26/2023',
        products: [],
        filters: [],
        status: 'in-progress',
    });

    const renderByCategory = () => (
        <Accordion disableGutters defaultExpanded>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
            >
                Vegetables
            </AccordionSummary>
            <AccordionDetails>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid lightgray' }}>
                        <div style={{ width: 40, textAlign: 'center' }}>
                            <IconButton
                                color="default"
                                size="small"
                            // sx={{ paddingLeft: 2, paddingRight: 2 }}
                            >
                                <AddIcon fontSize="small" />
                            </IconButton>
                        </div>
                        <ButtonBase style={{ flexGrow: 1, justifyContent: 'flex-start' }}>
                            <Typography variant="body1">Cucumber (case)</Typography>
                        </ButtonBase>
                        <IconButton
                            size="small"
                            color="default"
                        >
                            <CheckCircleOutlineRoundedIcon />
                        </IconButton>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid lightgray' }}>
                        <div style={{ width: 40, textAlign: 'center' }}>
                            <IconButton
                                color="default"
                                size="small"
                            // sx={{ paddingLeft: 2, paddingRight: 2 }}
                            >
                                <AddIcon fontSize="small" />
                            </IconButton>
                        </div>
                        <ButtonBase style={{ flexGrow: 1, justifyContent: 'flex-start' }}>
                            <Typography variant="body1">Tomato (case)</Typography>
                        </ButtonBase>
                        <IconButton
                            size="small"
                            color="default"
                        >
                            <CheckCircleOutlineRoundedIcon />
                        </IconButton>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <ButtonBase style={{ width: 40 }}>
                            <div>5</div>
                        </ButtonBase>
                        <ButtonBase style={{ flexGrow: 1, justifyContent: 'flex-start' }}>
                            <Typography variant="body1">Zucchini (case)</Typography>
                        </ButtonBase>
                        <IconButton
                            size="small"
                            color="success"
                        >
                            <CheckCircleOutlineRoundedIcon />
                        </IconButton>
                    </div>
                </div>
            </AccordionDetails>
        </Accordion>
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
                <IconButton
                    size="sm"
                // onClick={() => navigate(-1)}
                >
                    <EditIcon />
                </IconButton>
                <Box sx={{ flexGrow: 1 }} />
            </Box>

            <Toolbar disableGutters>

                <Box sx={{ flexGrow: 1 }} />
                <Search />
                <IconButton
                    size="large"
                    color="inherit"
                >
                    <FilterListIcon />
                </IconButton>
            </Toolbar>

            {renderByCategory()}
            {renderByCategory()}
            {renderByCategory()}
            {renderByCategory()}

            <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'center', gap: 1 }}>
                <Button
                    variant="outlined"
                >
                    Save
                </Button>
                <Button
                    variant="contained"
                    to={'review'}
                    component={Link}
                >
                    Review
                </Button>
            </Box>

            <Fab
                color="secondary"
                aria-label="Add Custom"
                sx={{ position: 'fixed', bottom: 16, right: 16 }}
            >
                <AddIcon />
            </Fab>

        </Container>
    );
}

export default ChecklistCheckingPage;
