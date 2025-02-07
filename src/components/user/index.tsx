import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Collapse,
  Typography,
} from "@mui/material";
import { Email, LocationOn } from "@mui/icons-material";
import { useState } from "react";
import { IUserDto } from "../../types/types";

const UserCard = ({ user }: { user: IUserDto }) => {
  const [expandedUser, setExpandedUser] = useState<string | null>(null);

  return (
    <Card
      sx={{
        p: 2,
        boxShadow: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
        gap: 2,
        borderRadius: 3,
        minHeight: 360,
      }}
    >
      <Avatar
        src={user.picture.medium}
        alt={user.name.first}
        sx={{ width: 64, height: 64, boxShadow: 2 }}
      />
      <Typography variant="h6" fontWeight="bold">
        {user.name.first} {user.name.last}
      </Typography>
      <Box display="flex" alignItems="center" gap={1}>
        <Email fontSize="small" color="primary" />
        <Typography variant="body2" color="textSecondary">
          {user.email}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" gap={1}>
        <LocationOn fontSize="small" color="secondary" />
        <Typography variant="body2" color="textSecondary">
          {user.location.country}
        </Typography>
      </Box>
      <Button
        variant="text"
        size="small"
        onClick={() =>
          setExpandedUser(expandedUser === user.email ? null : user.email)
        }
      >
        {expandedUser === user.email ? "Hide Details" : "View"}
      </Button>
      <Collapse in={expandedUser === user.email} sx={{ width: "100%" }}>
        <CardContent sx={{ p: 0 }}>
          <Typography textAlign={"left"} variant="body2">
            Phone: {user.phone}
          </Typography>
          <Typography textAlign={"left"} variant="body2">
            Address: {user.location.street.number} {user.location.street.name},{" "}
            {user.location.city}, {user.location.state},{" "}
            {user.location.postcode}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default UserCard;
