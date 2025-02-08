import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Stats from "../../components/stats";
import UsersList from "../../components/users";
import { AppDispatch, RootState } from "../../features/store";
import { fetchUsers } from "../../features/userReducer";

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.users.users);

  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchUsers());
    }
  }, [dispatch, users.length]);

  return (
    <Box>
      <Typography variant="h4" color="primary" sx={{ mb: 2 }}>
        Lookinsure
      </Typography>
      <Stats />
      <UsersList />
    </Box>
  );
};

export default Dashboard;
