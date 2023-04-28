import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useConfirm } from "material-ui-confirm";
import PageHeader from '../../../molecules/PageHeader';
import FormDialog from '../../../molecules/FormDialog';
import {
    createCategory as createItem,
    updateCategory as updateItem,
    deleteCategory as deleteItem,
    selectCategories as selectItems,
    NEW_CATEGORY_TEMPLATE as NEW_ITEM_TEMPLETE,
} from '../../../../store/categorySlice';

function CategorySettings() {
    const dispatch = useDispatch();
    const entities = useSelector(selectItems);
    const [selectedItem, setSelectedItem] = useState({});

    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);

    const confirm = useConfirm();

    const handleCreateClick = () => {
        setSelectedItem(NEW_ITEM_TEMPLETE);
        setCreateDialogOpen(true);
    };

    const handleCreateDialogClose = () => {
        setCreateDialogOpen(false);
    };

    const handleCreateSave = () => {
        dispatch(createItem({ data: selectedItem })).unwrap();
        setCreateDialogOpen(false);
    };

    const handleItemClick = (id) => {
        const foundItem = entities.find(item => item.id === id);
        if (foundItem) {
            setSelectedItem(foundItem);
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

    const renderFormContent = () => (
        <TextField
            id="name"
            label="Name"
            fullWidth
            required
            value={selectedItem.name}
            onChange={(e) => { setSelectedItem({ ...selectedItem, name: e.target.value }) }}
            margin="normal"
        />
    );

    return (
        <React.Fragment>
            <Container maxWidth="lg" disableGutters>
                <PageHeader title="Categories">
                    <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={handleCreateClick}
                    >
                        Add
                    </Button>
                </PageHeader>

                {(entities.length === 0) && (
                    <p>
                        <i>No Data</i>
                    </p>
                )}
                {(entities.length > 0) && (
                    <List>
                        {entities.map((item) => (
                            <ListItemButton
                                key={item.id}
                                onClick={() => handleItemClick(item.id)}
                                divider
                            >
                                <ListItemText primary={item.name} />
                            </ListItemButton>
                        ))}
                    </List>
                )}
            </Container>

            <FormDialog
                open={createDialogOpen}
                onClose={handleCreateDialogClose}
                onSave={handleCreateSave}
                title={'Create Category'}
            >
                <Box component={'form'}>
                    {renderFormContent()}
                </Box>
            </FormDialog>

            <FormDialog
                open={editDialogOpen}
                onClose={handleEditDialogClose}
                onSave={handleEditSave}
                title={'Edit Category'}
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

export default CategorySettings;