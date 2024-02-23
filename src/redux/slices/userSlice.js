import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const url = 'https://fakestoreapi.com/auth/login'

export const loginUser = createAsyncThunk('loginUser', async userCredential => {
  const request = await axios.post(url, userCredential)
  const response = await request.data.dat
  localStorage.setItem('user', JSON.stringify(response))
  return response
})

const userSlice = createSlice({
  name: 'users',
  initialState: {
    loading: false,
    user: null,
    error: null
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload
      state.loading = false
      state.error = null
    }),
      builder.addCase(loginUser.pending, state => {
        state.user = null
        state.loading = true
        state.error = null
      }),
      builder.addCase(loginUser.rejected, (state, action) => {
        state.user = null
        state.loading = null
        if (action.error.message === 'Request failed with status code 401') {
          state.error = 'Access Denied! Invalid Credentials'
        } else {
          state.error = action.error.message
        }
      })
  }
})

export default userSlice.reducer
