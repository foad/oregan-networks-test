import { useEffect, useRef, useState } from "react";
import { Box, Container, Paper, Typography, styled } from "@mui/material";
import { KeyboardReact as Keyboard, KeyboardType } from "react-simple-keyboard";
import keyNavigation from "simple-keyboard-key-navigation";
import "react-simple-keyboard/build/css/index.css";

import { useFocus } from "../focus";

import { Login } from "./login";

const classes = {
  root: `root`,
  heading: `root__heading`,
  login: `root__login`,
  keyboard: `root__keyboard`,
};

const Root = styled(Box)(({ theme }) => ({
  [`&.${classes.root}`]: {
    height: "100vh",
    display: "flex",
  },
  [`& .${classes.heading}`]: {
    backgroundColor: theme.palette.primary.dark,
    flex: 7,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  [`& .${classes.login}`]: {
    backgroundColor: theme.palette.primary.main,
    flex: 5,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  [`& .${classes.keyboard}`]: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
}));

export const App = () => {
  const [layout, setLayout] = useState("default");
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const keyboard = useRef<Keyboard>();
  const { focusedItem, setFocusedItem, keyboardListener } = useFocus();

  const handleShift = () => {
    const newLayoutName = layout === "default" ? "shift" : "default";
    setLayout(newLayoutName);
  };

  const onKeyPress = (button: string) => {
    if (button === "{shift}" || button === "{lock}") return handleShift();

    if (button === "{enter}") {
      return setIsKeyboardVisible(false);
    }

    keyboardListener?.(button);
  };

  const createKeydownHandler =
    (keyboard: KeyboardType) => (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") keyboard.modules.keyNavigation.up();
      else if (e.key === "ArrowDown") keyboard.modules.keyNavigation.down();
      else if (e.key === "ArrowLeft") keyboard.modules.keyNavigation.left();
      else if (e.key === "ArrowRight") keyboard.modules.keyNavigation.right();
      else if (e.key === "Enter") keyboard.modules.keyNavigation.press();
    };

  let keydownHandler: (e: KeyboardEvent) => void;

  useEffect(() => {
    return () => {
      document.removeEventListener("keydown", keydownHandler);
    };
  }, []);

  useEffect(() => {
    if (focusedItem && focusedItem.includes("input")) {
      setIsKeyboardVisible(true);
    }
    if (!focusedItem || !focusedItem.includes("input")) {
      setIsKeyboardVisible(false);
    }
  }, [focusedItem]);

  const onRootClick = (e: React.MouseEvent<HTMLElement>) => {
    const classList = Array.from<string>((e.target as HTMLElement).classList);
    const isInput = classList.some((className: string) =>
      className.includes("input")
    );
    const isKeyboard = classList.some((className: string) =>
      className.includes("hg-")
    );
    if (isInput) {
      setIsKeyboardVisible(true);
    } else if (!isKeyboard) {
      setIsKeyboardVisible(false);
      setFocusedItem(null);
    }
  };

  const keyboardLayout = {
    default: [
      "[◂ ▸] 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
      "{tab} q w e r t y u i o p [ ] \\",
      "{lock} a s d f g h j k l ; ' {enter}",
      "{shift} z x c v b n m , . / {shift}",
      ".com @ {space}",
    ],
    shift: [
      "[◂ ▸] ! @ # $ % ^ &amp; * ( ) _ + {bksp}",
      "{tab} Q W E R T Y U I O P { } |",
      '{lock} A S D F G H J K L : " {enter}',
      "{shift} Z X C V B N M &lt; &gt; ? {shift}",
      ".com @ {space}",
    ],
  };

  return (
    <Root className={classes.root} onClick={onRootClick}>
      <Box
        className={classes.heading}
        sx={{
          backgroundImage: "url('/heading-img-unsplash.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Paper
          sx={{
            padding: "64px 240px 64px 64px",
            marginBottom: "240px",
            backgroundColor: "primary.dark",
          }}
          elevation={16}
          square
        >
          <Typography variant="h2" sx={{ mb: 2 }}>
            Foad TV
          </Typography>
          <Typography>One step away from amazing content</Typography>
        </Paper>
      </Box>
      <Box className={classes.login} sx={{ position: "relative" }}>
        <Login />
      </Box>
      <Container
        className={classes.keyboard}
        sx={{ visibility: isKeyboardVisible ? "visible" : "hidden" }}
      >
        <Keyboard
          keyboardRef={(r: Keyboard) => (keyboard.current = r)}
          layoutName={layout}
          layout={keyboardLayout}
          onKeyPress={onKeyPress}
          modules={[keyNavigation]}
          enableKeyNavigation={true}
          onModulesLoaded={(keyboard: KeyboardType) => {
            keydownHandler = createKeydownHandler(keyboard);
            document.addEventListener("keydown", keydownHandler, false);
          }}
        />
      </Container>
    </Root>
  );
};
