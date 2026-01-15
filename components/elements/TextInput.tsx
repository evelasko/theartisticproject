"use client";

import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes, useState, useCallback } from "react";
import clsx from "clsx";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  wrapperClassName?: string;
}

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  wrapperClassName?: string;
}

/**
 * TextField Component
 * 
 * A text input field with an animated underline that reveals on focus.
 * Based on the Naya Studio design with multi-layered underline structure.
 * 
 * Features:
 * - Animated underline (left to right on focus)
 * - Base underline always visible (subtle)
 * - Transparent background with white text
 * - Simple fade-out on blur
 * 
 * @example
 * ```tsx
 * <TextField placeholder="Name" required />
 * ```
 */
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ className, wrapperClassName, onFocus, onBlur, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasBeenFocused, setHasBeenFocused] = useState(false);

    const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      setHasBeenFocused(true);
      onFocus?.(e);
    }, [onFocus]);

    const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    }, [onBlur]);

    return (
      <div className={clsx("input-field-wrapper", wrapperClassName)}>
        <input
          ref={ref}
          className={clsx("input-field", className)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        <div className="input-line-wrapper">
          <div className="input-line-block">
            <div className={clsx(
              "input-line-base",
              { "is-focused": isFocused }
            )} />
            <div className={clsx(
              "input-line-animate",
              { 
                "is-focused": isFocused,
                "is-blurring": !isFocused && hasBeenFocused
              }
            )}>
              <div className="input-line-fill" />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

TextField.displayName = "TextField";

/**
 * TextArea Component
 * 
 * A textarea field with the same animated underline as TextField.
 * Supports multi-line input with adjustable rows.
 * 
 * @example
 * ```tsx
 * <TextArea placeholder="How can we help you" rows={5} />
 * ```
 */
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, wrapperClassName, rows = 5, onFocus, onBlur, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasBeenFocused, setHasBeenFocused] = useState(false);

    const handleFocus = useCallback((e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(true);
      setHasBeenFocused(true);
      onFocus?.(e);
    }, [onFocus]);

    const handleBlur = useCallback((e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    }, [onBlur]);

    return (
      <div className={clsx("input-field-wrapper is-textarea", wrapperClassName)}>
        <textarea
          ref={ref}
          className={clsx("input-field is-textarea", className)}
          rows={rows}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        <div className="input-line-wrapper">
          <div className="input-line-block">
            <div className={clsx(
              "input-line-base",
              { "is-focused": isFocused }
            )} />
            <div className={clsx(
              "input-line-animate",
              { 
                "is-focused": isFocused,
                "is-blurring": !isFocused && hasBeenFocused
              }
            )}>
              <div className="input-line-fill" />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

TextArea.displayName = "TextArea";