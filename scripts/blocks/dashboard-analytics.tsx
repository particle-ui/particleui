"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, TrendingDown, Users, DollarSign, Activity, ShoppingCart, MoreHorizontal } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string
  delta: string
  positive: boolean
  icon: React.ReactNode
}

function MetricCard({ title, value, delta, positive, icon }: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-[var(--color-text-3)]">{title}</CardTitle>
        <div className="text-[var(--color-text-3)]">{icon}</div>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        <div className="text-2xl font-bold tabular-nums">{value}</div>
        <div className={["flex items-center gap-1 text-xs", positive ? "text-[oklch(72%_0.2_140)]" : "text-[oklch(68%_0.22_25)]"].join(" ")}>
          {positive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {delta} from last month
        </div>
      </CardContent>
    </Card>
  )
}

const metrics: MetricCardProps[] = [
  { title: "Total Revenue", value: "$45,231", delta: "+20.1%", positive: true, icon: <DollarSign size={16} /> },
  { title: "Active Users", value: "2,350", delta: "+15.3%", positive: true, icon: <Users size={16} /> },
  { title: "Churn Rate", value: "2.4%", delta: "-0.8%", positive: true, icon: <Activity size={16} /> },
  { title: "New Orders", value: "1,204", delta: "+8.2%", positive: true, icon: <ShoppingCart size={16} /> },
]

const recentOrders = [
  { id: "INV-001", customer: "Alice Johnson", email: "alice@example.com", amount: "$240", status: "paid", initials: "AJ" },
  { id: "INV-002", customer: "Bob Smith", email: "bob@example.com", amount: "$150", status: "pending", initials: "BS" },
  { id: "INV-003", customer: "Carol White", email: "carol@example.com", amount: "$890", status: "paid", initials: "CW" },
  { id: "INV-004", customer: "Dave Lee", email: "dave@example.com", amount: "$430", status: "failed", initials: "DL" },
  { id: "INV-005", customer: "Eve Davis", email: "eve@example.com", amount: "$120", status: "paid", initials: "ED" },
]

const statusVariant: Record<string, "default" | "outline" | "secondary"> = {
  paid: "default",
  pending: "outline",
  failed: "secondary",
}

const topPages = [
  { page: "/docs/components/button", views: 14230, pct: 92 },
  { page: "/docs/getting-started", views: 9810, pct: 63 },
  { page: "/docs/components/card", views: 7640, pct: 49 },
  { page: "/docs/theming", views: 5020, pct: 32 },
  { page: "/pricing", views: 3100, pct: 20 },
]

function DashboardAnalytics() {
  const [range, setRange] = React.useState("30d")

  return (
    <div className="flex flex-col gap-6 p-6 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[var(--color-text-1)]">Analytics</h1>
          <p className="text-sm text-[var(--color-text-3)]">Track your key metrics</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={range} onValueChange={setRange}>
            <SelectTrigger className="w-28 h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button size="sm">Export</Button>
        </div>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {metrics.map((m) => <MetricCard key={m.title} {...m} />)}
      </div>

      {/* Bottom section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent orders */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base">Recent Orders</CardTitle>
              <CardDescription>Latest 5 transactions</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal size={16} />
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead className="hidden sm:table-cell">Invoice</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((o) => (
                  <TableRow key={o.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-7 w-7">
                          <AvatarFallback className="text-[10px]">{o.initials}</AvatarFallback>
                        </Avatar>
                        <div className="hidden sm:block">
                          <div className="text-sm font-medium">{o.customer}</div>
                          <div className="text-xs text-[var(--color-text-3)]">{o.email}</div>
                        </div>
                        <div className="sm:hidden text-sm">{o.customer}</div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-sm text-[var(--color-text-3)]">{o.id}</TableCell>
                    <TableCell>
                      <Badge variant={statusVariant[o.status]} className="capitalize text-xs">
                        {o.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right text-sm font-medium tabular-nums">{o.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Top pages */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Top Pages</CardTitle>
            <CardDescription>By unique views this month</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {topPages.map((p) => (
              <div key={p.page} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[var(--color-text-2)] truncate max-w-[160px]">{p.page}</span>
                  <span className="text-[var(--color-text-3)] tabular-nums shrink-0 ml-2">{p.views.toLocaleString()}</span>
                </div>
                <Progress value={p.pct} className="h-1.5" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export { DashboardAnalytics }
