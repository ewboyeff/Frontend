"use client"

// Simplified version of the shadcn/ui toast hook
import { useState } from "react"

type ToastProps = {
  title?: string
  description?: string
  variant?: "default" | "destructive"
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const toast = (props: ToastProps) => {
    setToasts([...toasts, props])

    // Remove toast after 3 seconds
    setTimeout(() => {
      setToasts((currentToasts) => currentToasts.filter((t) => t !== props))
    }, 3000)
  }

  return { toast, toasts }
}

