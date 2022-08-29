import { Error } from "@mui/icons-material";
import {
    Alert,
    Box,
    Card,
    CardContent,
    CircularProgress,
    Container,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Radio,
    RadioGroup,
    Skeleton,
    Snackbar,
    Typography
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useSWR, { useSWRConfig } from "swr";
import apiClient from "../../config/apiClient";
import Layout from "../../layouts/auth/Layout";

function UserRole() {
    const { userId } = useParams();
    const user = useSelector(state => state.user);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { data: roles, error: rolesError, mutate: mutateRoles } = useSWR('/api/role', url => apiClient.get(url).then(res => res.data));
    const { data: userRole, error: userRoleError, mutate: userRoleMutate } = useSWR(`/api/user/${userId}/role`, url => apiClient.get(url).then(res => {
        return res.data.data
    }));

    const handleChange = async (event) => {
        const role = event.target.value;
        setIsSubmitting(true);
        try {
            const response = await apiClient.put(`/api/user/${userId}/role`, {
                role: role
            });
            setSnackbarMessage(response.data.message);
            setSnackbarSeverity("success");
        } catch (error) {
            setSnackbarMessage(error.response?.data?.message);
            setSnackbarSeverity("error");
        } finally {
            setOpenSnackbar(true);
            setIsSubmitting(false);
            userRoleMutate();
        }
    }

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    }

    const handleOpenSnackbar = () => {
        setOpenSnackbar(true);
    }

    // if data is not ready and error is not null, show error
    if ((!roles && rolesError) || (!userRole && userRoleError)) {
        return (
            <Layout>
                <Container maxWidth="sm">
                    <Alert severity="error" variant="filled">
                        <Typography variant="paragraph">Ada kesalahan saat memuat data. Hubungi administrator.</Typography>
                    </Alert>
                </Container>
            </Layout>
        )
    }

    // if data is not ready yet
    if (!roles || !userRole) {
        return (
            <Layout>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={8} md={4} lg={3}>
                        <Card variant="outlined" sx={{ p: 0 }}>
                            <CardContent>
                                <Box>
                                    <Skeleton sx={{ mb: 2 }} variant="rounded" height={20} width="60%" />
                                    <Skeleton sx={{ mb: 2 }} variant="rounded" height={20} width="70%" />
                                    <Skeleton sx={{ mb: 2 }} variant="rounded" height={20} width="50%" />
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Layout>
        )
    }

    return (
        <Layout>
            <Typography variant="h4">User Role: {user.name}</Typography>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={8} md={4} lg={3}>
                    <Card variant="outlined" sx={{ p: 0 }}>
                        <CardContent>
                            <FormLabel id="demo-role-label">
                                {
                                    isSubmitting ? <CircularProgress size={20} color="inherit" /> : "Role"
                                }
                            </FormLabel>
                            <RadioGroup
                                key={`radion-group-${user.id}`}
                                aria-labelledby="demo-role-label"
                                defaultValue={userRole.id}
                                name="role"
                            >
                                {
                                    roles.map((role, index) => (
                                        <FormControlLabel
                                            onChange={handleChange}
                                            key={index}
                                            value={role.id}
                                            control={<Radio />}
                                            label={role.display_name}
                                        />
                                    ))
                                }
                            </RadioGroup>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} variant="filled" severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Layout>
    );
}

export default UserRole;
