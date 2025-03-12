import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { Search, Clock, ArrowUpDown } from "lucide-react"

export default function Home() {
  // This would normally fetch data from the API
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

  return (
    <div className="container mx-auto py-6">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Auto Plate Bidding</h1>
        <div className="flex gap-4">
          <Link href="/login">
            <Button variant="outline">Login</Button>
          </Link>
          <Link href="/dashboard">
            <Button>My Bids</Button>
          </Link>
        </div>
      </header>

      <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search plate numbers..." className="pl-8" />
        </div>
        <div className="flex gap-2">
          <Select defaultValue="deadline">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="deadline">Deadline (Soonest)</SelectItem>
              <SelectItem value="high_bid">Highest Bid</SelectItem>
              <SelectItem value="plate_number">Plate Number</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plates.map((plate) => (
          <Link href={`/plates/${plate.id}`} key={plate.id}>
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">{plate.plate_number}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {new Date(plate.deadline).toLocaleDateString()} ({new Date(plate.deadline).toLocaleTimeString()})
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{plate.description}</p>
                <div className="font-semibold">Current Bid: ${plate.high_bid.toLocaleString()}</div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">View Details</Button>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

