import React, { useState, useRef, useEffect } from 'react';
import { Box, IconButton, TextField, Paper, Typography, Avatar, Tooltip, Button, Grid } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      text: "Hello! I'm your loan assistant. How can I help you today?",
      sender: 'bot',
      options: [
        "Loan Eligibility",
        "Document Requirements",
        "Interest Rates",
        "EMI Calculator",
        "Loan Application Process",
        "Loan Types"
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (query) => {
    const responses = {
      "Loan Eligibility": {
        text: "To check your loan eligibility, we consider several factors:\n\n" +
          "1. Age: 21-65 years\n" +
          "2. Income: Minimum ₹25,000 per month\n" +
          "3. Credit Score: 650 or above\n" +
          "4. Employment: Minimum 2 years of work experience\n\n" +
          "Would you like to check your eligibility now?",
        options: ["Yes, Check Eligibility", "No, Other Query"]
      },
      "Document Requirements": {
        text: "Here are the documents required for loan application:\n\n" +
          "1. Identity Proof: Aadhar Card, PAN Card, Passport\n" +
          "2. Address Proof: Aadhar Card, Utility Bills, Rent Agreement\n" +
          "3. Income Proof: Salary Slips, Bank Statements, ITR\n" +
          "4. Employment Proof: Offer Letter, Experience Certificate\n\n" +
          "Would you like to know more about any specific document?",
        options: ["Identity Documents", "Income Documents", "Other Query"]
      },
      "Interest Rates": {
        text: "Our current interest rates are:\n\n" +
          "1. Personal Loan: 10.5% - 15% p.a.\n" +
          "2. Home Loan: 8.4% - 9.5% p.a.\n" +
          "3. Car Loan: 8.5% - 10% p.a.\n" +
          "4. Education Loan: 8.5% - 11% p.a.\n\n" +
          "Would you like to know more about any specific loan type?",
        options: ["Personal Loan", "Home Loan", "Car Loan", "Education Loan", "Other Query"]
      },
      "EMI Calculator": {
        text: "I can help you calculate your EMI. Please provide:\n\n" +
          "1. Loan Amount\n" +
          "2. Loan Tenure (in years)\n" +
          "3. Interest Rate\n\n" +
          "Would you like to calculate your EMI now?",
        options: ["Yes, Calculate EMI", "No, Other Query"]
      },
      "Loan Application Process": {
        text: "Our loan application process is simple:\n\n" +
          "1. Fill the online application form\n" +
          "2. Upload required documents\n" +
          "3. Get instant approval\n" +
          "4. Complete KYC verification\n" +
          "5. Receive loan amount in your account\n\n" +
          "Would you like to start your application?",
        options: ["Start Application", "More Details", "Other Query"]
      },
      "Loan Types": {
        text: "We offer various types of loans:\n\n" +
          "1. Personal Loan: For any personal needs\n" +
          "2. Home Loan: For buying/renovating home\n" +
          "3. Car Loan: For buying new/used car\n" +
          "4. Education Loan: For higher education\n" +
          "5. Business Loan: For business expansion\n\n" +
          "Which loan type would you like to know more about?",
        options: ["Personal Loan", "Home Loan", "Car Loan", "Education Loan", "Business Loan", "Other Query"]
      }
    };

    return responses[query] || {
      text: "I understand your query. Let me help you with that. Could you please provide more details?",
      options: ["Loan Eligibility", "Document Requirements", "Interest Rates", "EMI Calculator", "Loan Application Process", "Loan Types"]
    };
  };

  const handleOptionClick = (option) => {
    // Add user message
    setMessages(prev => [...prev, { text: option, sender: 'user' }]);

    // Add bot response
    setTimeout(() => {
      const response = getBotResponse(option);
      setMessages(prev => [...prev, { text: response.text, sender: 'bot', options: response.options }]);
    }, 500);
  };

  const handleSend = () => {
    if (input.trim() === '') return;

    // Add user message
    setMessages(prev => [...prev, { text: input, sender: 'user' }]);
    setInput('');

    // Add bot response
    setTimeout(() => {
      const response = getBotResponse(input);
      setMessages(prev => [...prev, { text: response.text, sender: 'bot', options: response.options }]);
    }, 500);
  };

  return (
    <>
      {/* Toggle Button */}
      <Tooltip title="Chat with us">
        <IconButton
          onClick={() => setIsOpen(!isOpen)}
          sx={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            zIndex: 1000,
            backgroundColor: '#005bea',
            color: 'white',
            width: 60,
            height: 60,
            '&:hover': {
              backgroundColor: '#0044b3',
            },
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          }}
        >
          {isOpen ? <CloseIcon /> : <ChatIcon />}
        </IconButton>
      </Tooltip>

      {/* Chat Window */}
      {isOpen && (
        <Box
          sx={{
            position: 'fixed',
            bottom: 90,
            right: 20,
            zIndex: 1000,
            width: 350,
            height: 500,
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            borderRadius: '12px',
            overflow: 'hidden',
            backgroundColor: 'white',
            animation: 'slideIn 0.3s ease-out',
            '@keyframes slideIn': {
              '0%': {
                transform: 'translateY(100%)',
                opacity: 0,
              },
              '100%': {
                transform: 'translateY(0)',
                opacity: 1,
              },
            },
          }}
        >
          <Box
            sx={{
              backgroundColor: '#005bea',
              color: 'white',
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <SmartToyIcon />
            <Typography variant="h6">Loan Assistant</Typography>
          </Box>

          <Box
            sx={{
              flex: 1,
              overflowY: 'auto',
              padding: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            {messages.map((message, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                    gap: 1,
                  }}
                >
                  {message.sender === 'bot' && (
                    <Avatar sx={{ bgcolor: '#005bea' }}>
                      <SmartToyIcon />
                    </Avatar>
                  )}
                  <Paper
                    sx={{
                      padding: '8px 12px',
                      maxWidth: '70%',
                      backgroundColor: message.sender === 'user' ? '#005bea' : '#f0f0f0',
                      color: message.sender === 'user' ? 'white' : 'black',
                      borderRadius: message.sender === 'user' ? '12px 12px 0 12px' : '12px 12px 12px 0',
                    }}
                  >
                    <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                      {message.text}
                    </Typography>
                  </Paper>
                  {message.sender === 'user' && (
                    <Avatar sx={{ bgcolor: '#005bea' }}>
                      <PersonIcon />
                    </Avatar>
                  )}
                </Box>
                {message.sender === 'bot' && message.options && (
                  <Grid container spacing={1} sx={{ mt: 1 }}>
                    {message.options.map((option, idx) => (
                      <Grid item xs={6} key={idx}>
                        <Button
                          variant="outlined"
                          onClick={() => handleOptionClick(option)}
                          sx={{
                            width: '100%',
                            textTransform: 'none',
                            fontSize: '0.8rem',
                            padding: '4px 8px',
                            borderColor: '#005bea',
                            color: '#005bea',
                            '&:hover': {
                              borderColor: '#0044b3',
                              backgroundColor: 'rgba(0, 91, 234, 0.04)',
                            },
                          }}
                        >
                          {option}
                        </Button>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Box>
            ))}
            <div ref={messagesEndRef} />
          </Box>

          <Box
            sx={{
              padding: 2,
              borderTop: '1px solid #e0e0e0',
              display: 'flex',
              gap: 1,
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              size="small"
            />
            <IconButton
              color="primary"
              onClick={handleSend}
              sx={{ backgroundColor: '#005bea', color: 'white', '&:hover': { backgroundColor: '#0044b3' } }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Chatbot; 