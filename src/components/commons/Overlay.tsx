import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

export interface OverlayProps {
  show: boolean;
  children: React.ReactNode;
  onEscPressed?: () => void;
}

export const Overlay: React.FunctionComponent<OverlayProps> = ({
  show,
  children,
  onEscPressed,
}: OverlayProps) => {
  const elmRef = useRef<Element | undefined>();
  const [, setValue] = useState(0);
  useEffect(() => {
    if (!show) {
      return;
    }
    const elm = document.createElement("div");
    elm.style.position = "fixed";
    elm.style.top = "0";
    elm.style.left = "0";
    elm.style.right = "0";
    elm.style.bottom = "0";
    elm.style.zIndex = "1050";
    elm.style.display = "flex";
    elm.style.justifyContent = "center";
    elm.style.alignItems = "center";
    elm.style.background = "rgba(0, 0, 0, 0.7)";
    elmRef.current = elm;
    document.body.appendChild(elm);

    setValue((value) => value + 1);
    return (): void => {
      document.body.removeChild(elm);
    };
  }, [show]);

  const handleDocumentKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape" && onEscPressed) {
      onEscPressed();
    }
  };

  useEffect(() => {
    if (!show) {
      return;
    }
    document.addEventListener("keydown", handleDocumentKeyDown);
    return (): void => {
      document.removeEventListener("keydown", handleDocumentKeyDown);
    };
  }, [show]);
  if (!show || !elmRef.current) {
    return null;
  }
  return ReactDOM.createPortal(children, elmRef.current);
};
