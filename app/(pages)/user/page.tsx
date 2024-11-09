import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
function page() {
  return (
    <Tabs defaultValue="account" className="w-full" dir="rtl">
      <TabsList className="flex justify-start space-x-2 p-4 bg-teal-800 h-20 rounded-none">
        <TabsTrigger
          value="account"
          className="px-4 py-2 rounded-md data-[state=active]:bg-teal-500 data-[state=active]:text-white text-gray-200"
        >
          Account
        </TabsTrigger>
        <TabsTrigger
          value="password"
          className="px-4 py-2 rounded-md data-[state=active]:bg-teal-500 data-[state=active]:text-white text-gray-200"
        >
          Password
        </TabsTrigger>
        <TabsTrigger
          value="settings"
          className="px-4 py-2 rounded-md data-[state=active]:bg-teal-500 data-[state=active]:text-white text-gray-200"
        >
          Settings
        </TabsTrigger>
      </TabsList>
      <TabsContent
        value="account"
        className="p-6 bg-white dark:bg-gray-800 min-h-[calc(100vh-80px)]"
      >
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Account
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Make changes to your account here.
          </p>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                defaultValue="John Doe"
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                defaultValue="@johndoe"
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                defaultValue="john@example.com"
                className="w-full"
              />
            </div>
            <Button className="w-full bg-teal-600 hover:bg-teal-600 text-white">
              Save changes
            </Button>
          </div>
        </div>
      </TabsContent>
      <TabsContent
        value="password"
        className="p-6 bg-white dark:bg-gray-800 min-h-[calc(100vh-80px)]"
      >
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Password
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Change your password here.
          </p>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" className="w-full" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" className="w-full" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm">Confirm new password</Label>
              <Input id="confirm" type="password" className="w-full" />
            </div>
            <Button className="w-full bg-teal-700 hover:bg-teal-600 text-white">
              Change password
            </Button>
          </div>
        </div>
      </TabsContent>
      <TabsContent
        value="settings"
        className="p-6 bg-white dark:bg-gray-800 min-h-[calc(100vh-80px)]"
      >
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Settings
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Manage your account settings and preferences.
          </p>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="marketing"
                className="rounded border-teal-500 text-teal-500 focus:ring-teal-500"
              />
              <Label htmlFor="marketing">Receive marketing emails</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="newsletter"
                className="rounded border-teal-500 text-teal-500 focus:ring-teal-500"
              />
              <Label htmlFor="newsletter">Receive newsletter</Label>
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">Preferred language</Label>
              <select
                id="language"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-teal-300 focus:ring focus:ring-teal-200 focus:ring-opacity-50"
              >
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
            </div>
            <Button className="w-full bg-teal-700 hover:bg-teal-600 text-white">
              Save preferences
            </Button>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}

export default page;
