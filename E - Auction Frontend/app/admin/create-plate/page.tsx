"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CreatePlatePage() {
  const { toast } = useToast()
  const router = useRouter()

  const [plateNumber, setPlateNumber] = useState("")
  const [description, setDescription] = useState("")
  const [deadline, setDeadline] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate deadline is in the future
    if (new Date(deadline) <= new Date()) {
      toast({
        title: "Invalid deadline",
        description: "Deadline must be in the future",
        variant: "destructive",
      })
      return
    }

    // In a real app, this would submit to the API
    toast({
      title: "Plate created",
      description: `Plate ${plateNumber} has been created successfully`,
    })

    // Redirect to admin page
    router.push("/admin")
  }

  return (
    <div className="container mx-auto py-6">
      <Toaster />
      <Link href="/admin" className="flex items-center gap-1 text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" />
        Back to admin dashboard
      </Link>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Create New License Plate</CardTitle>
          <CardDescription>Add a new license plate for bidding</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="plate-number">Plate Number</Label>
              <Input
                id="plate-number"
                placeholder="e.g. AA 777 BB"
                value={plateNumber}
                onChange={(e) => setPlateNumber(e.target.value)}
                required
              />
              <p className="text-sm text-muted-foreground">Enter a unique license plate number</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the special features of this plate"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="deadline">Bidding Deadline</Label>
              <Input
                id="deadline"
                type="datetime-local"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                required
              />
              <p className="text-sm text-muted-foreground">Set the date and time when bidding will end</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.push("/admin")}>
              Cancel
            </Button>
            <Button type="submit">Create Plate</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

