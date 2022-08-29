import { Cancel } from "@mui/icons-material";
import { Alert, Button, Chip, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import apiClient from "../../config/apiClient";
import { useSWRConfig } from 'swr';
import { useFormik } from "formik";
import * as yup from "yup";
import { LoadingButton } from "@mui/lab";

const validationSchema = yup.object({
    id: yup.string().required(),
    name: yup.string('Masukkan nama permission')
        .required("Nama harus diisi"),
    display_name: yup.string("Masukkan nama tampilan permission")
        .required("Nama tampilan harus diisi")
});

function PermissionChip({ id, name, groupId, groupName }) {
    const [isSubmitting, setSubmitting] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const { mutate } = useSWRConfig();
    const [openDialog, setOpenDialog] = useState(false);
    const [isFetching, setFetching] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState("info");

    const formik = useFormik({
        initialValues: {
            id: id,
            name: "",
            display_name: "",
            group_permission_id: groupId
        },
        validationSchema: validationSchema,
        onSubmit: async (data, { setSubmitting, resetForm }) => {
            try {
                const response = await apiClient.put(`/api/permission/${id}`, data);
                setSnackbarSeverity('success');
                setSnackbarMessage(response.data.message);
                handleOpenSnackbar();
                setSnackbarMessage(response.data.message);
            } catch (error) {
                console.log(error);
            } finally {
                mutate('/api/group-permission');
            }
        },
    });

    const handleOpenDialog = () => {
        setOpenDialog(true);
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
    }

    const handleOpenSnackbar = () => {
        setOpenSnackbar(true);
    }

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    }

    const handleDeletePermission = async (id) => {
        setSubmitting(true);
        try {
            const response = await apiClient.delete(`/api/permission/${id}`);
        } catch (error) {
            setSnackbarMessage(error.response?.data?.message);
            handleOpenSnackbar();
        } finally {
            mutate('/api/group-permission');
            setTimeout(() => {
                setSubmitting(false);
            }, 500);
        }
    }

    const handleEditPermission = (id) => {
        console.log('grup', groupId);
        fetchPermission(id);
    }

    const fetchPermission = async (id) => {
        setFetching(true);
        try {
            const response = await apiClient.get(`/api/permission/${id}`);
            formik.setFieldValue('name', response.data.name);
            formik.setFieldValue('display_name', response.data.display_name);

            handleOpenDialog();
        } catch (error) {
            console.log(error);
        } finally {
            setFetching(false);
        }
    }

    return (
        <>
            <Chip
                color="primary"
                key={'chip' + id}
                clickable
                label={name}
                onClick={() => handleEditPermission(id)}
                onDelete={(e) => handleDeletePermission(id)}
                deleteIcon={
                    isSubmitting || isFetching ?
                        <CircularProgress size={22} />
                        : <Cancel />
                }
                sx={{
                    mr: 1,
                    mb: 1,
                }}
            />

            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="xs">
                <form onSubmit={formik.handleSubmit} method="post">
                    <DialogTitle>{groupName}</DialogTitle>
                    <DialogContent>
                        <DialogContentText sx={{ mb: 1 }}>Edit Permission</DialogContentText>
                        <TextField
                            aria-labelledby="display_name_label"
                            variant="outlined"
                            error={formik.touched.display_name && Boolean(formik.errors.display_name)}
                            helperText={formik.errors.display_name}
                            label="Nama yang ditampilkan"
                            margin="dense"
                            onChange={(e) => {
                                let display_name = e.target.value;
                                formik.setFieldValue('display_name', display_name)
                                formik.setFieldValue('name', display_name.toLowerCase().replace(/\s/g, "-"))
                            }}
                            id="display_name"
                            type="text"
                            fullWidth
                            value={formik.values.display_name}
                        />
                        <TextField
                            variant="outlined"
                            label="Nama"
                            aria-labelledby="name_label"
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.errors.name}
                            autoFocus={true}
                            margin="dense"
                            onChange={(e) => {
                                formik.setFieldValue('name', e.target.value)
                            }}
                            value={formik.values.name}
                            id="name"
                            type="text"
                            fullWidth
                        />

                    </DialogContent>
                    <DialogActions sx={{
                        justifyContent: "space-between",
                    }}>
                        <Button onClick={handleCloseDialog}>Batal</Button>
                        <LoadingButton type="submit" loading={formik.isSubmitting}>Simpan</LoadingButton>
                    </DialogActions>
                </form>
            </Dialog>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert onClose={handleCloseSnackbar} variant="filled" severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
}

export default PermissionChip;
