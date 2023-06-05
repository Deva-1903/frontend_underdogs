import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminService from "../admins/adminService";

const initialState = {
  admins: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getAdmins = createAsyncThunk(
  "admins/get",
  async (searchParams, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.admin.token;
      const response = await adminService.getAllAdmins(searchParams, token);
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const adminSlice = createSlice({
  name: "admins",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder

      .addCase(getAdmins.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAdmins.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.admins = action.payload;
      })
      .addCase(getAdmins.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = adminSlice.reducer;
export default adminSlice.reducer;
