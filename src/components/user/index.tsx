import { Email, LocationOn } from "@mui/icons-material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Collapse,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { IUserDto } from "../../types/types";

const UserCard = ({ user }: { user: IUserDto }) => {
  const [expandedUser, setExpandedUser] = useState<string | null>(null);

  return (
    <Card
      sx={{
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
        borderRadius: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          p: 2,
        }}
      >
        <Avatar
          src={user.picture.medium}
          alt={user.name.first}
          sx={{ width: 64, height: 64, boxShadow: 2 }}
        />
        <Box sx={{ flex: 1, ml: 2 }}>
          <Typography variant="h6" fontWeight="bold" textAlign={"left"}>
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
        </Box>
        <Button
          endIcon={
            expandedUser === user.email ? (
              <ArrowDropUpIcon />
            ) : (
              <ArrowDropDownIcon />
            )
          }
          variant="text"
          size="small"
          sx={{
            fontSize: "12px",
            alignItems: "center",
          }}
          onClick={() =>
            setExpandedUser(expandedUser === user.email ? null : user.email)
          }
        >
          {expandedUser === user.email ? "hide" : "more"}
        </Button>
      </Box>

      <Collapse in={expandedUser === user.email} sx={{ width: "100%" }}>
        <CardContent sx={{ px: 2, py: 1 }}>
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
