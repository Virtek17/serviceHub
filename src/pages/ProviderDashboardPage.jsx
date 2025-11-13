import { useState } from "react";
import { Calendar, BarChart3, Settings, TrendingUp, Plus } from "lucide-react";
import PageHeader from "../components/common/PageHeader";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import OverviewTab from "../components/dashboard/OverviewTab";
import ServicesTab from "../components/dashboard/ServicesTab";
import EmptyState from "../components/common/EmptyState";

export default function ProviderDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const stats = {
    totalBookings: 124,
    monthlyRevenue: 45600,
    upcomingAppointments: 8,
    completedServices: 98,
  };

  const recentBookings = [
    {
      id: 1,
      client: "Анна Иванова",
      service: "Маникюр классический",
      date: "2024-11-12",
      time: "14:00",
      price: 1200,
      status: "upcoming",
    },
    {
      id: 2,
      client: "Мария Петрова",
      service: "Педикюр с покрытием",
      date: "2024-11-11",
      time: "16:30",
      price: 1800,
      status: "completed",
    },
    {
      id: 3,
      client: "Елена Сидорова",
      service: "Наращивание ногтей",
      date: "2024-11-10",
      time: "12:00",
      price: 2500,
      status: "completed",
    },
  ];

  const upcomingSlots = [
    { date: "2024-11-12", time: "10:00", available: true },
    {
      date: "2024-11-12",
      time: "14:00",
      available: false,
      client: "Анна Иванова",
    },
    { date: "2024-11-12", time: "16:00", available: true },
    { date: "2024-11-13", time: "09:00", available: true },
    {
      date: "2024-11-13",
      time: "11:00",
      available: false,
      client: "Ольга Козлова",
    },
  ];

  const services = [
    {
      category: "Маникюр",
      name: "Классический маникюр",
      price: 1200,
      duration: 60,
    },
    {
      category: "Маникюр",
      name: "Наращивание ногтей",
      price: 2500,
      duration: 120,
    },
    {
      category: "Педикюр",
      name: "Классический педикюр",
      price: 1500,
      duration: 90,
    },
    {
      category: "Педикюр",
      name: "Педикюр с покрытием",
      price: 1800,
      duration: 120,
    },
  ];

  const tabs = [
    { id: "overview", label: "Обзор", icon: BarChart3 },
    { id: "services", label: "Услуги", icon: Settings },
    { id: "calendar", label: "Расписание", icon: Calendar },
    { id: "analytics", label: "Аналитика", icon: TrendingUp },
  ];

  const renderCalendar = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-[#0D0D0D] dark:text-white">
          Расписание
        </h2>
        <button className="px-4 py-2 bg-[#FF6B9D] text-white rounded-xl hover:bg-[#F55C91] transition-colors flex items-center gap-2">
          <Plus size={20} />
          Добавить слот
        </button>
      </div>
      <EmptyState
        icon={Calendar}
        title="Календарь будет доступен после настройки базы данных"
      />
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-[#0D0D0D] dark:text-white">
        Аналитика
      </h2>
      <EmptyState
        icon={BarChart3}
        title="Детальная аналитика будет доступна после создания базы данных"
      />
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <OverviewTab
            stats={stats}
            recentBookings={recentBookings}
            upcomingSlots={upcomingSlots}
          />
        );
      case "services":
        return (
          <ServicesTab
            services={services}
            onAddService={() => alert("Добавить услугу")}
            onEditService={(service) => alert(`Редактировать: ${service.name}`)}
          />
        );
      case "calendar":
        return renderCalendar();
      case "analytics":
        return renderAnalytics();
      default:
        return (
          <OverviewTab
            stats={stats}
            recentBookings={recentBookings}
            upcomingSlots={upcomingSlots}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F6F3] to-[#ECE9E5] dark:from-[#1A1A1A] dark:to-[#0F0F0F]">
      <PageHeader
        backTo="/"
        backLabel="На главную"
        showUser
        userName="Мастер-демо"
        userCity="Москва"
        onMenuClick={() => setIsSidebarOpen(true)}
      />

      <div className="flex">
        <DashboardSidebar
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/30 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <main className="flex-1 p-6 md:p-8 w-full">
          <div className="max-w-[1000px] mx-auto">{renderContent()}</div>
        </main>
      </div>
    </div>
  );
}
