import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "$web/components/ui/card";
import { Input } from "$web/components/ui/input";
import { Label } from "$web/components/ui/label";
import { Switch } from "$web/components/ui/switch";
import { Textarea } from "$web/components/ui/textarea";
import { Button } from "$web/components/ui/button";

export default function SettingsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-4 text-3xl font-bold">Application Settings</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>
              Configure general settings for your application.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="appName">Application Name</Label>
                <Input id="appName" placeholder="Enter application name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="appDescription">Application Description</Label>
                <Textarea
                  id="appDescription"
                  placeholder="Enter application description"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="appLogo">Application Logo</Label>
                <Input id="appLogo" type="file" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Advanced Settings</CardTitle>
            <CardDescription>
              Configure advanced settings for your application.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="enableAnalytics" />
                <Label htmlFor="enableAnalytics">Enable Analytics</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="enableNotifications" />
                <Label htmlFor="enableNotifications">
                  Enable Notifications
                </Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="apiKey">API Key</Label>
                <Input id="apiKey" placeholder="Enter API key" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="mt-8">
        <Button>Save Settings</Button>
      </div>
    </div>
  );
}
