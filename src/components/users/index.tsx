import {
  Grid2 as Grid,
  Typography,
  TextField,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

import { IUserDto } from "../../types/types";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../features/store";
import { useState, useEffect } from "react";
import UserCard from "../user";
import { filterUsers } from "../../features/userReducer";

const UsersList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.users.filteredUsers);
  const uniqueCountries = useSelector(
    (state: RootState) => state.users.uniqueCountries
  );

  const [search, setSearch] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");

  useEffect(() => {
    dispatch(filterUsers({ search, selectedCountry }));
  }, [search, selectedCountry, dispatch]);

  return (
    <Box sx={{ my: 2 }}>
      <Typography variant="h4" color="primary" sx={{ mb: 2 }}>
        Users List
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          alignItems: "center",
          mb: 2,
        }}
      >
        <TextField
          label="Search Users"
          variant="outlined"
          sx={{ width: "250px" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FormControl sx={{ m: 1, minWidth: 200 }}>
          <InputLabel id="country-select-label">Filter by Country</InputLabel>
          <Select
            labelId="country-select-label"
            label="Filter by Country"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            <MenuItem value="">All Countries</MenuItem>
            {uniqueCountries.map((country, index) => (
              <MenuItem key={index} value={country}>
                {country}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Grid container spacing={2}>
        {users.map((user: IUserDto) => (
          <Grid size={{ xs: 12, md: 3, sm: 6 }} key={user.email}>
            <UserCard user={user} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default UsersList;
