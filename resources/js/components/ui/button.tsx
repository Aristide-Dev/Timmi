import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow,background-color,border-color] duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:ring-[color:var(--primary-500)]/50 focus-visible:ring-[3px] aria-invalid:ring-[color:var(--destructive-500)]/20 aria-invalid:border-[color:var(--destructive-500)]",
  {
    variants: {
      variant: {
        default:
          "bg-[color:var(--primary-500)] text-white shadow-sm hover:bg-[color:var(--primary-600)] hover:shadow-md active:bg-[color:var(--primary-700)]",
        destructive:
          "bg-[color:var(--destructive-500)] text-white shadow-sm hover:bg-[color:var(--destructive-600)] hover:shadow-md active:bg-[color:var(--destructive-700)] focus-visible:ring-[color:var(--destructive-500)]/20",
        outline:
          "border border-[color:var(--primary-200)] bg-background text-[color:var(--primary-700)] shadow-sm hover:bg-[color:var(--primary-50)] hover:border-[color:var(--primary-300)] hover:text-[color:var(--primary-800)] active:bg-[color:var(--primary-100)]",
        secondary:
          "bg-[color:var(--accent-100)] text-[color:var(--accent-800)] shadow-sm hover:bg-[color:var(--accent-200)] hover:text-[color:var(--accent-900)] active:bg-[color:var(--accent-300)]",
        ghost: 
          "text-[color:var(--primary-700)] hover:bg-[color:var(--primary-50)] hover:text-[color:var(--primary-800)] active:bg-[color:var(--primary-100)]",
        link: 
          "text-[color:var(--primary-600)] underline-offset-4 hover:underline hover:text-[color:var(--primary-700)] active:text-[color:var(--primary-800)]",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
