import { LockOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
    Container,
    CssBaseline,
    Paper,
    Box,
    Avatar,
    Typography,
    TextField,
    FormControlLabel,
    Checkbox,
    Button,
    Grid,
    Link,
    Card,
    CardContent,
    Backdrop,
    CircularProgress,
    Alert,
    CardActions
} from "@mui/material";
import { useState } from "react";

import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import apiClient from "../config/apiClient";
import { setUser } from "../features/user/userSlice";

function Login() {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {

            await apiClient.get("/sanctum/csrf-cookie");
            await apiClient.post("/login", {
                email: email,
                password: password,
            });

            const { data } = await apiClient.get('/api/auth/user');
            dispatch(
                setUser(data)
            );
            navigate("/dashboard");
        } catch (error) {
            setError(error?.response?.data?.message);
        } finally {
            setLoading(false)
        }
    }
    return (
        <Paper elevation={0} sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f0f0f0',
        }}>
            {
                error &&
                <Alert sx={{
                    marginBottom: '1rem',
                }} severity="error">{error}</Alert>
            }
            <Container component="main" maxWidth="xs">
                <Card variant="outlined">
                    <CardContent sx={{
                        padding: 3,
                    }}>
                        <CssBaseline />
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockOutlined />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign in
                            </Typography>
                            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    placeholder="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    placeholder="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="Remember me"
                                />
                                <LoadingButton
                                    type="submit"
                                    loading={loading}
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign In
                                </LoadingButton>
                                <Grid container>
                                    <Grid item xs>
                                        <Link href="#" variant="body2">
                                            Forgot password?
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link href="#" variant="body2">
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </CardContent>
                    <CardActions></CardActions>
                </Card>
            </Container>
        </Paper >
    );
}

export default Login;
