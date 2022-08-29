import { EditRounded } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Alert, Backdrop, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Snackbar, TextField, Tooltip } from "@mui/material";
import { useState } from "react";
import apiClient from "../../config/apiClient";
import { useSWRConfig } from 'swr';

function EditGroupPermissionButton(props) {
    const [openDialog, setOpenDialog] = useState(false);
    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState(null);
    const [isSuccess, setIsSuccess] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const { mutate } = useSWRConfig();

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    }
    const handleOpenSnackbar = () => {
        setOpenSnackbar(true);
    }

    const handleCloseEditDialog = () => {
        console.log('onclose')
        setIsSubmitting(false);
        setOpenDialog(false);
    }

    const handleOpenEditDialog = (id) => {
        fetchData(id).then((groupPermission) => {
            setName(groupPermission.name);
            setId(groupPermission.id);
            setOpenDialog(true);
        }).catch(err => {
            console.log(err);
            setSnackbarMessage(err);
            setIsSuccess(false);
            handleOpenSnackbar();
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await apiClient.put('/api/group-permission/' + id, {
                name: name
            });

            setIsSuccess(true);
            setSnackbarMessage(response.data.message);
            setOpenSnackbar(true);
            mutate('/api/group-permission');
        } catch (error) {
            setIsSuccess(false);
            setSnackbarMessage(error.response?.data?.message);
            setOpenSnackbar(true);
        } finally {
            setIsSubmitting(false);
        }
    }

    const fetchData = async (id) => {
        return new Promise(async (resolve, reject) => {
            setIsLoading(true);
            try {
                const response = await apiClient.get(`/api/group-permission/${id}`);
                resolve(response.data);
            } catch (error) {
                reject(error.response.data?.message);
            }
            finally {
                setIsLoading(false);
            }
        })
    }

    return (
        <>
            <Tooltip title="edit nama permission" placement="top">
                <IconButton onClick={() => handleOpenEditDialog(props.id)} color="default">
                    {isLoading ? <CircularProgress size={20} /> : <EditRounded />}
                </IconButton>
            </Tooltip>
            <Dialog open={openDialog} onClose={handleCloseEditDialog} maxWidth="sm">
                <form onSubmit={handleSubmit}>
                    <DialogTitle>Edit Grup Permission</DialogTitle>
                    <DialogContent>
                        <TextField
                            variant="outlined"
                            label="Nama Grup Permission"
                            autoFocus
                            margin="dense"
                            id="group_name"
                            onChange={(event) => setName(event.target.value.toUpperCase())}
                            value={name}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <LoadingButton type="submit" loading={isSubmitting}>Simpan</LoadingButton>
                    </DialogActions>
                </form>
            </Dialog>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert onClose={handleCloseSnackbar} variant="filled" severity={isSuccess ? 'success' : 'error'} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>

        </>
    );
}

export default EditGroupPermissionButton;
