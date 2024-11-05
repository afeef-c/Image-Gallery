import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';
import { toast } from 'react-toastify';

// Async thunk for fetching images
export const fetchImages = createAsyncThunk('images/fetchImages', async () => {
  const response = await api.get('api/images/');
  return response.data;
});

// Async thunk for uploading images
export const uploadImages = createAsyncThunk('images/uploadImages', async (formData) => {
  const response = await api.post('api/images/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
});

// Async thunk for updating image order
export const updateImageOrder = createAsyncThunk('images/updateImageOrder', async (images) => {
  const response = await api.post('/api/update-image-order/', { images }, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.status === 200) {
    toast.success("Successfully updated");
    return images;
  } else {
    toast.error("Failed to update image order");
    throw new Error("Failed to update image order");
  }
});

export const updateImageTitle = createAsyncThunk('images/updateImageTitle', async ({ id, title }) => {
  const response = await api.put(`/api/images/${id}/`, { title })
  if (response.status === 200) {
    toast.success("Successfully updated");
    return { id, title: response.data.title };
  } else {
    toast.error("Failed to update image order");
    throw new Error("Failed to update image order");
  };
  
});


// Async thunk for deleting an image
export const deleteImage = createAsyncThunk('images/deleteImage', async (id) => {
  await api.delete(`api/images/${id}/`);
  return id;
});

const imageSlice = createSlice({
  name: 'images',
  initialState: {
    images: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchImages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.images = action.payload;
      })
      .addCase(fetchImages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(uploadImages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(uploadImages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.images.push(action.payload);
      })
      .addCase(uploadImages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateImageOrder.fulfilled, (state, action) => {
        state.images = action.payload;
      })
      .addCase(deleteImage.fulfilled, (state, action) => {
        state.images = state.images.filter((image) => image.id !== action.payload);
      });
  },
});

export default imageSlice.reducer;
