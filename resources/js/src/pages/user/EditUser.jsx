import { Alert, Box, Card, CardActions, CardContent, CardHeader, CircularProgress, Container, Snackbar, TextField, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import apiClient from "../../config/apiClient";
import Layout from "../../layouts/auth/Layout";
import { useFormik } from "formik";
import * as yup from "yup";
import LoadingButton from "@mui/lab/LoadingButton";
import { useEffect, useState } from "react";

const validationSchema = yup.object({
    name: yup.string('Masukkan nama')
        .required('Nama harus diisi')
        .min(3, "Panjang karakter minimal ${min}"),
    email: yup.string('Masukkan email')
        .required('Email harus diisi')
        .email('Email tidak valid')
});

function EditUser() {
    const { userId } = useParams();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState(null);
    const [snackbarSeverity, setSnackbarSeverity] = useState('info');

    const { data, error } = useSWR(`/api/user/${userId}`, url => apiClient.get(url).then(res => res.data));

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (data, { setSubmitting }) => {
            try {
                const response = await apiClient.put(`/api/user/${userId}`, data);
                setSubmitting(false);
                setSnackbarMessage(response?.data?.message);
                setSnackbarSeverity('success');
            } catch (error) {
                setSnackbarSeverity('error');
                setSnackbarMessage(error.response?.data?.message);
            } finally {
                setOpenSnackbar(true);
                setSubmitting(false);
            }
        }
    });

    useEffect(() => {
        if (data) {
            formik.setValues({
                name: data.name,
                email: data.email,
            })
        }
    }, [data])

    if (!data) {
        return (
            <Layout>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <CircularProgress color="inherit" />
                </Box>
            </Layout>
        );
    }

    return (
        <Layout>
            <Container maxWidth="sm">
                <Card variant="outlined">
                    <CardHeader title={`Edit ${data.name}`} sx={{ pb: 0 }} />
                    <form onSubmit={formik.handleSubmit}>
                        <CardContent>
                            <TextField
                                aria-labelledby="name_label"
                                variant="outlined"
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.errors.name}
                                label="Nama"
                                margin="dense"
                                onChange={formik.handleChange}
                                id="name"
                                type="text"
                                fullWidth
                                value={formik.values.name}
                            />
                            <TextField
                                aria-labelledby="email_label"
                                variant="outlined"
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.errors.email}
                                label="Email"
                                margin="dense"
                                onChange={formik.handleChange}
                                id="email"
                                type="text"
                                fullWidth
                                value={formik.values.email}
                            />
                        </CardContent>
                        <CardActions sx={{
                            justifyContent: 'flex-end',
                        }}>
                            <LoadingButton type="submit" loading={formik.isSubmitting}>Simpan</LoadingButton>
                        </CardActions>
                    </form>
                </Card>
            </Container>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => setOpenSnackbar(false)}>
                <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Layout>
    );
}

export default EditUser;
