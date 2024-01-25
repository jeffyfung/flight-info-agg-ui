import { useEffect, useRef } from "react";

interface OutsideClickHandlerProps {
  children: React.ReactNode;
  onOutsideClick: () => void;
}

export const OutsideClickHandler: React.FC<OutsideClickHandlerProps> = ({ children, onOutsideClick }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target as HTMLElement)) {
      onOutsideClick();
    }
  };

  useEffect(() => {
    // Attach the event listener when the component mounts
    document.addEventListener("click", handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return <div ref={wrapperRef!}>{children}</div>;
};
