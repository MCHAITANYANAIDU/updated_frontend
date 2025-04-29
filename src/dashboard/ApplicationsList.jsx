import {
  AttachMoney,
  FilterList,
  Home,
  PictureAsPdf,
  Score,
  Work,
} from "@mui/icons-material";
import {
  alpha,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip as MuiTooltip,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

const ApplicationsList = ({
  applications,
  user,
  onFetchDocuments,
  onFetchEMIs,
  onStatusUpdate,
  onDisburse,
  statusFilter,
  setStatusFilter,
  filterAnchorEl,
  setFilterAnchorEl,
  statusFilters,
  searchQuery,
  setSearchQuery,
  theme,
}) => {
  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 3,
        background: theme.palette.background.paper,
        boxShadow: theme.shadows[2],
        mb: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Loan Applications
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<FilterList />}
            onClick={(e) => setFilterAnchorEl(e.currentTarget)}
            sx={{ borderRadius: 3 }}
          >
            Filter
          </Button>
          {user.role !== "ADMIN" && (
            <Button
              variant="contained"
              color="primary"
              sx={{ borderRadius: 3 }}
              href="/apply-loan"
            >
              New Application
            </Button>
          )}
        </Box>
      </Box>

      {/* Search Bar */}
      <Box sx={{ mb: 2, maxWidth: 300 }}>
        <TextField
          fullWidth
          size="small"
          variant="outlined"
          placeholder="Search by name or purpose"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            sx: { borderRadius: 2 },
          }}
        />
      </Box>

      {/* Filter Menu */}
      <Menu
        anchorEl={filterAnchorEl}
        open={Boolean(filterAnchorEl)}
        onClose={() => setFilterAnchorEl(null)}
        PaperProps={{
          elevation: 3,
          sx: {
            mt: 1,
            minWidth: 200,
            borderRadius: 3,
          },
        }}
      >
        {statusFilters.map((filter) => (
          <MenuItem
            key={filter.value}
            selected={statusFilter === filter.value}
            onClick={() => {
              setStatusFilter(filter.value);
              setFilterAnchorEl(null);
            }}
          >
            <ListItemIcon>{filter.icon}</ListItemIcon>
            <ListItemText>{filter.label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>

      {applications.length === 0 ? (
        <Box
          sx={{
            p: 8,
            textAlign: "center",
            borderRadius: 2,
            backgroundColor: alpha(theme.palette.action.hover, 0.05),
          }}
        >
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No applications found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {searchQuery
              ? "Try a different search term"
              : statusFilter !== "ALL"
              ? "No applications with this status"
              : "You have no applications yet"}
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          <AnimatePresence>
            {applications.map((app) => (
              <Grid item xs={12} sm={6} md={4} key={app.applicationId}>
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -5 }}
                >
                  <Card
                    sx={{
                      borderRadius: 3,
                      height: "100%",
                      borderLeft: `4px solid ${
                        app.status === "APPROVED"
                          ? theme.palette.success.main
                          : app.status === "REJECTED"
                          ? theme.palette.error.main
                          : app.status === "DISBURSED"
                          ? theme.palette.primary.main
                          : app.status === "CLOSED"
                          ? theme.palette.info.main
                          : theme.palette.warning.main
                      }`,
                      boxShadow: theme.shadows[1],
                      transition: "all 0.3s ease",
                      "&:hover": {
                        boxShadow: theme.shadows[4],
                      },
                    }}
                  >
                    <CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mb: 2,
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: 600,
                            color: theme.palette.text.primary,
                          }}
                        >
                          {app.name}
                        </Typography>
                        <Chip
                          label={app.status}
                          size="small"
                          sx={{
                            borderRadius: 2,
                            fontWeight: 500,
                            backgroundColor:
                              app.status === "APPROVED"
                                ? alpha(theme.palette.success.main, 0.1)
                                : app.status === "REJECTED"
                                ? alpha(theme.palette.error.main, 0.1)
                                : app.status === "DISBURSED"
                                ? alpha(theme.palette.primary.main, 0.1)
                                : app.status === "CLOSED"
                                ? alpha(theme.palette.info.main, 0.1)
                                : alpha(theme.palette.warning.main, 0.1),
                            color:
                              app.status === "APPROVED"
                                ? theme.palette.success.main
                                : app.status === "REJECTED"
                                ? theme.palette.error.main
                                : app.status === "DISBURSED"
                                ? theme.palette.primary.main
                                : app.status === "CLOSED"
                                ? theme.palette.info.main
                                : theme.palette.warning.main,
                          }}
                        />
                      </Box>

                      <Stack spacing={1.5} sx={{ mb: 2 }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Work
                            sx={{
                              mr: 1,
                              color: theme.palette.text.secondary,
                              fontSize: 20,
                            }}
                          />
                          <Typography variant="body2">
                            {app.profession}
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Home
                            sx={{
                              mr: 1,
                              color: theme.palette.text.secondary,
                              fontSize: 20,
                            }}
                          />
                          <Typography variant="body2">{app.purpose}</Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <AttachMoney
                            sx={{
                              mr: 1,
                              color: theme.palette.text.secondary,
                              fontSize: 20,
                            }}
                          />
                          <Typography variant="body2">
                            ₹{Number(app.loanAmount).toLocaleString()}
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Score
                            sx={{
                              mr: 1,
                              color: theme.palette.text.secondary,
                              fontSize: 20,
                            }}
                          />
                          <Typography variant="body2">
                            Credit Score: {app.creditScore}
                          </Typography>
                        </Box>
                      </Stack>

                      {/* Admin actions */}
                      {user.role === "ADMIN" && (
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 1,
                            mt: 2,
                          }}
                        >
                          <MuiTooltip
                            title="View all user-submitted PDFs"
                            arrow
                          >
                            <Button
                              variant="outlined"
                              startIcon={<PictureAsPdf />}
                              onClick={async () => {
                                await onFetchDocuments(app);
                              }}
                              sx={{
                                borderRadius: 2,
                                textTransform: "none",
                                mb: 1,
                                background:
                                  "linear-gradient(90deg, #f8fafc 0%, #e0e7ef 100%)",
                              }}
                              color="secondary"
                            >
                              View Documents
                            </Button>
                          </MuiTooltip>
                          {app.status === "PENDING" && (
                            <Box sx={{ display: "flex", gap: 1 }}>
                              <Button
                                variant="contained"
                                color="success"
                                size="small"
                                onClick={() =>
                                  onStatusUpdate(app.applicationId, "APPROVED")
                                }
                                sx={{
                                  borderRadius: 2,
                                  flex: 1,
                                  textTransform: "none",
                                }}
                              >
                                Approve
                              </Button>
                              <Button
                                variant="outlined"
                                color="error"
                                size="small"
                                onClick={() =>
                                  onStatusUpdate(app.applicationId, "REJECTED")
                                }
                                sx={{
                                  borderRadius: 2,
                                  flex: 1,
                                  textTransform: "none",
                                }}
                              >
                                Reject
                              </Button>
                            </Box>
                          )}
                          {app.status === "APPROVED" && (
                            <Button
                              variant="contained"
                              color="primary"
                              size="small"
                              onClick={() => onDisburse(app.applicationId)}
                              sx={{
                                borderRadius: 2,
                                width: "100%",
                                textTransform: "none",
                              }}
                            >
                              Disburse Loan
                            </Button>
                          )}
                        </Box>
                      )}

                      {/* USER EMI REPAYMENT BUTTON */}
                      {user.role !== "ADMIN" && app.status === "DISBURSED" && (
                        <Button
                          variant="outlined"
                          color="primary"
                          size="small"
                          sx={{ borderRadius: 2, mt: 1 }}
                          onClick={() => onFetchEMIs(app.applicationId)}
                        >
                          View/Pay EMIs
                        </Button>
                      )}
                      {/* Show a chip for CLOSED loans */}
                      {user.role !== "ADMIN" && app.status === "CLOSED" && (
                        <Chip
                          label="Loan Closed"
                          color="info"
                          size="small"
                          sx={{ mt: 1, borderRadius: 2 }}
                        />
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </AnimatePresence>
        </Grid>
      )}
    </Paper>
  );
};

export default ApplicationsList;
