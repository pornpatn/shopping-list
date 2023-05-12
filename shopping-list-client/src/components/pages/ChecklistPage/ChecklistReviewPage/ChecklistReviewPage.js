import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { List, ListItem, ListItemButton, ListItemIcon, Checkbox, ListItemText, Toolbar } from '@mui/material';
import { useConfirm } from "material-ui-confirm";
import FormDialog from '../../../molecules/FormDialog';
import { selectCategories } from '../../../../store/categorySlice';
import { selectProducts } from '../../../../store/productSlice';
import { selectMarkets } from '../../../../store/marketSlice';
import {
    selectCurrentChecklist,
    updateChecklist,
} from '../../../../store/checklistSlice';

function ChecklistReviewPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const confirm = useConfirm();
    const categories = useSelector(selectCategories);
    const products = useSelector(selectProducts);
    const markets = useSelector(selectMarkets);
    const checklist = useSelector(selectCurrentChecklist);

    const [checkedIds, setCheckedIds] = useState([]);

    const [orderDialogOpen, setOrderDialogOpen] = useState(false);

    const handleToggleAll = (e) => {
        if (e.target.checked) {
            setCheckedIds(checklist.items.map(item => item.product.id));
        } else {
            setCheckedIds([]);
        }
    };

    const handleToggle = (id) => {
        if (checkedIds.includes(id)) {
            setCheckedIds(checkedIds.filter(checkedId => checkedId !== id));
        } else {
            setCheckedIds([...checkedIds, id]);
        }
    };

    const renderItemRow = (item) => {
        return (
            <ListItem key={item.product.id} disablePadding disableGutters divider>
                <ListItemButton dense>
                    <ListItemIcon>
                        <Checkbox
                            edge="start"
                            tabIndex={-1}
                            disableRipple
                            checked={checkedIds.includes(item.product.id)}
                            onChange={() => handleToggle(item.product.id)}
                        />
                    </ListItemIcon>
                    <ListItemText primary={
                        <React.Fragment>
                            <Typography
                                sx={{ display: 'inline', width: 40, paddingRight: 1 }}
                                component="span"
                                variant="body1"
                            >
                                {item.qty}
                            </Typography>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                            >
                                {item.product.name}
                            </Typography>
                        </React.Fragment>
                    } />
                </ListItemButton>
            </ListItem>
        );
    };

    const renderByCategory = (category) => {
        const productsToRender = products.filter(product => product.category?.id === category.id);
        if (productsToRender.length === 0) {
            return null;
        }

        const productIds = productsToRender.map(product => product.id);
        const itemsToRender = checklist.items.filter(item => (item.qty > 0) && productIds.includes(item.product.id));
        if (itemsToRender.length === 0) {
            return null;
        }

        return (
            <List key={category.id} dense disablePadding subheader={category.name}>
                {itemsToRender.map(item => renderItemRow(item))}
            </List>
        );
    };

    const handleDoneClick = () => {
        const markChecklistDone = () => {
            dispatch(updateChecklist({
                data: {
                    ...checklist,
                    status: 'done',
                }
            })).then(() => {
                navigate("/checklist");
            });
        };

        confirm({ description: "This action will mark checklist done." })
            .then(() => {
                markChecklistDone();
            })
            .catch(() => {
                // Done cancelled
            });
    };

    const handleOrderClick = () => {
        setOrderDialogOpen(true);
    };

    const handleOrderDialogClose = () => {
        setOrderDialogOpen(false);
    };

    const handleOrderSave = () => {
        // create order

        setOrderDialogOpen(false);
    };

    console.log('review checklist: ', checklist);
    if (!checklist) {
        return (
            <div>
                Checklist not found!
            </div>
        )
    };

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
                    onChange={(e) => handleToggleAll(e)}
                    checked={checkedIds.length === checklist.items.length}
                    indeterminate={(checkedIds.length > 0) && (checkedIds.length !== checklist.items.length)}
                />
                <Typography variant="body2">Select All</Typography>
            </Toolbar>

            {categories.map(category => renderByCategory(category))}

            <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'center', gap: 1 }}>
                <Button
                    variant="outlined"
                    color="inherit"
                    onClick={() => navigate(-1)}
                >
                    Back
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleOrderClick}
                >
                    Order
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleDoneClick}
                >
                    Done
                </Button>
            </Box>

            <FormDialog
                open={orderDialogOpen}
                onClose={handleOrderDialogClose}
                onSave={handleOrderSave}
                title={'Order'}
            >
                <Box component={'form'} onSubmit={handleOrderSave}>
                    Select Market
                    Select how to export
                    Select delivery date
                </Box>
            </FormDialog>

            {/* <Box sx={{ paddingTop: 2 }}>
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
                        <ListItemButton>
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
            </Box> */}

        </Container>
    );
}

export default ChecklistReviewPage;
