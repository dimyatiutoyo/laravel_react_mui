import useSWR, { useSWRConfig } from "swr";
import apiClient from "../../config/apiClient";
import {
    Alert,
    Backdrop,
    Box,
    Breadcrumbs,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Link,
    MenuItem,
    Snackbar,
    TextField,
    Typography
} from "@mui/material";
import { useRef, useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import CreateGroupPermissionComponent from "./CreateGroupPermissionComponent";
import GroupPermissionComponent from "./GroupPermissionComponent";

function GroupPermissionLayoutComponent() {
    const [name, setName] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [loading, setLoading] = useState(false);
    const { mutate } = useSWRConfig();
    const [action, setAction] = useState('create');
    const [id, setId] = useState(null);
    const [message, setMessage] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [groupMenuId, setGroupMenuId] = useState("");
    const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
    const [groupPermissionId, setGroupPermissionId] = useState(null);
    const groupPermissionComponentRef = useRef();


    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    }

    const handleOpen = (action = 'create', id = null) => {
        setAction(action);
        setId(id);
        if (action === 'edit') {
            fetchPermission(id).then(res => setOpen(true));
        } else {
            setOpen(true);
        }
    }

    const handleClose = () => {
        setOpen(false);
        clearState();
    }

    const clearState = () => {
        setNameError(null);
        setDisplayNameError(null);
        setName("");
        setDisplayName("");
        setGroupMenuId("");
    }

    const handleCreateSubmit = async (e) => {
        return new Promise(async (resolve, reject) => {
            const data = {
                name: name,
                display_name: displayName,
                group_permission_id: groupMenuId
            }

            try {
                const response = await apiClient.post('/api/permission', data);
                setMessage(response.data.message);
                resolve();
            } catch (error) {
                reject(error);
            }
        })
    }

    const handleUpdateSubmit = async (e) => {
        return new Promise(async (resolve, reject) => {
            const data = {
                name: name,
                display_name: displayName,
                group_permission_id: groupMenuId
            }

            try {
                const response = await apiClient.put('/api/permission/' + id, data);
                setMessage(response.data.message);
                resolve();
            } catch (error) {
                reject(error);
            }
        })
    }

    const fetchPermission = async (id) => {
        setLoading(true);
        return new Promise(async (resolve, reject) => {
            try {
                const response = await apiClient.get(`/api/permission/${id}`);
                setName(response.data.name);
                setDisplayName(response.data.display_name);
                setGroupMenuId(response.data.group_permission_id);
                resolve();
            } catch (error) {
                console.log(error);
                reject();
            } finally {
                setLoading(false);
            }
        });
    }


    const handleCloseGroupPermissionConfirmation = async () => {
        setId(null);
        setOpenDeleteConfirmation(false);
    }


    const openDeleteDialog = (groupPermissionId) => {
        setGroupPermissionId(groupPermissionId);
        setOpenDeleteConfirmation(true);
    }

    const handleDeleteGroupPermission = async () => {
        setLoading(true);
        try {
            handleCloseGroupPermissionConfirmation();
            await apiClient.delete(`/api/group-permission/${groupPermissionId}`);
            groupPermissionComponentRef.current.refreshData();
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }

    }

    return (
        <>
            <Box sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'baseline'
                }}>
                    <Typography variant="h4" sx={{ mr: 2 }}>Group Permission</Typography>
                </Box>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/">
                        MUI
                    </Link>
                    <Link
                        underline="hover"
                        color="inherit"
                        href="/material-ui/getting-started/installation/"
                    >
                        Core
                    </Link>
                    <Typography color="text.primary">Breadcrumbs</Typography>
                </Breadcrumbs>
            </Box>


            <GroupPermissionComponent ref={groupPermissionComponentRef} openDeleteDialog={openDeleteDialog} />

            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}><CircularProgress color="inherit" /></Backdrop>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={isSuccess ? 'success' : 'error'} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>

            <Dialog
                open={openDeleteConfirmation}
                onClose={() => setOpenDeleteConfirmation(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Anda akan menghapus permission ini?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Penghapusan group permission ini akan menghapus semua permission yang ada di dalamnya.
                        Lanjutkan?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseGroupPermissionConfirmation}>Batal</Button>
                    <Button onClick={handleDeleteGroupPermission} color="error">
                        Lanjutkan Hapus
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default GroupPermissionLayoutComponent;
