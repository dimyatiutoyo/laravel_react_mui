import { Alert, Button, Card, CardContent, Container, Dialog, DialogActions, DialogContent, DialogTitle, FilledInput, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Snackbar, TextField, Typography } from "@mui/material";
import Layout from "../../layouts/auth/Layout";
import { useFormik } from "formik";
import * as yup from "yup";
import { VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { useSWRConfig } from "swr";
import apiClient from "../../config/apiClient";

const validationSchema = yup.object({
    name: yup.string('Masukkan nama')
        .required('Nama harus diisi')
        .min(3, "Panjang karakter minimal ${min}"),
    email: yup.string('Masukkan email')
        .required('Email harus diisi')
        .email('Email tidak valid'),
    password: yup.string('Masukkan password')
        .required('Password harus diisi')
        .min(6, "Panjang karakter minimal ${min}"),
    password_confirmation: yup.string('Masukkan konfirmasi password')
        .required('Konfirmasi password harus diisi')
        .oneOf([yup.ref('password'), null], 'Konfirmasi password tidak sesuai'),
    role: yup.string('Pilih role user')
        .required('Role user harus diisi')
});
function CreateUser({ fetchUsers }) {
    const [openDialog, setOpenDialog] = useState(false);
    const { mutate } = useSWRConfig();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState(null);
    const [snackbarSeverity, setSnackbarSeverity] = useState('info');
    const [roles, setRoles] = useState([]);
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
            role: ""
        },
        validationSchema: validationSchema,
        onSubmit: async (data, { setSubmitting, resetForm }) => {
            try {
                const response = await apiClient.post('/api/user', data);
                handleCloseDialog();
                setSnackbarMessage(response?.data?.message);
                setSnackbarSeverity('success');
                resetForm();
            } catch (error) {
                setSnackbarSeverity('error');
                setSnackbarMessage(error.response?.data?.message);
            } finally {
                handleOpenSnackbar();
                setSubmitting(false);
                fetchUsers();
            }
        }
    });

    const fetchRoles = async () => {
        try {
            const response = await apiClient.get('/api/role');
            setRoles(response.data);
        } catch (error) {
            console.log(error)
        }
    }

    const handleOpenDialog = () => {
        fetchRoles();
        setOpenDialog(true);
    }
    const handleCloseDialog = () => {
        setOpenDialog(false);
    }
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    }
    const handleOpenSnackbar = () => {
        setOpenSnackbar(true);
    }

    return (
        <>
            <Button variant="contained" onClick={handleOpenDialog} color="primary">Tambah User</Button>
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="xs">
                <DialogTitle>Buat akun baru</DialogTitle>
                <form onSubmit={formik.handleSubmit}>
                    <DialogContent sx={{ pt: 0 }}>
                        <TextField
                            label="Nama"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && formik.errors.name ? true : false}
                            helperText={formik.touched.name && formik.errors.name ? formik.errors.name : null}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                        />
                        <TextField
                            label="Email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && formik.errors.email ? true : false}
                            helperText={formik.touched.email && formik.errors.email ? formik.errors.email : null}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                        />
                        <TextField
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="start">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => { }}
                                            onMouseDown={() => { }}
                                        >
                                            <VisibilityOff />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            label="Password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && formik.errors.password ? true : false}
                            helperText={formik.touched.password && formik.errors.password ? formik.errors.password : null}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                        />
                        <TextField
                            label="Konfirmasi Password"
                            name="password_confirmation"
                            value={formik.values.password_confirmation}
                            onChange={formik.handleChange}
                            error={formik.touched.password_confirmation && formik.errors.password_confirmation ? true : false}
                            helperText={formik.touched.password_confirmation && formik.errors.password_confirmation ? formik.errors.password_confirmation : null}
                            fullWidth
                            variant="outlined"
                            margin="dense"
                        />
                        <TextField
                            label="Role"
                            name="role"
                            value={formik.values.role}
                            onChange={formik.handleChange}
                            error={formik.touched.role && formik.errors.role ? true : false}
                            helperText={formik.touched.role && formik.errors.role ? formik.errors.role : null}
                            fullWidth
                            defaultValue=""
                            variant="outlined"
                            margin="dense"
                            select
                        >
                            <MenuItem key="" value=""><em>-- Pilih Role --</em></MenuItem>
                            {
                                roles.map((role, index) => {
                                    return (
                                        <MenuItem key={index} value={role.id}>{role.display_name}</MenuItem>
                                    )
                                })
                            }

                        </TextField>
                    </DialogContent>
                    <DialogActions sx={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}>
                        <Button onClick={handleCloseDialog} color="primary">Batal</Button>
                        <LoadingButton
                            type="submit"
                            color="primary"
                            variant="contained"
                            loading={formik.isSubmitting}
                        >
                            Simpan
                        </LoadingButton>
                    </DialogActions>
                </form>
            </Dialog>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
}

export default CreateUser;
