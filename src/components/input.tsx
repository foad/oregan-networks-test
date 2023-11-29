import { useEffect, useState } from "react";
import { Box, CircularProgress, styled } from "@mui/material";
import classNames from "classnames";
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";

import { useFocus } from "../focus";

type InputProps = {
  placeholder: string;
  tabIndex: number;
  focusId: string;
  isPassword?: boolean;
};

const classes = {
  root: `input__root`,
  rootFocused: `input__root--focused`,
  placeholder: `input__placeholder`,
  value: `input__value`,
  valueChar: `input__value-char`,
  valueBefore: `input__value--before`,
  valueAfter: `input__value--after`,
  internal: `input__internal`,
  cursor: `input__cursor`,
};

const InputContainer = styled("div")(({ theme }) => ({
  [`&.${classes.root}`]: {
    border: `1px solid ${theme.palette.text.secondary}`,
    borderRadius: "4px",
    position: "relative",
    height: "48px",
    cursor: "text",
    flex: 1,
  },
  [`&.${classes.root}:focus`]: {
    outline: "none",
  },
  [`&.${classes.root}:hover`]: {
    borderColor: theme.palette.secondary.main,
  },
  [`&.${classes.rootFocused}`]: {
    border: `1px solid ${theme.palette.secondary.main}`,
  },
  [`& .${classes.placeholder}`]: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    color: theme.palette.text.secondary,
    pointerEvents: "none",
  },
  [`& .${classes.value}`]: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: "100%",
    display: "flex",
    alignItems: "stretch",
    color: theme.palette.text.primary,
  },
  [`& .${classes.valueBefore}`]: {
    width: theme.spacing(2),
  },
  [`& .${classes.valueAfter}`]: {
    flex: 1,
  },
  [`& .${classes.valueChar}`]: {
    display: "inline-flex",
    alignItems: "center",
  },
  [`& .${classes.internal}`]: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    color: "transparent",
    pointerEvents: "none",
  },
  [`& .${classes.cursor}`]: {
    color: theme.palette.text.primary,
    fontSize: "1.5rem",
    animation: "blink 1s steps(5, start) infinite",
    position: "absolute",
    right: "-3px",
    display: "flex",
    alignItems: "center",
    fontWeight: "100",
  },
  "@keyframes blink": {
    to: { visibility: "hidden" },
  },
}));

const VisibilityButton = styled("button")(({ theme }) => ({
  color: theme.palette.text.secondary,
  height: "48px",
  width: "48px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: `1px solid ${theme.palette.text.secondary}`,
  backgroundColor: "transparent",
  borderRadius: "4px",
  marginLeft: theme.spacing(2),
  "&:focus": {
    outline: "none",
    border: `1px solid ${theme.palette.secondary.main}`,
  },
  "&:hover": {
    borderColor: theme.palette.secondary.main,
  },
}));

export const Input = (props: InputProps) => {
  const [inputState, setInputState] = useState({
    value: "",
    cursorPosition: 0,
  });
  const [isHidden, setHidden] = useState(props.isPassword);
  const [visibilityProgress, setVisibilityProgress] = useState(0);
  const { focusedItem, setFocusedItem, setKeyboardListener } = useFocus();

  const isActive = focusedItem === props.focusId;

  const containerClasses = classNames(classes.root, {
    [classes.rootFocused]: focusedItem === props.focusId,
  });

  const handleCharacterClick = (position: number) => () => {
    setInputState({
      value: inputState.value,
      cursorPosition: Math.min(position + 1, inputState.value.length),
    });
    if (focusedItem !== props.focusId) {
      setFocusedItem(props.focusId);
      setKeyboardListener(handleKeyboardInput);
    }
  };

  const handleFocus = () => {
    setFocusedItem(props.focusId);
    setKeyboardListener(handleKeyboardInput);
  };

  let visibilityInterval: number;

  const handleVisibilityClick = () => {
    if (!isHidden) {
      clearInterval(visibilityInterval);
      setVisibilityProgress(0);
      return setHidden(true);
    }
    setHidden(false);
    visibilityInterval = setInterval(() => {
      setVisibilityProgress((prevVisibilityProgress) => {
        if (prevVisibilityProgress >= 100) {
          setHidden(true);
          clearInterval(visibilityInterval);
          return 0;
        }
        return prevVisibilityProgress + 5;
      });
    }, 100);
  };

  useEffect(() => {
    return () => {
      clearInterval(visibilityInterval);
    };
  }, []);

  const handleVisibilityFocus = () => {
    setFocusedItem("visibility-button");
    setKeyboardListener(() => {});
  };

  const getRenderedValue = (isInternal?: boolean) => {
    const renderedValue =
      props.isPassword && isHidden
        ? inputState.value.replace(/./g, "•")
        : inputState.value;

    if (isInternal) {
      return renderedValue.substring(0, inputState.cursorPosition);
    }
    return renderedValue.split("").map((char, index) => (
      <span
        className={classes.valueChar}
        key={index}
        onClick={handleCharacterClick(index)}
      >
        {char}
      </span>
    ));
  };

  const handleKeyboardInput = () => (key: string) => {
    setInputState((prevInputState) => {
      const { value, cursorPosition } = prevInputState;
      if (key === "{bksp}") {
        if (value.length > 0 && cursorPosition > 0) {
          return {
            value:
              value.substring(0, cursorPosition - 1) +
              value.substring(cursorPosition),
            cursorPosition: Math.max(0, cursorPosition - 1),
          };
        } else {
          return {
            value,
            cursorPosition,
          };
        }
      }
      if (key === "◂") {
        return {
          value,
          cursorPosition: Math.max(0, cursorPosition - 1),
        };
      }
      if (key === "▸") {
        return {
          value,
          cursorPosition: Math.min(value.length, cursorPosition + 1),
        };
      }
      return {
        value:
          value.substring(0, cursorPosition) +
          key +
          value.substring(cursorPosition),
        cursorPosition: cursorPosition + 1,
      };
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexFlow: "row nowrap",
        alignItems: "center",
      }}
    >
      <InputContainer
        tabIndex={props.tabIndex}
        onFocus={handleFocus}
        className={containerClasses}
      >
        {!isActive && inputState.value.length === 0 && (
          <div className={classes.placeholder}>{props.placeholder}</div>
        )}
        <div className={classes.value}>
          <div
            className={classes.valueBefore}
            onClick={handleCharacterClick(-1)}
          />
          {getRenderedValue()}
          <div
            className={classes.valueAfter}
            onClick={() => handleCharacterClick(inputState.value.length)()}
          />
        </div>
        <div className={classes.internal}>
          {getRenderedValue(true)}
          {isActive && <div className={classes.cursor}>|</div>}
        </div>
        {props.isPassword && visibilityProgress > 0 && (
          <CircularProgress
            color="secondary"
            variant="determinate"
            value={visibilityProgress}
            size={24}
            sx={{
              position: "absolute",
              right: "12px",
              top: 0,
              bottom: 0,
              zIndex: 0,
              margin: "auto 0",
            }}
          />
        )}
      </InputContainer>
      {props.isPassword && (
        <VisibilityButton
          onClick={handleVisibilityClick}
          onFocus={handleVisibilityFocus}
        >
          {isHidden ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </VisibilityButton>
      )}
    </Box>
  );
};
