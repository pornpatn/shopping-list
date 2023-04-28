import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useConfirm } from "material-ui-confirm";
import PageHeader from '../../../molecules/PageHeader';
import Search from '../../../molecules/Search';
import FormDialog from '../../../molecules/FormDialog';
import {
    createProduct as createItem,
    updateProduct as updateItem,
    deleteProduct as deleteItem,
    selectProducts as selectItems,
    NEW_PRODUCT_TEMPLATE as NEW_ITEM_TEMPLETE,
} from '../../../../store/productSlice';
import { selectCategories } from '../../../../store/categorySlice';
import { selectTags } from '../../../../store/tagSlice';

function ProductSettings() {
    const dispatch = useDispatch();
    const entities = useSelector(selectItems);
    const categories = useSelector(selectCategories);
    const tags = useSelector(selectTags);
    const [selectedItem, setSelectedItem] = useState({});

    const [itemCategory, setItemCategory] = useState(null);
    const [itemCategoryCustom, setItemCategoryCustom] = useState(null);

    const [itemTags, setItemTags] = useState([]);

    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);

    const confirm = useConfirm();

    const handleCreateClick = () => {
        setSelectedItem({ ...NEW_ITEM_TEMPLETE });
        setItemCategory(null);
        setItemTags([]);
        setCreateDialogOpen(true);
    };

    const handleCreateDialogClose = () => {
        setCreateDialogOpen(false);
    };

    const handleCreateSave = () => {
        const newItem = {
            ...selectedItem,
            category: itemCategoryCustom ? { name: itemCategoryCustom } : itemCategory,
            tags: itemTags.map(tag => tags.find(t => t.name === tag) ?? { name: tag }),
        };
        dispatch(createItem({ data: newItem })).unwrap();
        setCreateDialogOpen(false);
    };

    const handleItemClick = (id) => {
        const foundItem = entities.find(item => item.id === id);
        if (foundItem) {
            setSelectedItem(foundItem);
            setItemCategory(foundItem.category.name);
            setItemCategoryCustom(null);
            setItemTags(foundItem.tags.map(tag => tag.name));
            setEditDialogOpen(true);
        }
    };

    const handleEditDialogClose = () => {
        setEditDialogOpen(false);
    };

    const handleEditSave = () => {
        dispatch(updateItem({ data: selectedItem })).unwrap();
        setEditDialogOpen(false);
    };

    const handleDeleteClick = () => {
        confirm({ description: "This action is permanent!" })
            .then(() => {
                console.log('deleted');
                dispatch(deleteItem({ id: selectedItem.id })).unwrap();
                setEditDialogOpen(false);
            })
            .catch(() => {
                // Deletion cancelled
            });
    };

    const renderItems = (items) => {
        if (items.length === 0) {
            return null;
        }

        return items.map(item => (
            <ListItemButton
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                divider
            >
                <ListItemText
                    primary={item.name}
                    secondary={item.tags.map(tag => tag.name).join(', ')}
                />
            </ListItemButton>
        ));
    };

    const renderItemsByCategories = () => {
        return categories.map((category) => {
            const itemsToRender = entities.filter(item => item.category?.id === category.id);
            if (itemsToRender.length === 0) {
                return null;
            }

            return (
                <List key={category.id} subheader={<ListSubheader>{category.name}</ListSubheader>}>
                    {renderItems(itemsToRender)}
                </List>
            )
        });
    };

    const renderItemsWithoutCategories = () => {
        const itemsToRender = entities.filter(item => item.category === null);
        if (itemsToRender.length === 0) {
            return null;
        }

        return (
            <List key={'no-category'} subheader={<ListSubheader>No Category</ListSubheader>}>
                {renderItems(itemsToRender)}
            </List>
        );
    };

    const renderFormContent = () => (
        <React.Fragment>
            <TextField
                id="name"
                label="Name"
                fullWidth
                required
                value={selectedItem.name}
                onChange={(e) => { setSelectedItem({ ...selectedItem, name: e.target.value }) }}
                margin="normal"
            />
            <Autocomplete
                id="category"
                label="Category"
                fullWidth
                disablePortal
                freeSolo
                value={itemCategory}
                onChange={(_event, newValue) => {
                    setItemCategory(newValue);
                    setItemCategoryCustom(null);
                }}
                onInputChange={(_event, newInputValue) => {
                    setItemCategoryCustom(newInputValue);
                }}
                options={categories.map(category => ({ ...category, label: category.name }))}
                renderInput={(params) => (
                    <TextField {...params} label="Category" margin="normal" />
                )}
            />
            <Autocomplete
                id="tags"
                label="Tags"
                multiple
                fullWidth
                // disablePortal
                freeSolo
                value={itemTags}
                onChange={(_event, newValue) => {
                    console.log('tag change: ', newValue);
                    setItemTags(newValue);
                }}
                options={tags.map(tag => tag.name)}
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                        <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                    ))
                }
                renderInput={(params) => (
                    <TextField {...params} label="Tags" margin="normal" />
                )}
            />
        </React.Fragment>
    );

    return (
        <React.Fragment>
            <Container maxWidth="lg" disableGutters>
                <PageHeader title="Products">
                    <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={handleCreateClick}
                    >
                        Add
                    </Button>
                </PageHeader>

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

                {(entities.length === 0) && (
                    <p>
                        <i>No Data</i>
                    </p>
                )}
                {(entities.length > 0) && (
                    <React.Fragment>
                        {renderItemsByCategories()}
                        {renderItemsWithoutCategories()}
                    </React.Fragment>
                )}
            </Container>

            <FormDialog
                open={createDialogOpen}
                onClose={handleCreateDialogClose}
                onSave={handleCreateSave}
                title={'Create Product'}
            >
                <Box component={'form'}>
                    {renderFormContent()}
                </Box>
            </FormDialog>

            <FormDialog
                open={editDialogOpen}
                onClose={handleEditDialogClose}
                onSave={handleEditSave}
                title={'Edit Product'}
            >
                <Box component={'form'}>
                    {renderFormContent()}
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleDeleteClick}
                    >
                        Delete
                    </Button>
                </Box>
            </FormDialog>
        </React.Fragment>
    );
}

export default ProductSettings;
