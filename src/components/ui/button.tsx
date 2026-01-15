"use client"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import Link from "next/link"
import React, { forwardRef } from "react"
import { Loader2 } from "lucide-react"

// Unified button variants using class-variance-authority
const buttonVariants = cva(
  // Base styles - unified across all variants
  "inline-flex items-center justify-center font-tajawal-semibold text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 touch-manipulation",
  {
    variants: {
      variant: {
        // Primary: Gradient with rounded-full and shadow-button
        primary: "bg-gradient-to-r from-gradient-start via-primary to-gradient-end text-white rounded-full shadow-button font-bold hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]",
        
        // Secondary: Border with rounded-full and shadow-border
        secondary: "border-2 border-primary bg-transparent text-primary rounded-full shadow-[0_4px_12px_rgba(192,132,26,0.15)] hover:bg-primary hover:text-white hover:border-primary hover:shadow-button active:scale-[0.98]",
        
        // Danger: Red gradient with rounded-full and shadow
        danger: "bg-gradient-to-r from-red-600 to-danger-red text-white rounded-full shadow-[0_10px_25px_rgba(239,68,68,0.3)] font-bold hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]",
        
        // Ghost: Transparent with rounded-xl, no shadow
        ghost: "bg-transparent text-brown-text rounded-xl hover:bg-primary/10 active:bg-primary/20",
        
        // Tertiary: Alias for ghost (backward compatibility)
        tertiary: "bg-transparent text-brown-text rounded-xl hover:bg-primary/10 active:bg-primary/20",
        
        // Disabled: Grayed out appearance
        disabled: "bg-primary/20 text-primary/40 border border-primary/30 rounded-full cursor-not-allowed",
        
        // Outline: Border with rounded-xl, minimal shadow
        outline: "border border-brown-text/30 bg-background text-brown-text rounded-xl hover:bg-cream-bg hover:border-primary/50 shadow-sm",
        
        // Link: Text only, no background
        link: "text-primary underline-offset-4 hover:underline bg-transparent rounded-xl",
      },
      size: {
        default: "min-h-[44px] h-12 px-8",
        sm: "min-h-[44px] h-11 px-6 text-sm",
        lg: "min-h-[44px] h-14 px-10 text-base",
        icon: "min-h-[44px] min-w-[44px] h-11 w-11 p-0 rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string
  isLoading?: boolean
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant, size, href, isLoading, asChild, ...props }, ref) => {
    const buttonContent = (
      <>
        {isLoading ? <Loader2 className="me-2 h-4 w-4 animate-spin" /> : null}
        {children}
      </>
    )

    const buttonClasses = cn(buttonVariants({ variant, size, className }))

    // If href is provided, render as Link
    if (href) {
      const linkProps = { ...props } as Omit<React.ComponentPropsWithoutRef<typeof Link>, 'href' | 'className'>
      return (
        <motion.div 
          whileHover={!isLoading ? { scale: 1.02 } : {}} 
          whileTap={!isLoading ? { scale: 0.98 } : {}}
        >
          <Link href={href} className={buttonClasses} {...linkProps}>
            {buttonContent}
          </Link>
        </motion.div>
      )
    }

    // Render as button
    return (
      <motion.div 
        whileHover={!isLoading && !props.disabled ? { scale: 1.02 } : {}} 
        whileTap={!isLoading && !props.disabled ? { scale: 0.98 } : {}}
      >
        <button ref={ref} className={buttonClasses} disabled={isLoading || props.disabled} {...props}>
          {buttonContent}
        </button>
      </motion.div>
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }
// ButtonProps is already exported as interface above
