"use client"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import Link from "next/link"
import React, { forwardRef } from "react"
import { Loader2 } from "lucide-react"

const ctaVariants = cva(
  "inline-flex items-center justify-center rounded-full font-tajawal-semibold text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-gradient-to-r from-gradient-start via-primary to-gradient-end shadow-button text-primary-foreground font-bold hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]",
        secondary: "border-2 border-primary bg-transparent shadow-border hover:bg-primary hover:text-primary-foreground hover:border-primary hover:shadow-button active:scale-[0.98]",
        tertiary: "bg-transparent text-brown-text hover:bg-primary/10 active:bg-primary/20 transition-colors",
        disabled: "bg-primary/20 text-primary/40 border border-primary/30 cursor-not-allowed",
      },
      size: {
        default: "h-12 px-8",
        sm: "h-11 px-6 text-sm",
        lg: "h-14 px-10",
        icon: "h-11 w-11 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

interface CTAButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof ctaVariants> {
  href?: string
  isLoading?: boolean
}

const CTAButton = forwardRef<HTMLButtonElement, CTAButtonProps>(
  ({ className, children, variant, size, href, isLoading, ...props }, ref) => {
    const buttonContent = (
      <>
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        {children}
      </>
    )

    const buttonClasses = cn(ctaVariants({ variant, size, className }))

    if (href) {
      // Link accepts most HTML anchor attributes, omit button-specific props
      const linkProps = { ...props } as Omit<React.ComponentPropsWithoutRef<typeof Link>, 'href' | 'className'>
      return (
        <motion.div whileHover={!isLoading ? { scale: 1.02 } : {}} whileTap={!isLoading ? { scale: 0.98 } : {}}>
          <Link href={href} className={buttonClasses} {...linkProps}>
            {buttonContent}
          </Link>
        </motion.div>
      )
    }

    return (
      <motion.div whileHover={!isLoading ? { scale: 1.02 } : {}} whileTap={!isLoading ? { scale: 0.98 } : {}}>
        <button ref={ref} className={buttonClasses} {...props}>
          {buttonContent}
        </button>
      </motion.div>
    )
  }
)

CTAButton.displayName = "CTAButton"

export { CTAButton, ctaVariants }
export type { CTAButtonProps }
