"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Upload, AlertTriangle } from "lucide-react"

function SettingsPage() {
  const [notifications, setNotifications] = React.useState({
    email: true,
    push: false,
    marketing: false,
    security: true,
  })

  return (
    <div className="flex flex-col gap-6 p-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-xl font-bold text-[var(--color-text-1)]">Settings</h1>
        <p className="text-sm text-[var(--color-text-3)]">Manage your account and preferences</p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        {/* Profile */}
        <TabsContent value="profile" className="flex flex-col gap-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Profile</CardTitle>
              <CardDescription>Your public information</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="text-xl">JS</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm" className="gap-2">
                  <Upload size={14} /> Upload photo
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label>First name</Label>
                  <Input defaultValue="Jane" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label>Last name</Label>
                  <Input defaultValue="Smith" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>Email</Label>
                <Input type="email" defaultValue="jane@example.com" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>Bio</Label>
                <Input placeholder="Tell us about yourself" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>Timezone</Label>
                <Select defaultValue="utc-5">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc-8">Pacific Time (UTC-8)</SelectItem>
                    <SelectItem value="utc-5">Eastern Time (UTC-5)</SelectItem>
                    <SelectItem value="utc+0">UTC</SelectItem>
                    <SelectItem value="utc+1">Central European (UTC+1)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end">
                <Button>Save changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security" className="flex flex-col gap-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Change Password</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label>Current password</Label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>New password</Label>
                <Input type="password" placeholder="At least 8 characters" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>Confirm new password</Label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <div className="flex justify-end">
                <Button>Update password</Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Two-factor Authentication</CardTitle>
              <CardDescription>Add an extra layer of security to your account</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium">Authenticator app</span>
                <span className="text-xs text-[var(--color-text-3)]">Not configured</span>
              </div>
              <Button variant="outline" size="sm">Enable</Button>
            </CardContent>
          </Card>
          <Card className="border-[oklch(68%_0.22_25_/_0.3)]">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2 text-[oklch(68%_0.22_25)]">
                <AlertTriangle size={16} /> Danger Zone
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium">Delete account</span>
                <span className="text-xs text-[var(--color-text-3)]">Permanently remove your account and all data</span>
              </div>
              <Button variant="destructive" size="sm">Delete</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="flex flex-col gap-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Notification Preferences</CardTitle>
              <CardDescription>Choose what you hear about</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col divide-y divide-[var(--color-border)]">
              {(
                [
                  { key: "email", label: "Email notifications", description: "Receive updates via email" },
                  { key: "push", label: "Push notifications", description: "Browser push notifications" },
                  { key: "marketing", label: "Product updates", description: "New features and changelog" },
                  { key: "security", label: "Security alerts", description: "Sign-ins and password changes" },
                ] as const
              ).map(({ key, label, description }) => (
                <div key={key} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium">{label}</span>
                    <span className="text-xs text-[var(--color-text-3)]">{description}</span>
                  </div>
                  <Switch
                    checked={notifications[key]}
                    onCheckedChange={(v) => setNotifications((n) => ({ ...n, [key]: v }))}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing */}
        <TabsContent value="billing" className="flex flex-col gap-4 mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base">Current Plan</CardTitle>
                <CardDescription>Manage your subscription</CardDescription>
              </div>
              <Badge className="bg-[var(--color-accent)] text-[var(--color-bg)] border-0">Pro</Badge>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="rounded-lg border border-[var(--color-border)] p-4 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-sm">Pro Plan</div>
                  <div className="text-xs text-[var(--color-text-3)]">$19/month · renews Jan 1, 2027</div>
                </div>
                <Button variant="outline" size="sm">Cancel plan</Button>
              </div>
              <Separator />
              <div className="flex flex-col gap-1">
                <div className="text-sm font-medium">Payment method</div>
                <div className="flex items-center justify-between rounded-lg border border-[var(--color-border)] p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-5 rounded bg-[var(--color-surface-2)] border border-[var(--color-border)]" />
                    <span className="text-sm text-[var(--color-text-2)]">Visa ending in 4242</span>
                  </div>
                  <Button variant="ghost" size="sm" className="h-7 text-xs">Update</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export { SettingsPage }
