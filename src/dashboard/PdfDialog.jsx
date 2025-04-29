import React from "react";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
  Tooltip as MuiTooltip,
  Avatar,
  useTheme,
} from "@mui/material";
import {
  PictureAsPdf,
  Close as CloseIcon,
  Download as DownloadIcon,
  Folder as FolderIcon,
} from "@mui/icons-material";

const PdfDialog = ({ open, onClose, docsLoading, selectedDocs }) => {
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          p: 0,
          background: "linear-gradient(120deg, #e3f0ff 0%, #f8fafc 100%)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.12)",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 4,
          py: 2,
          background: "linear-gradient(90deg, #1976d2 0%, #4f8cff 100%)",
          color: "#fff",
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <Avatar
            sx={{
              bgcolor: "#fff",
              color: "#1976d2",
              width: 36,
              height: 36,
              boxShadow: 1,
            }}
          >
            <FolderIcon />
          </Avatar>
          <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 0.5 }}>
            My DigiLocker Documents
          </Typography>
        </Stack>
        <IconButton onClick={onClose} sx={{ color: "#fff" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent
        dividers
        sx={{
          background: "rgba(255,255,255,0.95)",
          px: { xs: 1, sm: 4 },
          py: 3,
        }}
      >
        {docsLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
            <CircularProgress color="primary" />
          </Box>
        ) : selectedDocs.length === 0 ? (
          <Typography
            align="center"
            color="text.secondary"
            sx={{ fontWeight: 500 }}
          >
            No documents found.
          </Typography>
        ) : (
          <Stack spacing={2}>
            {selectedDocs.map((doc, idx) => (
              <Box
                key={doc.downloadUrl || idx}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  p: 2,
                  borderRadius: 3,
                  background:
                    "linear-gradient(90deg, #f0f6ff 0%, #ffffff 100%)",
                  boxShadow: "0 2px 8px rgba(25, 118, 210, 0.07)",
                  transition: "box-shadow 0.25s, transform 0.2s",
                  "&:hover": {
                    boxShadow: "0 4px 16px rgba(25, 118, 210, 0.15)",
                    transform: "translateY(-2px) scale(1.01)",
                  },
                  gap: 2,
                }}
              >
                <Avatar
                  variant="rounded"
                  sx={{
                    bgcolor: "#fff",
                    border: `2px solid ${theme.palette.error.main}`,
                    color: theme.palette.error.main,
                    width: 48,
                    height: 48,
                    mr: 2,
                  }}
                >
                  <PictureAsPdf sx={{ fontSize: 32 }} />
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: 16 }}>
                    {doc.fileName || doc.documentType || "PDF Document"}
                  </Typography>
                  <Chip
                    label={doc.documentType}
                    size="small"
                    color="info"
                    sx={{
                      mt: 0.5,
                      fontWeight: 500,
                      background: "#e3f0ff",
                      color: "#1976d2",
                    }}
                  />
                </Box>
                <MuiTooltip title="Open PDF in new tab" arrow>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{
                      mr: 1,
                      borderRadius: 2,
                      minWidth: 90,
                      boxShadow: "none",
                      textTransform: "none",
                      fontWeight: 600,
                    }}
                    onClick={() =>
                      window.open(
                        `http://localhost:8732${doc.downloadUrl}`,
                        "_blank"
                      )
                    }
                  >
                    View
                  </Button>
                </MuiTooltip>
                <MuiTooltip title="Download PDF" arrow>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    sx={{
                      borderRadius: 2,
                      minWidth: 110,
                      textTransform: "none",
                      fontWeight: 600,
                      borderWidth: 2,
                    }}
                    href={`http://localhost:8732${doc.downloadUrl}`}
                    target="_blank"
                    startIcon={<DownloadIcon />}
                  >
                    Download
                  </Button>
                </MuiTooltip>
              </Box>
            ))}
          </Stack>
        )}
      </DialogContent>
      <DialogActions sx={{ px: 4, pb: 2, pt: 1 }}>
        <Button
          onClick={onClose}
          sx={{
            borderRadius: 2,
            fontWeight: 600,
            minWidth: 100,
            color: "#1976d2",
            borderColor: "#1976d2",
          }}
          variant="outlined"
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PdfDialog;
