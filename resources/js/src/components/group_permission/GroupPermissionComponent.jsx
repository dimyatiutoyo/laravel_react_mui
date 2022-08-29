import { Backdrop, Box, Button, Card, CardContent, Chip, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, MenuItem, TextField, Tooltip, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import AddRounded from '@mui/icons-material/AddRounded';
import useSWR from 'swr';
import PermissionChips from '../permission/PermissionChips';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import apiClient from '../../config/apiClient';
import { LoadingButton } from '@mui/lab';
import CreateGroupPermissionComponent from './CreateGroupPermissionComponent';
import { useSWRConfig } from "swr";
import EditGroupPermissionButton from './EditGroupPermissionButton';
import { Close, CloseRounded, DeleteRounded } from '@mui/icons-material';
import useCan from '../../hooks/role_permission/useCan';

const GrupPermissionComponent = forwardRef((props, ref) => {
    const { mutate } = useSWRConfig();
    const canDelete = useCan('delete-permission');
    const canCreateGroupPermission = useCan('create-group-permission');
    const canEdit = useCan('edit-permission');
    const canView = useCan('view-permission');

    const { data, error } = useSWR('/api/group-permission', url => apiClient
        .get(url)
        .then(res => res.data));

    const handleOpenDeleteDialog = (id) => {
        props.openDeleteDialog(id)
    }

    useImperativeHandle(
        ref,
        () => ({
            refreshData() {
                mutate('/api/group-permission')
            }
        })
    );



    if (!data) {
        return (
            <Box sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <CircularProgress color='inherit' />
            </Box>
        )
    }

    if (!canView) {
        return <Backdrop
            sx={{
                color: '#fff',
                // zIndex: (theme) => theme.zIndex.drawer + 1
                display: "flex",
                flexDirection: "column"
            }}
            open={true}
        >
            <Typography variant="h3" fontWeight={"bold"}>403</Typography>
            <Typography>Anda tidak mempunyai hak akses ke menu ini </Typography>
        </Backdrop>
    }

    return (
        <Grid2 container spacing={1}>
            {
                data.map((group, index) => {
                    const { id, name } = group;
                    return (
                        <Grid2 xs={12} sm={12} md={6} lg={4} item key={id}>
                            <Card variant="outlined">
                                <CardContent sx={{
                                    pt: 1
                                }}>
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}>
                                        <Typography variant="body2" fontWeight={'bold'} component="h2">
                                            {name}
                                        </Typography>
                                        <Box>
                                            {
                                                canEdit ?
                                                    <EditGroupPermissionButton id={id} />
                                                    : null
                                            }
                                            {
                                                canDelete ?
                                                    <Tooltip title="delete grup permission" placement="top">
                                                        <IconButton onClick={() => handleOpenDeleteDialog(id)} color="default"><DeleteRounded /></IconButton>
                                                    </Tooltip>
                                                    : null
                                            }

                                        </Box>
                                    </Box>
                                    <Divider sx={{
                                        mb: 2,
                                        mt: 1
                                    }} />
                                    <PermissionChips groupId={group.id} groupName={group.name} permissions={group.permissions} />
                                </CardContent>
                            </Card>
                        </Grid2>)
                })
            }
            {
                canCreateGroupPermission ? <CreateGroupPermissionComponent /> : null
            }
        </Grid2>
    );
});

export default GrupPermissionComponent;
