import { Backdrop, Checkbox, CircularProgress, FormControlLabel, Typography } from "@mui/material";
import { useState } from "react";
import apiClient from "../../config/apiClient";
import { useParams } from "react-router-dom";
import useSWR from "swr";

function PermissionCheckbox({ id, name, display_name, ...props }) {
    const { roleId } = useParams();
    const permissionsLS = JSON.parse(localStorage.getItem('permissions'));
    const { data: roleWithPermissions, error: roleWithPermissionsError } = useSWR(`/api/role/${roleId}`, url => apiClient.get(url).then(res => res.data));

    const [isSubmitting, setSubmitting] = useState(false);

    const handleChange = async (id, event) => {
        const data = {
            id: id,
            checked: event.target.checked,
        }

        setSubmitting(true);
        try {
            const response = await apiClient.put(`/api/role/${roleId}/permission`, data);
            console.log(response);
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitting(false);
        }
    }

    if (!roleWithPermissions) {
        return (
            <Typography>Loading...</Typography>
        )
    }
    const isChecked = roleWithPermissions.permissions.find(permission => permission.name == name) ? true : false;
    return (
        <>
            <FormControlLabel
                {...props}
                label={display_name}
                control={
                    <Checkbox
                        name={`${id}`}
                        onChange={(e) => handleChange(id, e)}
                        defaultChecked={isChecked}
                    />
                }
            />
            <Backdrop
                sx={{
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={isSubmitting}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    );
}

export default PermissionCheckbox;
