"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Clock, ArrowUp, Trash2 } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function DashboardPage() {
  const { toast } = useToast()

  // Mock data - would normally be fetched from API
  const myBids = [
    {
      id: 10,
      amount: 1500,
      plate: {
        id: 1,
        plate_number: "01 777 AAA",
        deadline: "2025-04-15T12:00:00",
        high_bid: 1500,
        high_bidder_is_me: true,
      },
      created_at: "2025-03-01T14:30:00",
    },
    {
      id: 11,
      amount: 2000,
      plate: {
        id: 2,
        plate_number: "01 100 UZB",
        deadline: "2025-04-06T18:00:00",
        high_bid: 2200,
        high_bidder_is_me: false,
      },
      created_at: "2025-04-02T09:45:00",
    },
    {
      id: 12,
      amount: 1800,
      plate: {
        id: 3,
        plate_number: "01 101 MUS",
        deadline: "2025-04-20T15:30:00",
        high_bid: 1800,
        high_bidder_is_me: true,
      },
      created_at: "2025-04-03T11:20:00",
    },
  ]

  const handleDeleteBid = (bidId: number) => {
    // In a real app, this would call the API to delete the bid
    toast({
      title: "Bid deleted",
      description: "Your bid has been successfully deleted",
    })
  }

  const handleUpdateBid = (bidId: number) => {
    // In a real app, this would navigate to a bid update page or show a modal
    toast({
      title: "Update bid",
      description: "This would open a form to update your bid",
    })
  }

  const isDeadlinePassed = (deadline: string) => new Date(deadline) < new Date()

  return (
    <div className="container mx-auto py-6">
      <Toaster />
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Dashboard</h1>
        <div className="flex gap-4">
          <Link href="/">
            <Button variant="outline">Browse Plates</Button>
          </Link>
          {/* Admin link would only show for admin users */}
          <Link href="/admin">
            <Button variant="outline">Admin Panel</Button>
          </Link>
        </div>
      </header>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="active">Active Bids</TabsTrigger>
          <TabsTrigger value="history">Bid History</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myBids
              .filter((bid) => !isDeadlinePassed(bid.plate.deadline))
              .map((bid) => (
                <Card key={bid.id} className="h-full">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{bid.plate.plate_number}</CardTitle>
                      {bid.plate.high_bidder_is_me ? (
                        <Badge className="bg-green-600">Winning</Badge>
                      ) : (
                        <Badge variant="destructive">Outbid</Badge>
                      )}
                    </div>
                    <CardDescription className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      Ends: {new Date(bid.plate.deadline).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Your bid:</span>
                        <span className="font-semibold">${bid.amount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Highest bid:</span>
                        <span className="font-semibold">${bid.plate.high_bid.toLocaleString()}</span>
                      </div>
                      {!bid.plate.high_bidder_is_me && (
                        <div className="text-destructive text-sm mt-2">
                          You need to increase your bid by ${(bid.plate.high_bid - bid.amount + 1).toLocaleString()}
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between gap-2">
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => handleDeleteBid(bid.id)}>
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                    <Button size="sm" className="flex-1" onClick={() => handleUpdateBid(bid.id)}>
                      <ArrowUp className="h-4 w-4 mr-1" />
                      Update Bid
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
        <TabsContent value="history" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myBids
              .filter((bid) => isDeadlinePassed(bid.plate.deadline))
              .map((bid) => (
                <Card key={bid.id} className="h-full">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{bid.plate.plate_number}</CardTitle>
                      {bid.plate.high_bidder_is_me ? (
                        <Badge className="bg-green-600">Won</Badge>
                      ) : (
                        <Badge variant="secondary">Lost</Badge>
                      )}
                    </div>
                    <CardDescription className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      Ended: {new Date(bid.plate.deadline).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Your bid:</span>
                        <span className="font-semibold">${bid.amount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Final price:</span>
                        <span className="font-semibold">${bid.plate.high_bid.toLocaleString()}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href={`/plates/${bid.plate.id}`} className="w-full">
                      <Button variant="outline" className="w-full">
                        View Details
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

