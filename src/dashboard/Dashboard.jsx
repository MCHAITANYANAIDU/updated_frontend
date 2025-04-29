import {
  AttachMoney,
  Cancel,
  CheckCircle,
  Dashboard as DashboardIcon,
  FilterList,
  Pending,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  LinearProgress,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserDocuments from "../components/UserDocuments";
import ChartsSection from "../dashboard/ChartsSection";
import ApplicationsList from "../dashboard/ApplicationsList";
import PdfDialog from "../dashboard/PdfDialog";
import EmiDialog from "../dashboard/EmiDialog";
import NotificationBell from "../components/NotificationBell";

function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedDocs, setSelectedDocs] = useState([]);
  const [pdfDialogOpen, setPdfDialogOpen] = useState(false);
  const [docsLoading, setDocsLoading] = useState(false);

  // EMI Repayment state
  const [selectedLoanEMIs, setSelectedLoanEMIs] = useState([]);
  const [emiDialogOpen, setEmiDialogOpen] = useState(false);
  const [emiLoading, setEmiLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const theme = useTheme();

  // Status filter options
  const statusFilters = [
    {
      value: "ALL",
      label: "All Statuses",
      icon: <FilterList fontSize="small" />,
    },
    {
      value: "PENDING",
      label: "Pending",
      icon: <Pending color="warning" fontSize="small" />,
    },
    {
      value: "APPROVED",
      label: "Approved",
      icon: <CheckCircle color="success" fontSize="small" />,
    },
    {
      value: "REJECTED",
      label: "Rejected",
      icon: <Cancel color="error" fontSize="small" />,
    },
    {
      value: "DISBURSED",
      label: "Disbursed",
      icon: <AttachMoney color="primary" fontSize="small" />,
    },
  ];

  // Prepare data for charts
  const getStatusData = () => {
    const statusCounts = applications.reduce(
      (acc, app) => {
        acc[app.status] = (acc[app.status] || 0) + 1;
        return acc;
      },
      { PENDING: 0, APPROVED: 0, REJECTED: 0, DISBURSED: 0 }
    );
    return [
      {
        name: "Pending",
        value: statusCounts.PENDING,
        color: theme.palette.warning.main,
      },
      {
        name: "Approved",
        value: statusCounts.APPROVED,
        color: theme.palette.success.main,
      },
      {
        name: "Rejected",
        value: statusCounts.REJECTED,
        color: theme.palette.error.main,
      },
      {
        name: "Disbursed",
        value: statusCounts.DISBURSED,
        color: theme.palette.primary.main,
      },
    ].filter((item) => item.value > 0);
  };

  // Monthly data (dynamic from applications)
  const getMonthlyData = () => {
    const monthly = {};
    applications.forEach((app) => {
      const date = new Date(app.createdAt || app.applicationDate);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        "0"
      )}`;
      if (!monthly[key])
        monthly[key] = { applications: 0, approved: 0, month: key };
      monthly[key].applications += 1;
      if (app.status === "APPROVED" || app.status === "DISBURSED")
        monthly[key].approved += 1;
    });
    return Object.values(monthly).sort((a, b) =>
      a.month.localeCompare(b.month)
    );
  };

  // Loan purpose bar chart
  const getPurposeData = () => {
    const purposeSums = applications.reduce((acc, app) => {
      acc[app.purpose] = (acc[app.purpose] || 0) + Number(app.loanAmount);
      return acc;
    }, {});
    return Object.keys(purposeSums).map((purpose) => ({
      purpose,
      amount: purposeSums[purpose],
    }));
  };

  // Filter applications based on search and status filter
  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.purpose?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  useEffect(() => {
    if (!user.id || !user.role) {
      setError("User not logged in or invalid session");
      setLoading(false);
      toast.error("Please log in to view your dashboard");
      return;
    }
    fetchApplications();
    // eslint-disable-next-line
  }, []);

  // Fetch applications
  const fetchApplications = async () => {
    setLoading(true);
    try {
      const endpoint =
        user.role === "ADMIN"
          ? "http://localhost:8732/api/loans/all"
          : `http://localhost:8732/api/loans/user/${user.id}`;
      const response = await axios.get(endpoint);
      setApplications(Array.isArray(response.data) ? response.data : []);
      setLoading(false);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to load applications";
      setError(errorMessage);
      toast.error(errorMessage);
      setLoading(false);
    }
  };

  // Fetch documents for a specific application
  const fetchDocuments = async (app) => {
    const applicationId = app.applicationId;
    if (!applicationId) {
      toast.error("Application ID not found.");
      setSelectedDocs([]);
      setPdfDialogOpen(true);
      return;
    }
    setDocsLoading(true);
    setPdfDialogOpen(true);
    try {
      const response = await axios.get(
        `http://localhost:8732/api/loans/documents/application/${applicationId}`
      );
      setSelectedDocs(response.data || []);
    } catch (e) {
      setSelectedDocs([]);
      toast.error("Failed to load documents");
    } finally {
      setDocsLoading(false);
    }
  };

  // Status update handler (admin)
  const handleStatusUpdate = async (applicationId, status) => {
    try {
      await axios.put(
        `http://localhost:8732/api/loans/update-status/${applicationId}`,
        null,
        { params: { status: status.toUpperCase() } }
      );
      toast.success(`Application ${status.toLowerCase()}!`);
      fetchApplications();
    } catch (error) {
      toast.error(error.response?.data?.message || "Status update failed");
    }
  };

  // Disburse loan (admin)
  const handleDisburse = async (applicationId) => {
    try {
      const application = applications.find(
        (app) => app.applicationId === applicationId
      );

      // Check if the application is approved before disbursement
      if (application.status !== "APPROVED") {
        toast.error("Loan application must be approved before disbursement");
        return;
      }

      // Ensure loanAmount is a valid number
      const amount = Number(application.loanAmount);

      // Using axios params option to properly encode the query parameters
      const url = `http://localhost:8732/api/disbursements/disburse/${applicationId}`;

      await axios({
        method: 'post',
        url: url,
        params: {
          amount: amount
        }
      });

      toast.success("Loan disbursed!");
      fetchApplications();
    } catch (error) {
      toast.error(error.response?.data || "Disbursement failed");
    }
  };

  // --- EMI Repayment Logic ---
  const fetchEMIs = async (applicationId) => {
    setEmiLoading(true);
    setEmiDialogOpen(true);
    try {
      const response = await axios.get(
        `http://localhost:8732/api/repayments/loan/${applicationId}`
      );
      setSelectedLoanEMIs(response.data || []);
    } catch (e) {
      setSelectedLoanEMIs([]);
      toast.error("Failed to load EMI schedule");
    } finally {
      setEmiLoading(false);
    }
  };

  const handlePayEmi = async (repaymentId, applicationId) => {
    try {
      await axios.post(
        `http://localhost:8732/api/repayments/pay/${repaymentId}`
      );
      toast.success("EMI paid successfully!");
      fetchEMIs(applicationId); // Refresh EMI list
    } catch (e) {
      toast.error(e.response?.data?.error || "Failed to pay EMI");
    }
  };

  // Format date without date-fns
  const formattedDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: theme.palette.background.default,
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 400, textAlign: "center", p: 4 }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            style={{ display: "inline-block" }}
          >
            <Avatar
              sx={{
                width: 80,
                height: 80,
                bgcolor: theme.palette.primary.main,
                mb: 3,
              }}
            >
              <DashboardIcon fontSize="large" />
            </Avatar>
          </motion.div>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Loading Your Dashboard
          </Typography>
          <LinearProgress color="primary" />
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: theme.palette.background.default,
        }}
      >
        <Paper
          sx={{
            p: 4,
            maxWidth: 500,
            textAlign: "center",
            borderRadius: 4,
            boxShadow: theme.shadows[10],
          }}
        >
          <Typography variant="h5" color="error" gutterBottom>
            Dashboard Error
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            {typeof error === "string"
              ? error
              : "Failed to load dashboard data"}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={fetchApplications}
            sx={{ borderRadius: 3, px: 4 }}
          >
            Try Again
          </Button>
        </Paper>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          theme.palette.mode === "light"
            ? "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)"
            : theme.palette.background.default,
        pb: 8,
      }}
    >
      <ToastContainer />
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        {/* --- NOTIFICATION BELL --- */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <NotificationBell userId={user.id} />
        </Box>

        <Box sx={{ mb: 4 }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                mb: 1,
                background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline-block",
              }}
            >
              {user.role === "ADMIN" ? "Admin Dashboard" : "My Loan Dashboard"}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {formattedDate}
            </Typography>
          </motion.div>
        </Box>

        {/* --- CHARTS SECTION --- */}
        <ChartsSection
          applications={applications}
          theme={theme}
          getStatusData={getStatusData}
          getMonthlyData={getMonthlyData}
          getPurposeData={getPurposeData}
        />

        {/* --- USER DOCUMENT UPLOAD & VIEW SECTION (as a component) --- */}
        <UserDocuments userId={user.id} userRole={user.role} />

        {/* --- APPLICATIONS SECTION --- */}
        <ApplicationsList
          applications={filteredApplications}
          user={user}
          onFetchDocuments={fetchDocuments}
          onFetchEMIs={fetchEMIs}
          onStatusUpdate={handleStatusUpdate}
          onDisburse={handleDisburse}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          filterAnchorEl={filterAnchorEl}
          setFilterAnchorEl={setFilterAnchorEl}
          statusFilters={statusFilters}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          theme={theme}
        />

        {/* PDF Dialog for Application */}
        <PdfDialog
          open={pdfDialogOpen}
          onClose={() => setPdfDialogOpen(false)}
          docsLoading={docsLoading}
          selectedDocs={selectedDocs}
        />

        {/* --- EMI Dialog for Users --- */}
        <EmiDialog
          open={emiDialogOpen}
          onClose={() => setEmiDialogOpen(false)}
          emiLoading={emiLoading}
          selectedLoanEMIs={selectedLoanEMIs}
          onPayEmi={handlePayEmi}
        />
      </Container>
    </Box>
  );
}

export default Dashboard;
