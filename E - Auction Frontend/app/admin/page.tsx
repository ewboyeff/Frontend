"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Pencil, Trash2, Search } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function AdminPage() {
  const { toast } = useToast()

  // Mock data - would normally be fetched from API
  const plates = [
    {
      id: 1,
      plate_number: "01 777 AAA",
      description: "Premium plate with lucky numbers",
      deadline: "2025-04-15T12:00:00",
      high_bid: 2500,
      is_active: true,
      bids_count: 3,
    },
    {
      id: 2,
      plate_number: "01 100 UZB",
      description: "Patriotic plate with round number",
      deadline: "2025-04-10T18:00:00",
      high_bid: 2200,
      is_active: true,
      bids_count: 5,
    },
    {
      id: 3,
      plate_number: "01 001 AUF",
      description: "Capital city special plate",
      deadline: "2025-04-20T15:30:00",
      high_bid: 2800,
      is_active: true,
      bids_count: 2,
    },
    {
      id: 4,
      plate_number: "01 777 XON",
      description: "Lucky numbers from Samarkand",
      deadline: "2025-04-18T14:00:00",
      high_bid: 2350,
      is_active: false,
      bids_count: 0,
    },
    {
      id: 5,
      plate_number: "01 007 MUS",
      description: "Bukhara special sequence",
      deadline: "2025-04-25T16:45:00",
      high_bid: 2650,
      is_active: true,
      bids_count: 4,
    },
    {
      id: 6,
      plate_number: "01 707 XON",
      description: "Bukhara special sequence",
      deadline: "2025-04-25T16:45:00",
      high_bid: 2450,
      is_active: true,
      bids_count: 4,
    },
    {
      id: 7,
      plate_number: "01 001 BBB",
      description: "Bukhara special sequence",
      deadline: "2025-04-25T16:45:00",
      high_bid: 2950,
      is_active: true,
      bids_count: 4,
    },
    {
      id: 8,
      plate_number: "01 101 CCC",
      description: "Bukhara special sequence",
      deadline: "2025-04-25T16:45:00",
      high_bid: 2750,
      is_active: true,
      bids_count: 4,
    },
    {
      id: 9,
      plate_number: "01 007 ABC",
      description: "Bukhara special sequence",
      deadline: "2425-04-25T16:45:00",
      high_bid: 2650,
      is_active: true,
      bids_count: 4,
    },


  ]

  const handleDeletePlate = (plateId: number) => {
    // In a real app, this would call the API to delete the plate
    const plate = plates.find((p) => p.id === plateId)

    if (plate?.bids_count && plate.bids_count > 0) {
      toast({
        title: "Cannot delete plate",
        description: "This plate has active bids and cannot be deleted",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Plate deleted",
      description: `Plate ${plate?.plate_number} has been deleted`,
    })
  }

  const handleToggleActive = (plateId: number) => {
    // In a real app, this would call the API to toggle the active status
    const plate = plates.find((p) => p.id === plateId)

    toast({
      title: plate?.is_active ? "Plate deactivated" : "Plate activated",
      description: `Plate ${plate?.plate_number} has been ${plate?.is_active ? "deactivated" : "activated"}`,
    })
  }

  const isDeadlinePassed = (deadline: string) => new Date(deadline) < new Date()

  return (
    <div className="container mx-auto py-6">
      <Toaster />
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex gap-4">
          <Link href="/">
            <Button variant="outline">View Frontend</Button>
          </Link>
          <Link href="/admin/create-plate">
            <Button>
              <Plus className="h-4 w-4 mr-1" />
              New Plate
            </Button>
          </Link>
        </div>
      </header>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Manage License Plates</CardTitle>
          <CardDescription>Create, edit, and manage auto license plates for bidding</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative w-full max-w-sm mb-6">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search plates..." className="pl-8" />
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Plate Number</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Highest Bid</TableHead>
                  <TableHead>Bids</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {plates.map((plate) => (
                  <TableRow key={plate.id}>
                    <TableCell className="font-medium">{plate.plate_number}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{plate.description}</TableCell>
                    <TableCell>{new Date(plate.deadline).toLocaleDateString()}</TableCell>
                    <TableCell>
                      {isDeadlinePassed(plate.deadline) ? (
                        <Badge variant="secondary">Ended</Badge>
                      ) : plate.is_active ? (
                        <Badge className="bg-green-600">Active</Badge>
                      ) : (
                        <Badge variant="outline">Inactive</Badge>
                      )}
                    </TableCell>
                    <TableCell>{plate.high_bid ? `$${plate.high_bid.toLocaleString()}` : "No bids"}</TableCell>
                    <TableCell>{plate.bids_count}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleActive(plate.id)}
                          disabled={isDeadlinePassed(plate.deadline)}
                        >
                          {plate.is_active ? "Deactivate" : "Activate"}
                        </Button>
                        <Link href={`/admin/edit-plate/${plate.id}`}>
                          <Button variant="outline" size="icon">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDeletePlate(plate.id)}
                          disabled={plate.bids_count > 0}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

