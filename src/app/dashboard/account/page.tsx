import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

export default function AccountPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-headline text-2xl font-bold tracking-tight sm:text-3xl">Account Settings</h1>
        <p className="text-muted-foreground">Manage your account, subscription, and password.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Profile Information</CardTitle>
          <CardDescription>Your personal account details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value="user@example.com" disabled />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Billing Plan</CardTitle>
          <CardDescription>Information about your current subscription.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                    <p className="font-medium">Current Plan: <span className="text-primary font-bold">Free</span></p>
                    <p className="text-sm text-muted-foreground">You are currently on the free plan.</p>
                </div>
                 <Button variant="outline">Upgrade to Pro</Button>
            </div>
            <Button>Manage Subscription</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Change Password</CardTitle>
          <CardDescription>Update your password here. Choose a strong one!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Current Password</Label>
            <Input id="current-password" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input id="new-password" type="password" />
          </div>
           <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input id="confirm-password" type="password" />
          </div>
        </CardContent>
        <CardContent>
          <Button>Update Password</Button>
        </CardContent>
      </Card>
    </div>
  );
}
