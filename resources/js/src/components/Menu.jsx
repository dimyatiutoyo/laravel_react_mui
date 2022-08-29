import { CircularProgress, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import useSWR from 'swr';
import apiClient from '../config/apiClient';
import { useDispatch } from "react-redux";
import { refreshPermission } from '../features/permission/permissionSlice';


function Menu({ menus = [] }) {
    const dispatch = useDispatch();
    const { data: permissions, error } = useSWR(
        `/api/auth/user/permissions`,
        url => apiClient
            .get(url)
            .then(res => {
                localStorage.setItem('permissions', JSON.stringify(res.data));
                dispatch(refreshPermission({}));
                return res.data;
            }));

    if (!permissions) {
        return <List sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <CircularProgress size={'16px'} />
        </List>;
    }
    return (
        <List>
            {menus.map((menu, index) => {
                let pattern = new RegExp('^' + menu.active);
                let isActive = pattern.test(window.location.pathname);
                if (menu.can.find(can => {
                    return permissions.includes(can);
                })) {
                    return (
                        <Tooltip key={index} title={menu.title} placement="right">
                            <ListItem disablePadding sx={{ display: 'block' }}>
                                <Link to={menu.to} style={{
                                    textDecoration: 'none',
                                    color: 'inherit',
                                }}>
                                    <ListItemButton
                                        selected={isActive}
                                        sx={{
                                            minHeight: 48,
                                            justifyContent: open ? 'initial' : 'center',
                                            px: 2.5,
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: open ? 3 : 'auto',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            {menu.icon}
                                        </ListItemIcon>
                                        <ListItemText title={menu.title} primary={menu.title} sx={{ opacity: open ? 1 : 0 }} />
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                        </Tooltip>
                    )
                }

            })
            }
        </List >
    );
}

export default Menu;
