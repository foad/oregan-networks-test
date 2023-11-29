declare module "react-simple-keyboard" {
  export type KeyboardType = {
    modules: {
      keyNavigation: {
        [key: string]: () => void;
      };
    };
  };
  export interface KeyboardProps {
    [key: string]: unknown;
  }
  export class KeyboardReact extends React.Component<KeyboardProps> {}
}
declare module "simple-keyboard-key-navigation";
