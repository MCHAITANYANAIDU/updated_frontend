import React from "react";
import {
  Paper,
  Typography,
  Grid,
  Box,
  useTheme,
  alpha,
  CircularProgress,
  Stack,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import CancelIcon from "@mui/icons-material/Cancel";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TimelineIcon from "@mui/icons-material/Timeline";
import BarChartIcon from "@mui/icons-material/BarChart";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart as ReBarChart,
  Bar,
} from "recharts";

// Status Card Styles
const statCardSx = (color, theme) => ({
  p: 2,
  borderRadius: 3,
  background: alpha(color, 0.07),
  color: color,
  boxShadow: "0 2px 8px 0 rgba(31, 38, 135, 0.10)",
  display: "flex",
  alignItems: "center",
  gap: 2,
});

const ChartsSection = ({
  applications,
  theme,
  getStatusData,
  getMonthlyData,
  getPurposeData,
  userRole, // <-- pass userRole here!
  userName, // optional, for user greeting
}) => {
  const muiTheme = useTheme();
  const chartTheme = theme || muiTheme;

  // Status counts
  const statusData = getStatusData();
  const total = statusData.reduce((sum, s) => sum + s.value, 0);
  const approvedPendingDisbursal = statusData.find((s) => s.name === "Approved")?.value || 0;
  const disbursed = statusData.find((s) => s.name === "Disbursed")?.value || 0;
  const totalApproved = approvedPendingDisbursal + disbursed;
  const pending = statusData.find((s) => s.name === "Pending")?.value || 0;
  const rejected = statusData.find((s) => s.name === "Rejected")?.value || 0;
  const approvalRate = total ? Math.round((totalApproved / total) * 100) : 0;

  // Admin-specific: Top 3 Loan Purposes
  const topPurposes = getPurposeData()
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 3);

  // User-specific: Personalized greeting
  const greeting = userName ? `Welcome, ${userName}!` : "Welcome!";

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {/* --- ADMIN DASHBOARD --- */}
      {userRole === "ADMIN" ? (
        <>
          {/* Status Cards */}
          <Grid item xs={12} md={3}>
            <Stack spacing={2}>
              <Paper sx={statCardSx(chartTheme.palette.success.main, chartTheme)}>
                <CheckCircleIcon color="success" fontSize="large" />
                <Box>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Approved (Total)
                  </Typography>
                  <Typography variant="h5" fontWeight={700}>
                    {totalApproved}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {approvedPendingDisbursal} pending disbursal
                  </Typography>
                </Box>
              </Paper>
              <Paper sx={statCardSx(chartTheme.palette.primary.main, chartTheme)}>
                <AttachMoneyIcon color="primary" fontSize="large" />
                <Box>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Disbursed
                  </Typography>
                  <Typography variant="h5" fontWeight={700}>
                    {disbursed}
                  </Typography>
                </Box>
              </Paper>
              <Paper sx={statCardSx(chartTheme.palette.warning.main, chartTheme)}>
                <PendingIcon color="warning" fontSize="large" />
                <Box>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Pending
                  </Typography>
                  <Typography variant="h5" fontWeight={700}>
                    {pending}
                  </Typography>
                </Box>
              </Paper>
              <Paper sx={statCardSx(chartTheme.palette.error.main, chartTheme)}>
                <CancelIcon color="error" fontSize="large" />
                <Box>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Rejected
                  </Typography>
                  <Typography variant="h5" fontWeight={700}>
                    {rejected}
                  </Typography>
                </Box>
              </Paper>
            </Stack>
          </Grid>
          {/* Monthly Trends Area Chart */}
          <Grid item xs={12} md={5}>
            <Paper sx={{
              p: 3,
              borderRadius: 4,
              height: "100%",
              background: `linear-gradient(135deg, ${alpha(chartTheme.palette.primary.light, 0.08)}, ${alpha(chartTheme.palette.background.paper, 0.95)})`,
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.10)",
              transition: "box-shadow 0.3s, transform 0.3s",
              "&:hover": {
                boxShadow: "0 12px 40px 0 rgba(31, 38, 135, 0.18)",
                transform: "translateY(-4px) scale(1.01)",
              },
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}>
              <Box display="flex" alignItems="center" mb={2}>
                <TimelineIcon sx={{ color: chartTheme.palette.success.main, mr: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Applications & Approvals Over Time
                </Typography>
              </Box>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart
                  data={getMonthlyData()}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={chartTheme.palette.divider}
                  />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="applications"
                    stackId="1"
                    stroke={chartTheme.palette.primary.main}
                    fill={`url(#colorApps)`}
                    isAnimationActive
                  />
                  <Area
                    type="monotone"
                    dataKey="approved"
                    stackId="2"
                    stroke={chartTheme.palette.success.main}
                    fill={`url(#colorApproved)`}
                    isAnimationActive
                  />
                  <defs>
                    <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={chartTheme.palette.primary.light} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={chartTheme.palette.primary.light} stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="colorApproved" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={chartTheme.palette.success.light} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={chartTheme.palette.success.light} stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          {/* Top Purposes Bar Chart */}
          <Grid item xs={12} md={4}>
            <Paper sx={{
              p: 3,
              borderRadius: 4,
              height: "100%",
              background: `linear-gradient(135deg, ${alpha(chartTheme.palette.primary.light, 0.08)}, ${alpha(chartTheme.palette.background.paper, 0.95)})`,
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.10)",
              transition: "box-shadow 0.3s, transform 0.3s",
              "&:hover": {
                boxShadow: "0 12px 40px 0 rgba(31, 38, 135, 0.18)",
                transform: "translateY(-4px) scale(1.01)",
              },
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}>
              <Box display="flex" alignItems="center" mb={2}>
                <BarChartIcon sx={{ color: chartTheme.palette.info.main, mr: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Top Loan Purposes
                </Typography>
              </Box>
              <ResponsiveContainer width="100%" height={250}>
                <ReBarChart data={topPurposes}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={chartTheme.palette.divider}
                  />
                  <XAxis dataKey="purpose" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="amount"
                    fill={`url(#colorPurpose)`}
                    isAnimationActive
                    radius={[8, 8, 0, 0]}
                  />
                  <defs>
                    <linearGradient id="colorPurpose" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={chartTheme.palette.info.main} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={chartTheme.palette.info.light} stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                </ReBarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </>
      ) : (
      /* --- USER DASHBOARD --- */
        <>
          {/* User greeting and approval rate */}
          <Grid item xs={12} md={4}>
            <Stack spacing={2}>
              <Paper sx={{
                p: 2,
                borderRadius: 3,
                background: alpha(chartTheme.palette.primary.main, 0.07),
                color: chartTheme.palette.primary.main,
                boxShadow: "0 2px 8px 0 rgba(31, 38, 135, 0.10)",
                textAlign: "center",
              }}>
                <Typography variant="subtitle1" fontWeight={700} mb={1}>
                  {greeting}
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  Here's a quick overview of your loan applications.
                </Typography>
                <Typography variant="subtitle2" fontWeight={600} mb={1}>
                  Approval Rate
                </Typography>
                <Box position="relative" display="inline-flex" mb={2}>
                  <CircularProgress
                    variant="determinate"
                    value={approvalRate}
                    size={64}
                    thickness={5}
                    color="success"
                  />
                  <Box
                    top={0}
                    left={0}
                    bottom={0}
                    right={0}
                    position="absolute"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Typography variant="h6" fontWeight={700}>
                      {approvalRate}%
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="caption" color="text.secondary">
                  {totalApproved} approved out of {total} applications
                </Typography>
              </Paper>
              <Paper sx={statCardSx(chartTheme.palette.success.main, chartTheme)}>
                <CheckCircleIcon color="success" fontSize="large" />
                <Box>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Approved
                  </Typography>
                  <Typography variant="h5" fontWeight={700}>
                    {totalApproved}
                  </Typography>
                </Box>
              </Paper>
              <Paper sx={statCardSx(chartTheme.palette.primary.main, chartTheme)}>
                <AttachMoneyIcon color="primary" fontSize="large" />
                <Box>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Disbursed
                  </Typography>
                  <Typography variant="h5" fontWeight={700}>
                    {disbursed}
                  </Typography>
                </Box>
              </Paper>
            </Stack>
          </Grid>
          {/* User's Monthly Trends Area Chart */}
          <Grid item xs={12} md={4}>
            <Paper sx={{
              p: 3,
              borderRadius: 4,
              height: "100%",
              background: `linear-gradient(135deg, ${alpha(chartTheme.palette.primary.light, 0.08)}, ${alpha(chartTheme.palette.background.paper, 0.95)})`,
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.10)",
              transition: "box-shadow 0.3s, transform 0.3s",
              "&:hover": {
                boxShadow: "0 12px 40px 0 rgba(31, 38, 135, 0.18)",
                transform: "translateY(-4px) scale(1.01)",
              },
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}>
              <Box display="flex" alignItems="center" mb={2}>
                <TimelineIcon sx={{ color: chartTheme.palette.success.main, mr: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  My Application Trends
                </Typography>
              </Box>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart
                  data={getMonthlyData()}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={chartTheme.palette.divider}
                  />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="applications"
                    stackId="1"
                    stroke={chartTheme.palette.primary.main}
                    fill={`url(#colorApps)`}
                    isAnimationActive
                  />
                  <Area
                    type="monotone"
                    dataKey="approved"
                    stackId="2"
                    stroke={chartTheme.palette.success.main}
                    fill={`url(#colorApproved)`}
                    isAnimationActive
                  />
                  <defs>
                    <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={chartTheme.palette.primary.light} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={chartTheme.palette.primary.light} stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="colorApproved" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={chartTheme.palette.success.light} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={chartTheme.palette.success.light} stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          {/* User's Loan Purpose Bar Chart */}
          <Grid item xs={12} md={4}>
            <Paper sx={{
              p: 3,
              borderRadius: 4,
              height: "100%",
              background: `linear-gradient(135deg, ${alpha(chartTheme.palette.primary.light, 0.08)}, ${alpha(chartTheme.palette.background.paper, 0.95)})`,
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.10)",
              transition: "box-shadow 0.3s, transform 0.3s",
              "&:hover": {
                boxShadow: "0 12px 40px 0 rgba(31, 38, 135, 0.18)",
                transform: "translateY(-4px) scale(1.01)",
              },
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}>
              <Box display="flex" alignItems="center" mb={2}>
                <BarChartIcon sx={{ color: chartTheme.palette.info.main, mr: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  My Loan Amount by Purpose
                </Typography>
              </Box>
              <ResponsiveContainer width="100%" height={250}>
                <ReBarChart data={getPurposeData()}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={chartTheme.palette.divider}
                  />
                  <XAxis dataKey="purpose" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="amount"
                    fill={`url(#colorPurpose)`}
                    isAnimationActive
                    radius={[8, 8, 0, 0]}
                  />
                  <defs>
                    <linearGradient id="colorPurpose" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={chartTheme.palette.info.main} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={chartTheme.palette.info.light} stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                </ReBarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default ChartsSection;
