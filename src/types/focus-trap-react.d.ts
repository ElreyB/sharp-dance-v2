declare module 'focus-trap-react' {
  import * as React from 'react';

  export interface FocusTrapProps {
    active?: boolean;
    paused?: boolean;
    focusTrapOptions?: {
      [key: string]: any;
      escapeDeactivates?: boolean | (() => boolean);
      clickOutsideDeactivates?: boolean | (() => boolean);
      initialFocus?: string | (() => HTMLElement | string | null);
      returnFocusOnDeactivate?: boolean;
    };
    onActivate?: () => void;
    onDeactivate?: () => void;
    children: React.ReactNode;
  }

  const FocusTrap: React.FC<FocusTrapProps>;

  export default FocusTrap;
}
