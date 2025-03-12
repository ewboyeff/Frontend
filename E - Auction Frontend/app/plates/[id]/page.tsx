"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { ArrowLeft, Clock, User } from "lucide-react"
import Link from "next/link"

export default function PlateDetailsPage({ params }: { params: { id: string } }) {
  const { toast } = useToast()
  const [bidAmount, setBidAmount] = useState("")

  // Mock data - would normally be fetched from API
  const plate = {
    id: Number.parseInt(params.id),
    plate_number: "01 777 AAA",
    description:
      "Premium plate with lucky numbers. This plate features a sequence of lucky sevens that are highly sought after by collectors and enthusiasts.",
    deadline: "2025-04-15T12:00:00",
    high_bid: 1500,
    is_active: true,
    bids: [
      { id: 101, amount: 1500, user: "user123", created_at: "2025-03-01T14:30:00" },
      { id: 102, amount: 1400, user: "bidder456", created_at: "2025-03-01T10:15:00" },
      { id: 103, amount: 1300, user: "collector789", created_at: "2025-02-28T16:45:00" },
    ],
  }

  const handleBidSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const amount = Number.parseFloat(bidAmount)

    if (amount <= plate.high_bid) {
      toast({
        title: "Bid too low",
        description: "Your bid must be higher than the current highest bid.",
        variant: "destructive",
      })
      return
    }

    // In a real app, this would submit to the API
    toast({
      title: "Bid placed successfully!",
      description: `You've placed a bid of $${amount.toLocaleString()} on ${plate.plate_number}`,
    })

    // Reset form
    setBidAmount("")
  }

  const isDeadlinePassed = new Date(plate.deadline) < new Date()

  return (
    <div className="container mx-auto py-6">
      <Toaster />
      <Link href="/" className="flex items-center gap-1 text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" />
        Back to all plates
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">{plate.plate_number}</CardTitle>
              <CardDescription className="flex items-center gap-1 text-base">
                <Clock className="h-4 w-4" />
                Bidding {isDeadlinePassed ? "ended" : "ends"} on: {new Date(plate.deadline).toLocaleDateString()} at{" "}
                {new Date(plate.deadline).toLocaleTimeString()}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p>{plate.description}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Current Highest Bid</h3>
                <p className="text-2xl font-bold">${plate.high_bid.toLocaleString()}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Bid History</h3>
                <div className="space-y-3">
                  {plate.bids.map((bid) => (
                    <div key={bid.id} className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{bid.user}</span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="font-semibold">${bid.amount.toLocaleString()}</span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(bid.created_at).toLocaleDateString()}{" "}
                          {new Date(bid.created_at).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Place Your Bid</CardTitle>
              <CardDescription>Enter an amount higher than the current bid</CardDescription>
            </CardHeader>
            <form onSubmit={handleBidSubmit}>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="bid-amount">Bid Amount ($)</Label>
                    <Input
                      id="bid-amount"
                      type="number"
                      placeholder="Enter amount"
                      min={plate.high_bid + 1}
                      step="1"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      required
                      disabled={isDeadlinePassed || !plate.is_active}
                    />
                  </div>

                  <div className="text-sm">
                    <p className="text-muted-foreground">Minimum bid: ${(plate.high_bid + 1).toLocaleString()}</p>
                    {isDeadlinePassed && <p className="text-destructive mt-2">Bidding has ended for this plate</p>}
                    {!plate.is_active && !isDeadlinePassed && (
                      <p className="text-destructive mt-2">This plate is no longer available for bidding</p>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isDeadlinePassed || !plate.is_active}>
                  Place Bid
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}

