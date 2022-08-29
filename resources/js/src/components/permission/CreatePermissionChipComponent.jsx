import { AddRounded } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Alert, Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, Snackbar, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import apiClient from "../../config/apiClient";
import { useSWRConfig } from 'swr';

const validationSchema = yup.object({
    name: yup.string('Masukkan nama permission')
        .required("Nama harus diisi"),
    display_name: yup.string("Masukkan nama tampilan permission")
        .required("Nama tampilan harus diisi")
});

function CreatePermissionChipComponent(props) {
    const { mutate } = useSWRConfig();
    const formik = useFormik({
        initialValues: {
            name: "",
            display_name: "",
            group_permission_id: props.groupId
        },
        validationSchema: validationSchema,
        onSubmit: async (data, { setSubmitting, resetForm }) => {
            try {
                const response = await apiClient.post('/api/permission', data);
                setSnackbarVariant('success');
                setSnackbarMessage(response.data.message);
                resetForm();
            } catch (error) {
                setSnackbarVariant('error');
                setSnackbarMessage(error.response?.data?.message);
            } finally {
                setOpenSnackbar(true);
                setSubmitting(false);
                mutate('/api/group-permission');
            }
        },
    });

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarVariant, setSnackbarVariant] = useState("info");
    const [openDialog, setOpenDialog] = useState(false);


    const handleCloseDialog = () => {
        setOpenDialog(false);
    }

    const handleOpenDialog = () => {
        setOpenDialog(true);
    }

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    }


    return (
        <>
            <Chip
                clickable
                icon={<AddRounded />}
                label={'tambah baru'}
                onClick={handleOpenDialog}
                sx={{
                    mr: 1,
                    mb: 1,
                    transition: 'all 0.1s ease-in-out',
                    "&:hover": {
                        color: 'primary.main',
                    }
                }} />

            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="xs">
                <form onSubmit={formik.handleSubmit} method="post">
                    <DialogTitle>{props.groupName}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Tambah Permission</DialogContentText>
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
                <Alert onClose={handleCloseSnackbar} variant="filled" severity={snackbarVariant} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
}

export default CreatePermissionChipComponent;
