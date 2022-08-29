import { Box, Button, Card, CardContent, CardHeader, CircularProgress, Container, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import apiClient from "../../config/apiClient";
import Layout from "../../layouts/auth/Layout";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import { Link } from "react-router-dom";
import useSWR, { mutate } from "swr";
import Grid2 from '@mui/material/Unstable_Grid2';
import useCan from "../../hooks/role_permission/useCan";
import CreateUser from "./CreateUser";

function User() {
    const [users, setUsers] = useState([]);
    const [queryParams, setQueryParams] = useState(null)
    const [loading, setLoading] = useState(false);
    const canEditUser = useCan('edit-user');
    const canDeleteUser = useCan('delete-user');

    useEffect(() => {
        console.log(queryParams);
        fetchUsers();
    }, [queryParams]);

    const handleSearch = (event) => {
        if (event.target.value.length > 0) {
            setQueryParams({
                search: event.target.value
            })
        } else {
            setQueryParams(null)
        }
    }

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await apiClient.get('/api/user', {
                params: queryParams
            });
            setUsers(response.data);
            // console.log(response.data);
        } catch (error) {
            console.log(error)
        } finally {
            console.log('finally');
            setLoading(false);
        }
    }

    return (
        <Layout>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        mb: 1
                    }}>
                        <Typography variant="h5">User</Typography>
                        <CreateUser fetchUsers={fetchUsers} />
                    </Box>
                    <Card variant="outlined">
                        <CardHeader sx={{
                            pb: 0
                        }} action={
                            <TextField
                                sx={{
                                    '& fieldset': {
                                        borderRadius: "8px",
                                    },
                                }}
                                size="small"
                                aria-labelledby="cari_label"
                                variant="outlined"
                                placeholder="Cari"
                                margin="dense"
                                onChange={handleSearch}
                                id="cari"
                                type="text"
                                fullWidth
                            />
                        } />

                        <CardContent sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                        }}>
                            {
                                loading
                                    ? <CircularProgress color="inherit" />
                                    : <TableContainer>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell sx={{
                                                        width: "30px",
                                                    }}>No.</TableCell>
                                                    <TableCell>Nama</TableCell>
                                                    <TableCell>Role</TableCell>
                                                    <TableCell sx={{
                                                        width: "160px",
                                                    }}></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {users.map((user, index) => (
                                                    <TableRow key={user.id}>
                                                        <TableCell>{(index + 1)}</TableCell>
                                                        <TableCell>
                                                            <Box>
                                                                {user.name}
                                                            </Box>
                                                            <Box>
                                                                {user.email}
                                                            </Box>
                                                        </TableCell>
                                                        <TableCell>
                                                            {user.roles[0]?.display_name}
                                                        </TableCell>
                                                        <TableCell>
                                                            {
                                                                canEditUser ?
                                                                    <Link to={`/user/${user.id}/role`}>
                                                                        <Tooltip title="ubah role">
                                                                            <IconButton aria-label="ubah role">
                                                                                <KeyRoundedIcon />
                                                                            </IconButton>
                                                                        </Tooltip>
                                                                    </Link> : null
                                                            }
                                                            {
                                                                canEditUser ?
                                                                    <Link to={`/user/${user.id}/edit`}>
                                                                        <Tooltip title="edit user">
                                                                            <IconButton aria-label="edit data">
                                                                                <EditRoundedIcon />
                                                                            </IconButton>
                                                                        </Tooltip>
                                                                    </Link>
                                                                    : null
                                                            }
                                                            {
                                                                canDeleteUser ?
                                                                    <Tooltip title="hapus user">
                                                                        <IconButton color="error" aria-label="hapus data">
                                                                            <DeleteRoundedIcon />
                                                                        </IconButton>
                                                                    </Tooltip> : null
                                                            }
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                            }

                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Layout>
    );
}

export default User;
