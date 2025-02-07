import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { IUserDto, IRandomuserResponseDto } from "../types/types";

interface UserState {
  users: IUserDto[];
  filteredUsers: IUserDto[];
  uniqueCountries: string[];
  countryCount: Record<string, number>;
  averageAge: string;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  filteredUsers: [],
  uniqueCountries: [],
  countryCount: {},
  averageAge: "0",
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get<IRandomuserResponseDto>(
    "https://randomuser.me/api/?results=10"
  );
  return response.data.results;
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    filterUsers: (
      state,
      action: PayloadAction<{ search: string; selectedCountry: string }>
    ) => {
      const { search, selectedCountry } = action.payload;
      state.filteredUsers = state.users.filter(
        (user) =>
          (`${user.name.first} ${user.name.last}`
            .toLowerCase()
            .includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase())) &&
          (selectedCountry ? user.location.country === selectedCountry : true)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUsers.fulfilled,
        (state, action: PayloadAction<IUserDto[]>) => {
          state.loading = false;
          state.users = action.payload;
          state.filteredUsers = action.payload;
          state.uniqueCountries = Array.from(
            new Set(action.payload.map((user) => user.location.country))
          );

          // Calculate country count
          state.countryCount = action.payload.reduce(
            (acc: Record<string, number>, user) => {
              acc[user.location.country] =
                (acc[user.location.country] || 0) + 1;
              return acc;
            },
            {}
          );

          // Calculate average age
          state.averageAge = action.payload.length
            ? (
                action.payload.reduce((sum, user) => sum + user.dob.age, 0) /
                action.payload.length
              ).toFixed(1)
            : "0";
        }
      )
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch users.";
      });
  },
});

export const { filterUsers } = userSlice.actions;
export default userSlice.reducer;
