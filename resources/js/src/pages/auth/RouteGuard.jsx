import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { CircularProgress } from "@mui/material";

function RouteGuard({ children, loginOnly = true }) {
    const user = localStorage.getItem("user");
    const navigate = useNavigate();

    useEffect(() => {

        if (!user && loginOnly) {
            navigate("/");
        }

        if (user && !loginOnly) {
            navigate("/dashboard");
        }
    }, []);


    return (
        <>
            {children}
        </>
    );
}

export default RouteGuard;
