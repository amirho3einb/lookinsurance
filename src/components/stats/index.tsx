import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PeopleIcon from "@mui/icons-material/People";
import {
  Box,
  Card,
  CardContent,
  Grid2 as Grid,
  Typography,
} from "@mui/material";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { RootState } from "../../features/store";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Stats = () => {
  const users = useSelector((state: RootState) => state.users.users);
  const countryCount = useSelector(
    (state: RootState) => state.users.countryCount
  );
  const averageAge = useSelector((state: RootState) => state.users.averageAge);

  const chartData = {
    labels: Object.keys(countryCount),
    datasets: [
      {
        label: "Users by Country",
        data: Object.values(countryCount),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#8BC34A",
          "#FF9800",
          "#8E44AD",
          "#2ECC71",
          "#F39C12",
        ],
      },
    ],
  };

  return (
    <Grid container spacing={2} alignItems="stretch" justifyContent="center">
      <Grid size={{ xs: 12, md: 3, sm: 6 }}>
        <Card
          sx={{
            textAlign: "center",
            p: 2,
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 4,
          }}
        >
          <CardContent>
            <PeopleIcon sx={{ fontSize: 40, color: "primary.main" }} />
            <Typography variant="h6" fontWeight="bold" mt={1}>
              Total Users
            </Typography>
            <Typography variant="h5" color="primary">
              {users.length}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, md: 3, sm: 6 }}>
        <Card
          sx={{
            textAlign: "center",
            p: 2,
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 4,
          }}
        >
          <CardContent>
            <CalendarTodayIcon sx={{ fontSize: 40, color: "secondary.main" }} />
            <Typography variant="h6" fontWeight="bold" mt={1}>
              Average Age
            </Typography>
            <Typography variant="h5" color="secondary">
              {averageAge} years
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, md: 6, sm: 12 }}>
        <Card
          sx={{
            p: 2,
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            height: "420px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            borderRadius: 4,
          }}
        >
          <CardContent>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Users by Country
            </Typography>
            <Box sx={{ height: "320px" }}>
              <Bar
                data={chartData}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Stats;
