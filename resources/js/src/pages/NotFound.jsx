import { Paper, Typography } from "@mui/material";

function NotFound() {
    return (
        <Paper sx={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <Typography variant="h3">
                404 Not Found
            </Typography>
            <Typography variant="h6">
                Halaman tidak ditemukan
            </Typography>
        </Paper>
    );
}

export default NotFound;
