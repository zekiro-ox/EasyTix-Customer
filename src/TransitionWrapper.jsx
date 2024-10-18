import React, { forwardRef } from "react";
import { CSSTransition } from "react-transition-group";

const TransitionWrapper = forwardRef(({ children, ...props }, ref) => {
  return (
    <CSSTransition nodeRef={ref} {...props}>
      {children}
    </CSSTransition>
  );
});

export default TransitionWrapper;
