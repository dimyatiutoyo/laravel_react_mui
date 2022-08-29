import { useSelector } from "react-redux";

const useCan = (permissionCheck = null) => {
    const permissions = useSelector(state => state.permission);
    // const permissions = JSON.parse(localStorage.getItem('permissions'));
    const permissionCan = permissions.includes(permissionCheck);
    return permissionCan;
}

export default useCan;
