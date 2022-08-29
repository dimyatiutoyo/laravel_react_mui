import { Card, CardContent, Checkbox, FormControlLabel, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2"
import { useEffect } from "react";
import PermissionCheckbox from "./PermissionCheckbox";

function GroupPermission({ name, id, permissions, ...props }) {

    return (
        <Grid2 item xs={12} sm={12} md={6} lg={4} key={name}>
            <Card variant="outlined">
                <CardContent>
                    <Typography
                        fontWeight={'bold'}
                        variant="body1">
                        {name}
                    </Typography>
                    {
                        permissions.map((permission, index) => {
                            return (
                                <PermissionCheckbox key={index} id={permission.id} name={permission.name} display_name={permission.display_name} />
                            )
                        })
                    }
                </CardContent>
            </Card>
        </Grid2>
    );
}

export default GroupPermission;
