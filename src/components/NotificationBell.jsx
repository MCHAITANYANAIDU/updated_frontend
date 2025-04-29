import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  IconButton,
  Badge,
  Menu,
  MenuItem,
  ListItemText,
  Typography,
  Box,
  Divider,
  Button,
  CircularProgress,
  Tooltip,
  Fade,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { toast } from "react-toastify";
import { formatDistanceToNow } from "date-fns";

const NotificationBell = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch notifications for the user
  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8732/api/notifications/user/${userId}`
      );
      setNotifications(response.data || []);
    } catch (e) {
      toast.error("Failed to load notifications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) fetchNotifications();
    // Poll for new notifications every 45 seconds
    const interval = setInterval(() => {
      if (userId) fetchNotifications();
    }, 45000);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [userId]);

  // Mark notification as read
  const handleMarkAsRead = async (notificationId) => {
    try {
      await axios.put(
        `http://localhost:8732/api/notifications/${notificationId}/read`
      );
      fetchNotifications();
    } catch (e) {
      toast.error("Failed to mark as read");
    }
  };

  // Mark all as read
  const handleMarkAllAsRead = async () => {
    try {
      await Promise.all(
        notifications
          .filter((n) => !n.read)
          .map((n) =>
            axios.put(`http://localhost:8732/api/notifications/${n.id}/read`)
          )
      );
      fetchNotifications();
    } catch (e) {
      toast.error("Failed to mark all as read");
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <>
      <Tooltip title="Notifications">
        <IconButton
          color="inherit"
          onClick={(e) => setAnchorEl(e.currentTarget)}
          aria-label="show notifications"
          sx={{
            position: "relative",
            "&:hover": {
              bgcolor: "primary.50",
            },
          }}
        >
          <Badge
            badgeContent={unreadCount}
            color="error"
            sx={{
              "& .MuiBadge-badge": {
                animation: unreadCount ? "pulse-badge 1.2s infinite" : "none",
                "@keyframes pulse-badge": {
                  "0%": { boxShadow: "0 0 0 0 rgba(255,0,0,0.7)" },
                  "70%": { boxShadow: "0 0 0 8px rgba(255,0,0,0)" },
                  "100%": { boxShadow: "0 0 0 0 rgba(255,0,0,0)" },
                },
              },
            }}
          >
            <NotificationsIcon fontSize="medium" />
          </Badge>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          style: { minWidth: 360, borderRadius: 16, padding: 0 },
          elevation: 3,
        }}
        TransitionComponent={Fade}
      >
        <Box
          sx={{
            px: 2,
            pt: 2,
            pb: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            Notifications
          </Typography>
          <Button
            size="small"
            startIcon={<DoneAllIcon />}
            onClick={handleMarkAllAsRead}
            disabled={unreadCount === 0}
            sx={{
              textTransform: "none",
              color: unreadCount === 0 ? "grey.400" : "primary.main",
            }}
          >
            Mark all as read
          </Button>
        </Box>
        <Divider />
        {loading ? (
          <Box sx={{ p: 3, display: "flex", justifyContent: "center" }}>
            <CircularProgress size={28} />
          </Box>
        ) : notifications.length === 0 ? (
          <MenuItem disabled>
            <ListItemText
              primary="No notifications"
              primaryTypographyProps={{
                color: "text.secondary",
                align: "center",
              }}
            />
          </MenuItem>
        ) : (
          notifications.map((notification) => (
            <MenuItem
              key={notification.id}
              selected={!notification.read}
              onClick={() => {
                if (!notification.read) handleMarkAsRead(notification.id);
                setAnchorEl(null);
              }}
              sx={{
                alignItems: "flex-start",
                background: !notification.read
                  ? "rgba(25, 118, 210, 0.08)"
                  : "inherit",
                borderLeft: !notification.read
                  ? "4px solid #1976d2"
                  : "4px solid transparent",
                transition: "background 0.2s, border 0.2s",
                mb: 0.5,
                borderRadius: 2,
                "&:hover": {
                  background: "rgba(25, 118, 210, 0.18)",
                },
              }}
            >
              <ListItemText
                primary={
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: !notification.read ? 700 : 400,
                      color: !notification.read
                        ? "primary.main"
                        : "text.primary",
                    }}
                  >
                    {notification.message}
                  </Typography>
                }
                secondary={
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mt: 0.5, display: "block" }}
                  >
                    {formatDistanceToNow(new Date(notification.createdAt), {
                      addSuffix: true,
                    })}
                  </Typography>
                }
              />
            </MenuItem>
          ))
        )}
        <Box sx={{ height: 8 }} />
      </Menu>
    </>
  );
};

export default NotificationBell;
