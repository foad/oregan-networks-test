# Oregan Network Test - Dan Foad

Hosted here: https://oregan-networks-foad.s3.eu-west-1.amazonaws.com/index.html

Design considerations:
 - Experience must support fully mouse-less interactions for use with a TV remote/controller
 - However, should still support mouse-level journeys like clicking between inputs, clicking the keyboard, and clicking inside of the input to move the cursor
 - Because of the mouse-less focus, we need a focus manager to help control when we show/hide the keyboard, and also to determine which input the keyboard is currently connected to
 - Supporting a cursor for our fake input is relatively trivial if the cursor is always at the end of the current input value, but if we instead allow the cursor to be at any position and allow the user to click around to move the cursor this becomes quite complex
 - We need a way of determining where exactly to place the cursor within the string without it being susceptible to rendering quirks with different text rendering engines, this can be achieved by having a hidden version of the input text that is only the characters before the cursor, and then placing the cursor at the end of this
 - For allowing the user to click around to move the cursor, this can be achieved by putting each character of the string into its own span and then adding click listeners to those


 Future work:
  - Support different input types with input validation, e.g. numbers only for a PIN input
  - Allow text selection by dragging the mouse within the input
  - Allow for both on-screen keyboard input and raw text entry, some devices have keyboards on their remotes/controllers or allow voice-to-text entry
  - Some devices have their own on-screen keyboard (e.g. AppleTV), so would be nice to support the hiding of this on-screen keyboard if the device already has one
  - Accessibility features, particularly screen-reader support
  - Internationalisation instead of hard-coding text