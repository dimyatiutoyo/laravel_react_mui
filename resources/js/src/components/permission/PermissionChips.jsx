import { Cancel } from "@mui/icons-material";
import { Alert, Chip, CircularProgress, Snackbar } from "@mui/material";
import { useState } from "react";
import PermissionChip from "./PermissionChip";
import CreatePermissionChipComponent from "./CreatePermissionChipComponent";
import useCan from "../../hooks/role_permission/useCan";

const PermissionChips = ({ permissions, groupId, groupName, ...props }) => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarVariant, setSnackbarVariant] = useState("success");
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [isSubmtting, setSubmitting] = useState(false);
    const canCreate = useCan('create-permission');

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    }

    const handleOpenSnackbar = () => {
        setOpenSnackbar(true);
    }

    return (
        <>
            {
                permissions.map((permission, index) => {
                    const { id, name, group_id } = permission;
                    return (
                        <PermissionChip key={'chip' + index} id={id} groupId={groupId} name={name} groupName={groupName} />
                    );
                })
            }
            {
                canCreate ? <CreatePermissionChipComponent groupId={groupId} groupName={groupName} /> : null
            }

        </>
    );
};

export default PermissionChips;
