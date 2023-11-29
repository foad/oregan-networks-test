import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Alert,
  IconButton,
  styled,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

import { Input } from "./input";

const InputTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
  paddingLeft: "2px",
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  height: "48px",
  minHeight: "48px",
  width: "100%",
  borderColor: theme.palette.text.secondary,
  "&:hover": {
    borderColor: theme.palette.secondary.main,
  },
  "&:focus": {
    borderColor: theme.palette.secondary.main,
  },
}));

const LoginAlert = styled(Alert)(({ theme }) => ({
  marginTop: theme.spacing(2),
  borderColor: theme.palette.secondary.main,
  "& .MuiAlert-icon": {
    color: theme.palette.secondary.main,
  },
  position: "absolute",
  bottom: "-120px",
  left: theme.spacing(4),
  right: theme.spacing(4),
  backgroundColor: theme.palette.background.default,
  color: theme.palette.secondary.main,
  border: `1px solid ${theme.palette.secondary.main}`,
}));

export const Login = () => {
  const [alertShown, setAlertShown] = useState(false);
  const handleSubmit = () => {
    setAlertShown(true);
  };

  const closeAction = (
    <IconButton
      aria-label="close"
      color="inherit"
      size="small"
      onClick={() => {
        setAlertShown(false);
      }}
    >
      <CloseIcon fontSize="inherit" />
    </IconButton>
  );

  return (
    <Box sx={{ px: 4, maxWidth: "480px", position: "relative" }}>
      <InputTitle>Login</InputTitle>
      <Input
        tabIndex={1}
        focusId="email-input"
        placeholder="email@example.com"
      />
      <InputTitle sx={{ mt: 4 }}>Password</InputTitle>
      <Input
        tabIndex={2}
        focusId="password-input"
        placeholder="password"
        isPassword
      />
      <SubmitButton variant="outlined" sx={{ mt: 8 }} onClick={handleSubmit}>
        <Typography>Continue</Typography>
      </SubmitButton>
      {alertShown && (
        <LoginAlert action={closeAction} severity="success">
          Logging you in...
        </LoginAlert>
      )}
    </Box>
  );
};
