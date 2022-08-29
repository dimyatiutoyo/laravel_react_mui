import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from './src/pages/Login';
import './index.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Dashboard from './src/pages/auth/Dashboard';
import { Provider } from 'react-redux';
import store from './store';
import IndexRole from './src/pages/role/IndexRole';
import IndexUser from './src/pages/user/IndexUser';
import RouteGuard from './src/pages/auth/RouteGuard';
import NotFound from './src/pages/NotFound';
import UserRole from './src/pages/user/UserRole';
import EditRolePermission from './src/pages/role/EditRolePermission';
import IndexPermission from './src/pages/permission/IndexPermission';
import IndexJenisLaporan from './src/pages/jenis_laporan/IndexJenisLaporan';
import IndexIndikator from './src/pages/indikator/IndexIndikator';
import EditUser from './src/pages/user/EditUser';
import CreateUser from './src/pages/user/CreateUser';

const theme = createTheme({
    palette: {
        mode: 'light',
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: '12px',
                },
            }
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    borderRadius: '8px !important',
                },
            }
        },
        MuiInput: {
            defaultProps: {
                disableUnderline: true,
            }
        },
    }
});


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Routes>
                        <Route index path='/' element={
                            <RouteGuard loginOnly={false}>
                                <Login />
                            </RouteGuard>} />
                        <Route path='dashboard' element={
                            <RouteGuard>
                                <Dashboard />
                            </RouteGuard>}
                        />
                        <Route path='role' element={
                            <RouteGuard>
                                <IndexRole />
                            </RouteGuard>}
                        />
                        <Route path='role/:roleId/edit/permission' element={
                            <RouteGuard>
                                <EditRolePermission />
                            </RouteGuard>}
                        />
                        <Route path='/permission' element={
                            <RouteGuard>
                                <IndexPermission />
                            </RouteGuard>}
                        />
                        <Route path='user' element={
                            <RouteGuard>
                                <IndexUser />
                            </RouteGuard>
                        } >
                        </Route>
                        <Route path='indikator' element={
                            <RouteGuard>
                                <IndexIndikator />
                            </RouteGuard>
                        } >
                        </Route>
                        <Route path='/jenis-laporan' element={
                            <RouteGuard>
                                <IndexJenisLaporan />
                            </RouteGuard>
                        } >
                        </Route>
                        <Route path='user/:userId/role' element={
                            <RouteGuard>
                                <UserRole />
                            </RouteGuard>
                        } />
                        <Route path='user/:userId/edit' element={
                            <RouteGuard>
                                <EditUser />
                            </RouteGuard>
                        } />
                        <Route path='user/create' element={
                            <RouteGuard>
                                <CreateUser />
                            </RouteGuard>
                        } />
                        <Route path='*' element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </Provider>
    </React.StrictMode>
);
