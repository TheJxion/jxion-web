/**
 * Jxion Stack — Button Component
 * Phase Reference: Phase 2 — Component Registry & Styling Runtime
 * Description: Button component (matching ustad UstadButton pattern)
 * MIGRATED FROM: ustad-web/shared/src/lib/Button/UstadButton/index.tsx
 */

import React from "react";
// Note: Direct SCSS import matches ustad pattern
// For runtime style loading, use loadStyles() from @jxion/styles
import styles from "../../styles/modules/Button.module.scss";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "cta"
  | "cta-nav"
  | "title";

export type ButtonSize = "small" | "medium" | "large";

export interface ButtonProps {
  type?: "button" | "submit" | "reset";
  variant?: ButtonVariant;
  size?: ButtonSize;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  disabled?: boolean;
  title?: string;
  "data-testid"?: string;
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  variant = "primary",
  size = "medium",
  onClick,
  children,
  className,
  isLoading = false,
  icon,
  iconPosition = "left",
  disabled = false,
  title,
  "data-testid": dataTestId,
}) => {
  return (
    <button
      type={type}
      className={`${styles["button"]} ${styles[`button--${variant}`]} ${
        styles[`button--${size}`]
      } ${className || ""}`}
      onClick={onClick}
      disabled={isLoading || disabled}
      title={title}
      data-testid={dataTestId}
    >
      {iconPosition === "left" && icon}
      {isLoading ? "Loading..." : title || children}
      {iconPosition === "right" && icon}
    </button>
  );
};

export default Button;
