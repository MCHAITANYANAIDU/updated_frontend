import {
  Delete as DeleteIcon,
  Download as DownloadIcon,
  PictureAsPdf,
  Upload as UploadIcon,
  Visibility as ViewIcon,
  Folder as FolderIcon,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const DOCUMENT_TYPES = [
  { value: "AADHAR", label: "Aadhar" },
  { value: "PAN", label: "PAN" },
  { value: "BANK_STATEMENT", label: "Bank Statement" },
  { value: "SALARY_SLIP", label: "Salary Slip" },
  { value: "OTHER", label: "Other" },
];

export default function UserDocuments({ userId, userRole }) {
  const theme = useTheme();
  const [file, setFile] = useState(null);
  const [docType, setDocType] = useState("");
  const [uploading, setUploading] = useState(false);
  const [userDocs, setUserDocs] = useState([]);
  const [docsLoadingUser, setDocsLoadingUser] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [docToDelete, setDocToDelete] = useState(null);

  // Debug: See what userRole is
  console.log("UserDocuments userRole:", userRole);

  // Fetch user's documents
  const fetchUserDocs = async () => {
    if (!userId) return;
    setDocsLoadingUser(true);
    try {
      const response = await axios.get(
        `http://localhost:8732/api/documents/user/${userId}`
      );
      setUserDocs(response.data || []);
    } catch (e) {
      setUserDocs([]);
      toast.error("Failed to load your documents");
    } finally {
      setDocsLoadingUser(false);
    }
  };

  // Upload document handler
  const handleUpload = async () => {
    if (!file || !docType) {
      toast.error("Please select a file and document type");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File must be under 5MB");
      return;
    }
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("userId", userId);
      formData.append("documentType", docType);

      await axios.post("http://localhost:8732/api/documents/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Document uploaded successfully!");
      setFile(null);
      setDocType("");
      fetchUserDocs();
    } catch (e) {
      toast.error(e.response?.data || "Failed to upload document");
    } finally {
      setUploading(false);
    }
  };

  // Delete document handler
  const handleDelete = async () => {
    if (!docToDelete) return;
    try {
      await axios.delete(
        `http://localhost:8732/api/documents/${docToDelete.documentId}`
      );
      toast.success("Document deleted!");
      setDeleteDialogOpen(false);
      setDocToDelete(null);
      fetchUserDocs();
    } catch (e) {
      toast.error("Failed to delete document");
    }
  };

  useEffect(() => {
    if (userId) fetchUserDocs();
    // eslint-disable-next-line
  }, [userId]);

  return (
    <Paper
      sx={{
        p: 0,
        borderRadius: 4,
        background: "linear-gradient(120deg, #e3f0ff 0%, #f8fafc 100%)",
        boxShadow: 4,
        mb: 4,
        maxWidth: 800,
        mx: "auto",
        overflow: "hidden",
      }}
    >
      {/* DigiLocker style header */}
      <Box
        sx={{
          background: "linear-gradient(90deg, #1976d2 0%, #4f8cff 100%)",
          color: "#fff",
          px: 4,
          py: 2,
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Avatar
          sx={{
            bgcolor: "#fff",
            color: "#1976d2",
            width: 38,
            height: 38,
            boxShadow: 1,
            mr: 1,
          }}
        >
          <FolderIcon />
        </Avatar>
        <Typography variant="h5" sx={{ fontWeight: 700, letterSpacing: 0.5 }}>
          My DigiLocker Documents
        </Typography>
      </Box>

      {/* Upload area: Only for USER (case-insensitive) */}
      <Box sx={{ px: { xs: 2, sm: 4 }, pt: 3, pb: 2 }}>
        {userRole?.toUpperCase() === "USER" ? (
          <Paper
            elevation={0}
            sx={{
              p: 2,
              mb: 3,
              borderRadius: 3,
              background: "linear-gradient(90deg, #f0f6ff 0%, #ffffff 100%)",
              boxShadow: "0 2px 8px rgba(25, 118, 210, 0.07)",
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <input
              accept="application/pdf"
              style={{ display: "none" }}
              id="upload-file"
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="upload-file">
              <Button
                variant="outlined"
                component="span"
                startIcon={<PictureAsPdf />}
                sx={{ borderRadius: 2, minWidth: 120 }}
              >
                Choose PDF
              </Button>
            </label>
            <Box sx={{ minWidth: 180 }}>
              <select
                value={docType}
                onChange={(e) => setDocType(e.target.value)}
                style={{
                  padding: "8px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  width: "100%",
                  fontSize: "1rem",
                }}
              >
                <option value="">Select Document Type</option>
                {DOCUMENT_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </Box>
            <Button
              variant="contained"
              color="primary"
              disabled={uploading}
              onClick={handleUpload}
              startIcon={<UploadIcon />}
              sx={{ borderRadius: 2, minWidth: 110, fontWeight: 600 }}
            >
              {uploading ? "Uploading..." : "Upload"}
            </Button>
            {file && (
              <Typography variant="body2" sx={{ ml: 2 }}>
                {file.name}
              </Typography>
            )}
          </Paper>
        ) : (
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            Only users can upload documents. Admins cannot upload documents.
          </Typography>
        )}

        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
          My Documents
        </Typography>
        {docsLoadingUser ? (
          <CircularProgress />
        ) : userDocs.length === 0 ? (
          <Typography color="text.secondary">
            No documents uploaded yet.
          </Typography>
        ) : (
          <Stack spacing={2}>
            {userDocs.map((doc) => (
              <Paper
                key={doc.documentId}
                sx={{
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  borderRadius: 3,
                  background:
                    "linear-gradient(90deg, #f0f6ff 0%, #ffffff 100%)",
                  boxShadow: "0 2px 8px rgba(25, 118, 210, 0.07)",
                  borderLeft: `6px solid #1976d2`,
                  transition: "box-shadow 0.2s, transform 0.2s",
                  "&:hover": {
                    boxShadow: "0 4px 16px rgba(25, 118, 210, 0.15)",
                    transform: "translateY(-2px) scale(1.01)",
                  },
                  justifyContent: "space-between",
                }}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar
                    variant="rounded"
                    sx={{
                      bgcolor: "#fff",
                      border: `2px solid ${theme.palette.error.main}`,
                      color: theme.palette.error.main,
                      width: 48,
                      height: 48,
                      mr: 1,
                    }}
                  >
                    <PictureAsPdf sx={{ fontSize: 32 }} />
                  </Avatar>
                  <Box>
                    <Typography sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
                      {doc.fileName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {doc.fileType}
                    </Typography>
                  </Box>
                </Stack>
                <Stack direction="row" spacing={1}>
                  <Tooltip title="View">
                    <IconButton
                      color="primary"
                      href={`http://localhost:8732/api/documents/view/${doc.documentId}`}
                      target="_blank"
                    >
                      <ViewIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Download">
                    <IconButton
                      color="success"
                      href={`http://localhost:8732/api/documents/download/${doc.documentId}`}
                      target="_blank"
                    >
                      <DownloadIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      color="error"
                      onClick={() => {
                        setDocToDelete(doc);
                        setDeleteDialogOpen(true);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Paper>
            ))}
          </Stack>
        )}
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Document</DialogTitle>
        <DialogContent>
          Are you sure you want to delete <b>{docToDelete?.fileName}</b>?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
