import { useVerifyMutation } from "@/apiHooks/auth/useAuth";
import { Input as BaseInput } from "@mui/base/Input";
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  styled,
} from "@mui/material";
import * as React from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

function OTP({
  separator,
  length,
  value,
  onChange,
}: {
  separator: React.ReactNode;
  length: number;
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}) {
  const inputRefs = React.useRef<HTMLInputElement[]>(
    new Array(length).fill(null)
  );
  const focusInput = (targetIndex: number) => {
    const targetInput = inputRefs.current[targetIndex];
    targetInput.focus();
  };

  const selectInput = (targetIndex: number) => {
    const targetInput = inputRefs.current[targetIndex];
    targetInput.select();
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    currentIndex: number
  ) => {
    switch (event.key) {
      case "ArrowUp":
      case "ArrowDown":
      case " ":
        event.preventDefault();
        break;
      case "ArrowLeft":
        event.preventDefault();
        if (currentIndex > 0) {
          focusInput(currentIndex - 1);
          selectInput(currentIndex - 1);
        }
        break;
      case "ArrowRight":
        event.preventDefault();
        if (currentIndex < length - 1) {
          focusInput(currentIndex + 1);
          selectInput(currentIndex + 1);
        }
        break;
      case "Delete":
        event.preventDefault();
        onChange((prevOtp) => {
          const otp =
            prevOtp.slice(0, currentIndex) + prevOtp.slice(currentIndex + 1);
          return otp;
        });

        break;
      case "Backspace":
        event.preventDefault();
        if (currentIndex > 0) {
          focusInput(currentIndex - 1);
          selectInput(currentIndex - 1);
        }

        onChange((prevOtp) => {
          const otp =
            prevOtp.slice(0, currentIndex) + prevOtp.slice(currentIndex + 1);
          return otp;
        });
        break;

      default:
        break;
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    currentIndex: number
  ) => {
    const currentValue = event.target.value;
    let indexToEnter = 0;

    while (indexToEnter <= currentIndex) {
      if (
        inputRefs.current[indexToEnter].value &&
        indexToEnter < currentIndex
      ) {
        indexToEnter += 1;
      } else {
        break;
      }
    }
    onChange((prev) => {
      const otpArray = prev.split("");
      const lastValue = currentValue[currentValue.length - 1];
      otpArray[indexToEnter] = lastValue;
      return otpArray.join("");
    });
    if (currentValue !== "") {
      if (currentIndex < length - 1) {
        focusInput(currentIndex + 1);
      }
    }
  };

  const handleClick = (
    _event: React.MouseEvent<HTMLInputElement, MouseEvent>,
    currentIndex: number
  ) => {
    selectInput(currentIndex);
  };

  const handlePaste = (
    event: React.ClipboardEvent<HTMLInputElement>,
    currentIndex: number
  ) => {
    event.preventDefault();
    const clipboardData = event.clipboardData;

    // Check if there is text data in the clipboard
    if (clipboardData.types.includes("text/plain")) {
      let pastedText = clipboardData.getData("text/plain");
      pastedText = pastedText.substring(0, length).trim();
      let indexToEnter = 0;

      while (indexToEnter <= currentIndex) {
        if (
          inputRefs.current[indexToEnter].value &&
          indexToEnter < currentIndex
        ) {
          indexToEnter += 1;
        } else {
          break;
        }
      }

      const otpArray = value.split("");

      for (let i = indexToEnter; i < length; i += 1) {
        const lastValue = pastedText[i - indexToEnter] ?? " ";
        otpArray[i] = lastValue;
      }

      onChange(otpArray.join(""));
    }
  };

  return (
    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
      {new Array(length).fill(null).map((_, index) => (
        <React.Fragment key={index}>
          <BaseInput
            slots={{
              input: InputElement,
            }}
            aria-label={`Digit ${index + 1} of OTP`}
            slotProps={{
              input: {
                ref: (ele) => {
                  inputRefs.current[index] = ele!;
                },
                onKeyDown: (event) => handleKeyDown(event, index),
                onChange: (event) => handleChange(event, index),
                onClick: (event) => handleClick(event, index),
                onPaste: (event) => handlePaste(event, index),
                value: value[index] ?? "",
              },
            }}
          />
          {index === length - 1 ? null : separator}
        </React.Fragment>
      ))}
    </Box>
  );
}

export default function OTPInput() {
  const [otp, setOtp] = React.useState("");
  const { data, isPending, isSuccess, mutate } = useVerifyMutation();
  const [timeRemaining, setTimeRemaining] = React.useState(180);
  React.useEffect(() => {
    if (!timeRemaining) return;

    const intervalId = setInterval(() => {
      setTimeRemaining(timeRemaining - 1);
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [timeRemaining]);

  function handleResendOtp() {
    setIsResending(true);
    // Simulate an API call
    setTimeout(() => {
      setOtp(""); // Clear the OTP input
      setTimeRemaining(10); // Reset the timer
      setIsResending(false);
      toast.success("OTP has been resent.");
    }, 2000); // Simulated delay for the API call
  }
  const { state } = useLocation();
  function handleverifyEmail() {
    mutate({
      code: otp,
      email: state.email,
    });
  }

  const [isResending, setIsResending] = React.useState(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (isSuccess && data?.message && data?.success) {
      toast.success(data?.message);
      navigate("/chat");
    }
    if (isSuccess && data?.message && !data?.success) {
      toast.error(data?.message);
    }
  }, [isSuccess, data]);

  return (
    <Box
      component="main"
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "text.secondary",
            textAlign: "center",
            marginBottom: 5,
          }}
        >
          Submit OTP
        </Typography>
        <OTP
          separator={
            <Box
              component="span"
              sx={{
                color: "text.secondary",
              }}
            >
              -
            </Box>
          }
          value={otp}
          onChange={setOtp}
          length={6}
        />
        <Typography
          variant="subtitle1"
          sx={{
            color: timeRemaining === 0 ? "red" : "text.secondary",
            textAlign: "center",
            marginBottom: 2,
          }}
        >
          Time Remaining: {Math.floor(timeRemaining / 60)}:
          {timeRemaining % 60 < 10
            ? `0${timeRemaining % 60}`
            : timeRemaining % 60}
        </Typography>
        {timeRemaining === 0 && (
          <Button
            color="primary"
            variant="outlined"
            sx={{
              width: "25%",
              alignSelf: "center",
            }}
            onClick={handleResendOtp}
          >
            {isResending ? <CircularProgress size={24} /> : "Resend OTP"}
          </Button>
        )}
        <Button
          color="secondary"
          variant="contained"
          sx={{
            width: "40%",
            marginTop: 5,
            alignSelf: "center",
            paddingY: 1,
          }}
          onClick={() => handleverifyEmail()}
        >
          {isPending ? "Verifying..." : "Verify"}
        </Button>
      </Box>
    </Box>
  );
}

const blue = {
  100: "#DAECFF",
  200: "#80BFFF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

// Adjusting the width, padding, and other properties to make each input box larger
const InputElement = styled("input")(
  ({ theme }) => `
  width: 60px;
  height: 70px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 2rem;
  font-weight: 400;
  line-height: 1.5;
  border-radius: 10px; 
  text-align: center;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: ${theme.palette.mode === "dark" ? grey[700] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  box-shadow: 0px 2px 4px ${
    theme.palette.mode === "dark" ? "rgba(0,0,0, 0.5)" : "rgba(0,0,0, 0.05)"
  };

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${
      theme.palette.mode === "dark" ? blue[600] : blue[200]
    };
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);
