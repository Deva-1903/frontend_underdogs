import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import allUsersService from "../allUsers/allUsersService";

const initialState = {
  users: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getAllUsers = createAsyncThunk(
  "allUsers/getAll",
  async (searchParams, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.admin.token;
      return await allUsersService.getAllUsers(searchParams, token);
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

export const getAttendancesByDate = createAsyncThunk(
  "attendances/getByDate",
  async (searchParams, thunkAPI) => {
    try {
      return await allUsersService.getAttendancesByDate(searchParams);
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

export const getFeesDetails = createAsyncThunk(
  "feesDetails/getAll",
  async (searchParams, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.admin.token;
      return await allUsersService.getFeesDetailsByDate(searchParams, token);
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

export const getContactForms = createAsyncThunk(
  "contactForms/get",
  async (searchParams, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.admin.token;
      const response = await allUsersService.contactFormService(
        searchParams,
        token
      );
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

export const getAllPendingFees = createAsyncThunk(
  "fees/getAllPendingFees",
  async (searchParams, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.admin.token;
      return await allUsersService.getAllPendingFees(searchParams, token);
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

export const allUsersSlice = createSlice({
  name: "allUsers",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload.users;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAttendancesByDate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAttendancesByDate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
      })
      .addCase(getAttendancesByDate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getFeesDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeesDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
      })
      .addCase(getFeesDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getContactForms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getContactForms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
      })
      .addCase(getContactForms.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllPendingFees.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPendingFees.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
      })
      .addCase(getAllPendingFees.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = allUsersSlice.reducer;
export default allUsersSlice.reducer;
