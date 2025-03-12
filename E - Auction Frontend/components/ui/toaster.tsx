"use client"

import { useToast } from "@/components/ui/use-toast"
import { X } from "lucide-react"
import { useEffect, useState } from "react"

export function Toaster() {
  const { toasts } = useToast()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 w-full max-w-md">
      {toasts.map((toast, index) => (
        <div
          key={index}
          className={`rounded-md border p-4 shadow-md ${
            toast.variant === "destructive" ? "bg-destructive text-destructive-foreground" : "bg-background"
          }`}
        >
          <div className="flex justify-between items-start gap-2">
            <div>
              {toast.title && <h3 className="font-medium">{toast.title}</h3>}
              {toast.description && <p className="text-sm">{toast.description}</p>}
            </div>
            <button className="rounded-full p-1 hover:bg-muted">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

