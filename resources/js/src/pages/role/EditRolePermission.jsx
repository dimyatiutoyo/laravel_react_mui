import {
    Alert,
    Backdrop,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Checkbox,
    CircularProgress,
    FormControlLabel,
    FormGroup,
    Grid,
    Snackbar,
    Typography
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2"
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useSWR, { useSWRConfig } from "swr";
import GroupPermission from "../../components/role/GroupPermission";
import apiClient from "../../config/apiClient";
import Layout from "../../layouts/auth/Layout";
import NotFound from "../NotFound";

function EditRolePermission() {
    const { roleId } = useParams();
    const { mutate } = useSWRConfig();
    const navigate = useNavigate();
    const {
        data: groupWithPermissions,
        error: errorGroupWithPermissions
    } = useSWR(`/api/group-permission`, url => apiClient.get(url).then(res => res.data));
    const {
        data: role,
        error: roleError
    } = useSWR(`/api/role/${roleId}`, url => apiClient.get(url).then(res => res.data));


    if (!role && roleError) {
        return navigate('/notfound')
    }

    if (!role) {
        return (
            <Layout>
                <Backdrop
                    sx={{
                        color: '#fff',
                        zIndex: (theme) => theme.zIndex.drawer + 1
                    }}
                    open={true}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </Layout>
        )
    }

    return (
        <Layout>
            <Typography variant="h5" sx={{ mb: 2 }}>Role/Level {role.display_name}</Typography>
            {
                !groupWithPermissions ?
                    <Box sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <CircularProgress />
                    </Box>
                    :
                    <Grid2 container spacing={2}>
                        {
                            groupWithPermissions.map((group, index) => {
                                return (
                                    <GroupPermission name={group.name} id={group.id} permissions={group.permissions} key={index} />
                                )
                            })
                        }
                    </Grid2>

            }
            {/* <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}><CircularProgress color="inherit" /></Backdrop> */}
            {/* <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={isSuccess ? 'success' : 'error'} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar> */}
        </Layout>
    );
}

export default EditRolePermission;
