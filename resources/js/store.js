import { configureStore } from '@reduxjs/toolkit';
import userReducer from './src/features/user/userSlice';
import permissionReducer from './src/features/permission/permissionSlice';
import drawerReducer from './src/features/layout/drawerSlice';
export default configureStore({
  reducer: {
    user: userReducer,
    drawer: drawerReducer,
    permission: permissionReducer
  }
});
