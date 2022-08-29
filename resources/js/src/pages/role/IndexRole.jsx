import { Card, CardContent, CardHeader, Box, CircularProgress, Chip, IconButton, Tooltip, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import useSWR from 'swr';
import apiClient from '../../config/apiClient';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { Link } from 'react-router-dom';
import Layout from '../../layouts/auth/Layout';
import useDocumentTitle from '../../hooks/useDocumentTitle';

function IndexRole() {
    useDocumentTitle('Role dan Permission')
    const route = '/api/role';
    const { data: roles, error: roleError } = useSWR(route, url => apiClient.get(url).then(res => res.data));

    return (
        <Layout>
            <Typography variant="h4" sx={{ mb: 1 }}>Daftar Role/Level</Typography>
            {
                !roles ?
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
                            roles.map((role, index) => {
                                const rolePemissions = [...role.permissions];
                                return (
                                    <Grid2 key={index} item xs={12} sm={12} md={12} lg={6}>
                                        <Card variant='outlined'>
                                            <CardHeader
                                                sx={{
                                                    fontSize: "10px",
                                                }}
                                                action={
                                                    <Link to={`/role/${role.id}/edit/permission`}>
                                                        <Tooltip title="edit permission">
                                                            <IconButton size="medium" color='primary' aria-label="edit permission">
                                                                <EditRoundedIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Link>
                                                }
                                                title={role.display_name}
                                                titleTypographyProps={{
                                                    variant: "body1",
                                                }}
                                                subheader={role.description}
                                                subheaderTypographyProps={{
                                                    variant: "body2",
                                                }}
                                            />
                                            <CardContent>
                                                {
                                                    rolePemissions.length == 0 ?
                                                        <Chip label={'Tidak punya akses'} />
                                                        : role.permissions.map((permission, index) => {
                                                            const { id, name } = permission;
                                                            return (
                                                                <Chip color="primary" sx={{ mr: 1, mb: 1 }} key={'role_permission' + index} label={name} />
                                                            );
                                                        })
                                                }
                                            </CardContent>
                                        </Card>
                                    </Grid2>
                                )
                            })
                        }

                    </Grid2>
            }
        </Layout>
    );
}

export default IndexRole;
