import { Alert, Box, Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, TextField } from "@mui/material";
import { useState } from "react";
import Grid2 from '@mui/material/Unstable_Grid2';
import { LoadingButton } from "@mui/lab";
import apiClient from "../../config/apiClient";
import { AddRounded } from "@mui/icons-material";
import { useFormik } from "formik";
import * as yup from 'yup';
import { useSWRConfig } from 'swr';

const validationSchema = yup.object({
    name: yup.string('Masukkan nama grup permission')
        .required('Nama harus diisi')
        .min(3, "Panjang karakter minimal ${min}")
});


function CreateGroupPermissionComponent(props) {
    const [snackbarMessage, setSnackbarMessage] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState('info');
    const { mutate } = useSWRConfig();
    const formik = useFormik({
        initialValues: {
            name: ""
        },
        validationSchema: validationSchema,
        onSubmit: async (data, { setSubmitting }) => {
            try {
                const response = await apiClient.post("/api/group-permission", data);
                handleCloseDialog();
                setSnackbarMessage(response?.data?.message);
                setSnackbarSeverity('success');
                mutate('/api/group-permission');
            } catch (error) {
                setSnackbarSeverity('error');
                setSnackbarMessage(error.response?.data?.message);
            } finally {
                handleOpenSnackbar()
                setSubmitting(false);
            }
        },
    });

    const handleOpenSnackbar = () => {
        setOpenSnackbar(true);
    }

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
    }

    const handleOpenDialog = () => {
        setOpenDialog(true);
    }

    return (
        <>
            <Grid2 xs={12} sm={12} md={6} lg={4} item key={'add_new_group'}>
                <Card variant="outlined">
                    <CardContent sx={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}>
                        <Button onClick={handleOpenDialog} startIcon={<AddRounded />}>Tambah Grup Permission</Button>
                    </CardContent>
                </Card>
            </Grid2>
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
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm">
                <form onSubmit={formik.handleSubmit}>
                    <DialogTitle>Grup Permission Baru</DialogTitle>
                    <DialogContent>
                        <TextField
                            variant="outlined"
                            label="Nama Grup Permission"
                            autoFocus
                            margin="dense"
                            id="name"
                            onChange={(event) => {
                                formik.setFieldValue('name', event.target.value.toUpperCase())
                            }}
                            value={formik.values.name}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <LoadingButton type="submit" loading={formik.isSubmitting}>Simpan</LoadingButton>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
}

export default CreateGroupPermissionComponent;
