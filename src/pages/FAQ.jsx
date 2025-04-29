import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
} from "@mui/material";
import { motion } from "framer-motion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";

const faqCategories = [
  {
    title: "General Questions",
    questions: [
      {
        question: "What is Sundaram Finance?",
        answer: "Sundaram Finance is a leading financial institution in India, specializing in professional and business loans. We've been serving customers since 1954 with a focus on transparency, reliability, and customer satisfaction.",
      },
      {
        question: "What types of loans do you offer?",
        answer: "We offer various loan products including professional loans, education loans, medical equipment loans, construction equipment loans, commercial vehicle loans, and business expansion loans.",
      },
      {
        question: "How can I apply for a loan?",
        answer: "You can apply for a loan through our online portal by visiting the 'Apply Loan' section. The process is simple and requires basic documentation. Our team will guide you through each step.",
      },
    ],
  },
  {
    title: "Loan Application Process",
    questions: [
      {
        question: "What documents are required for loan application?",
        answer: "Basic documents include KYC documents (Aadhar, PAN), proof of income, bank statements, and professional qualification certificates. Specific requirements may vary based on the loan type.",
      },
      {
        question: "How long does the loan approval process take?",
        answer: "Our digital process ensures quick approvals. Most applications are processed within 24-48 hours, subject to document verification and credit assessment.",
      },
      {
        question: "What is the minimum credit score required?",
        answer: "We typically look for a credit score of 700 or above. However, we consider the overall financial profile and may make exceptions based on other strong factors.",
      },
    ],
  },
  {
    title: "Loan Repayment",
    questions: [
      {
        question: "What are the repayment options available?",
        answer: "We offer flexible repayment options including monthly EMIs, quarterly payments, and customized repayment schedules based on your cash flow patterns.",
      },
      {
        question: "Can I prepay my loan?",
        answer: "Yes, you can prepay your loan after a minimum period of 6 months. Prepayment charges may apply as per the terms of your loan agreement.",
      },
      {
        question: "What happens if I miss an EMI payment?",
        answer: "We recommend contacting our customer service immediately if you anticipate difficulty in making a payment. We may offer a grace period or restructure your repayment schedule.",
      },
    ],
  },
  {
    title: "Security & Privacy",
    questions: [
      {
        question: "How secure is my personal information?",
        answer: "We use bank-grade encryption and security protocols to protect your data. All information is stored securely and is never shared with third parties without your consent.",
      },
      {
        question: "What security measures are in place for online transactions?",
        answer: "Our platform uses SSL encryption, two-factor authentication, and regular security audits to ensure the safety of your transactions and personal information.",
      },
      {
        question: "How can I update my personal information?",
        answer: "You can update your information through your dashboard or by contacting our customer service. Some changes may require additional verification.",
      },
    ],
  },
];

export default function FAQ() {
  return (
    <Box
      sx={{
        backgroundColor: "#f4f7fb",
        minHeight: "100vh",
        py: 8,
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <Container>
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Typography
            variant="h3"
            align="center"
            gutterBottom
            sx={{
              color: "#005bea",
              fontWeight: 800,
              mb: 4,
              position: "relative",
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: -10,
                left: "50%",
                transform: "translateX(-50%)",
                width: 100,
                height: 3,
                backgroundColor: "#00c6fb",
              },
            }}
          >
            Frequently Asked Questions
          </Typography>
          <Typography
            variant="h6"
            align="center"
            sx={{
              color: "#4f5b7c",
              mb: 8,
              maxWidth: 800,
              mx: "auto",
              fontSize: { xs: "1rem", md: "1.2rem" },
            }}
          >
            Find answers to common questions about our services, loan process, and more.
          </Typography>
        </motion.div>

        {/* FAQ Categories */}
        <Grid container spacing={4}>
          {faqCategories.map((category, categoryIndex) => (
            <Grid item xs={12} key={categoryIndex}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              >
                <Box
                  sx={{
                    mb: 4,
                    p: 3,
                    borderRadius: 2,
                    background: "white",
                    boxShadow: "0 4px 20px rgba(0, 94, 184, 0.1)",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 3,
                    }}
                  >
                    <QuestionAnswerIcon
                      sx={{ color: "#005bea", mr: 2, fontSize: 32 }}
                    />
                    <Typography
                      variant="h5"
                      sx={{ color: "#005bea", fontWeight: 700 }}
                    >
                      {category.title}
                    </Typography>
                  </Box>
                  {category.questions.map((faq, faqIndex) => (
                    <Accordion
                      key={faqIndex}
                      sx={{
                        mb: 2,
                        borderRadius: "8px !important",
                        boxShadow: "0 2px 8px rgba(0, 94, 184, 0.1)",
                        "&:before": { display: "none" },
                      }}
                    >
                      <AccordionSummary
                        expandIcon={
                          <ExpandMoreIcon sx={{ color: "#005bea" }} />
                        }
                        sx={{
                          backgroundColor: "#f8fafc",
                          borderRadius: "8px",
                          "&.Mui-expanded": {
                            borderBottom: "1px solid #e0e0e0",
                          },
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 600, color: "#005bea" }}
                        >
                          {faq.question}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails
                        sx={{
                          backgroundColor: "#fff",
                          borderRadius: "0 0 8px 8px",
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{ color: "#4f5b7c", lineHeight: 1.6 }}
                        >
                          {faq.answer}
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
} 