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
  Typography,
} from "@mui/material";

const EmiDialog = ({
  open,
  onClose,
  emiLoading,
  selectedLoanEMIs,
  onPayEmi,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>EMI Schedule</DialogTitle>
      <DialogContent dividers>
        {emiLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
            <CircularProgress />
          </Box>
        ) : selectedLoanEMIs.length === 0 ? (
          <Typography>No EMIs found.</Typography>
        ) : (
          selectedLoanEMIs.map((emi) => (
            <Box
              key={emi.id}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 2,
                p: 1,
                borderRadius: 2,
                background: emi.status === "PAID" ? "#e0ffe0" : "#fffbe0",
              }}
            >
              <Typography>
                EMI #{emi.emiNumber} - Due: {emi.dueDate} - Amount: ₹
                {emi.emiAmount}
              </Typography>
              <Chip
                label={emi.status}
                color={
                  emi.status === "PAID"
                    ? "success"
                    : emi.status === "OVERDUE"
                    ? "error"
                    : "warning"
                }
                sx={{ mr: 2 }}
              />
              {emi.status === "PENDING" && (
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => onPayEmi(emi.id, emi.applicationId)}
                >
                  Pay EMI
                </Button>
              )}
            </Box>
          ))
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EmiDialog;
