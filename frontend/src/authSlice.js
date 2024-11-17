import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ACCESS_TOKEN, REFRESH_TOKEN } from './constants';
import { decodeToken } from './utils/decodeToken';
import api from './api';

// Login action
export const loginUser = createAsyncThunk('auth/loginUser', async ({ username, password }, thunkAPI) => {
  try {
    const response = await api.post('/api/login/', { username, password });
    const { access, refresh } = response.data;
    localStorage.setItem(ACCESS_TOKEN, access);
    localStorage.setItem(REFRESH_TOKEN, refresh);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || 'Invalid login');
  }
});

// Fetch user details action
export const fetchUserDetails = createAsyncThunk('auth/fetchUserDetails', async (_, thunkAPI) => {
  try {
    const response = await api.get('/api/profile/');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || 'Failed to fetch user details');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authTokens: localStorage.getItem(ACCESS_TOKEN) ? {
      access: localStorage.getItem(ACCESS_TOKEN),
      refresh: localStorage.getItem(REFRESH_TOKEN)
    } : null,
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    loading: false,
    error: null
  },
  reducers: {
    setAuthTokens: (state, action) => {
      state.authTokens = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logoutUser: (state) => {
      state.authTokens = null;
      state.user = null;
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem(REFRESH_TOKEN);
      localStorage.removeItem('user');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.authTokens = action.payload;
        state.user = decodeToken(action.payload.access) || null;
        state.loading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
        state.loading = false;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { logoutUser, setAuthTokens, setUser } = authSlice.actions;

export default authSlice.reducer;
