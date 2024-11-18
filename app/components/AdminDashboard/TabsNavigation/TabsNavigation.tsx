import { TabsList, TabsTrigger } from "@/components/ui/tabs";

export function TabsNavigation() {
  return (
    <TabsList className="flex space-x-2 bg-transparent">
      <TabsTrigger
        value="account"
        className="px-4 py-2 rounded-md data-[state=active]:bg-teal-500 data-[state=active]:text-white text-gray-200"
      >
        حساب کاربری
      </TabsTrigger>
      <TabsTrigger
        value="users"
        className="px-4 py-2 rounded-md data-[state=active]:bg-teal-500 data-[state=active]:text-white text-gray-200"
      >
        مدیریت کاربران
      </TabsTrigger>
      <TabsTrigger
        value="availableTimes"
        className="px-4 py-2 rounded-md data-[state=active]:bg-teal-500 data-[state=active]:text-white text-gray-200"
      >
        بازه‌های زمانی موجود
      </TabsTrigger>
      <TabsTrigger
        value="reservationManagement"
        className="px-4 py-2 rounded-md data-[state=active]:bg-teal-500 data-[state=active]:text-white text-gray-200"
      >
        رزروها
      </TabsTrigger>
      <TabsTrigger
        value="news"
        className="px-4 py-2 rounded-md data-[state=active]:bg-teal-500 data-[state=active]:text-white text-gray-200"
      >
        اخبار
      </TabsTrigger>
    </TabsList>
  );
}
