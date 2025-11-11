// ЛИчный кабинет мастера

import { useState } from "react";
import {
  Calendar,
  BarChart3,
  Settings,
  User,
  Plus,
  Clock,
  DollarSign,
  Users,
  TrendingUp,
  Eye,
  Edit3,
  ArrowLeft,
} from "lucide-react";

export default function ProviderDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for demonstration
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

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-6 border border-[#E0E0E0] dark:border-[#404040]">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#8B70F6] to-[#9D7DFF] rounded-xl flex items-center justify-center">
              <Calendar size={24} className="text-white" />
            </div>
            <span className="text-xs text-[#10B981] bg-[#10B981]/10 px-2 py-1 rounded-full">
              +12%
            </span>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-semibold text-[#0D0D0D] dark:text-white">
              {stats.totalBookings}
            </p>
            <p className="text-sm text-[#666666] dark:text-[#AAAAAA]">
              Записей всего
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-6 border border-[#E0E0E0] dark:border-[#404040]">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#FF6B9D] to-[#FF8FB3] rounded-xl flex items-center justify-center">
              <DollarSign size={24} className="text-white" />
            </div>
            <span className="text-xs text-[#10B981] bg-[#10B981]/10 px-2 py-1 rounded-full">
              +8%
            </span>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-semibold text-[#0D0D0D] dark:text-white">
              {stats.monthlyRevenue.toLocaleString()} ₽
            </p>
            <p className="text-sm text-[#666666] dark:text-[#AAAAAA]">
              Выручка за месяц
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-6 border border-[#E0E0E0] dark:border-[#404040]">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#F59E0B] to-[#F97316] rounded-xl flex items-center justify-center">
              <Clock size={24} className="text-white" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-semibold text-[#0D0D0D] dark:text-white">
              {stats.upcomingAppointments}
            </p>
            <p className="text-sm text-[#666666] dark:text-[#AAAAAA]">
              Ближайшие записи
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-6 border border-[#E0E0E0] dark:border-[#404040]">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-xl flex items-center justify-center">
              <TrendingUp size={24} className="text-white" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-semibold text-[#0D0D0D] dark:text-white">
              {stats.completedServices}
            </p>
            <p className="text-sm text-[#666666] dark:text-[#AAAAAA]">
              Услуг выполнено
            </p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Bookings */}
        <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-6 border border-[#E0E0E0] dark:border-[#404040]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-[#0D0D0D] dark:text-white">
              Последние записи
            </h3>
            <button className="text-[#8B70F6] hover:text-[#7E64F2] text-sm font-medium">
              Показать все
            </button>
          </div>

          <div className="space-y-4">
            {recentBookings.map((booking) => (
              <div
                key={booking.id}
                className="flex items-center justify-between p-3 rounded-xl bg-[#F8F6F3] dark:bg-[#262626]"
              >
                <div className="flex-1">
                  <p className="font-medium text-[#0D0D0D] dark:text-white text-sm">
                    {booking.client}
                  </p>
                  <p className="text-xs text-[#666666] dark:text-[#AAAAAA]">
                    {booking.service}
                  </p>
                  <p className="text-xs text-[#666666] dark:text-[#AAAAAA]">
                    {booking.date} в {booking.time}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-[#0D0D0D] dark:text-white text-sm">
                    {booking.price} ₽
                  </p>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      booking.status === "upcoming"
                        ? "bg-[#F59E0B]/10 text-[#F59E0B]"
                        : "bg-[#10B981]/10 text-[#10B981]"
                    }`}
                  >
                    {booking.status === "upcoming" ? "Предстоит" : "Завершено"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Schedule */}
        <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-6 border border-[#E0E0E0] dark:border-[#404040]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-[#0D0D0D] dark:text-white">
              Ближайшие слоты
            </h3>
            <button className="text-[#8B70F6] hover:text-[#7E64F2] text-sm font-medium">
              Настроить
            </button>
          </div>

          <div className="space-y-3">
            {upcomingSlots.map((slot, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-xl bg-[#F8F6F3] dark:bg-[#262626]"
              >
                <div>
                  <p className="font-medium text-[#0D0D0D] dark:text-white text-sm">
                    {slot.date} в {slot.time}
                  </p>
                  {slot.client && (
                    <p className="text-xs text-[#666666] dark:text-[#AAAAAA]">
                      {slot.client}
                    </p>
                  )}
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    slot.available
                      ? "bg-[#10B981]/10 text-[#10B981]"
                      : "bg-[#8B70F6]/10 text-[#8B70F6]"
                  }`}
                >
                  {slot.available ? "Свободен" : "Занят"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderServices = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-[#0D0D0D] dark:text-white">
          Мои услуги
        </h2>
        <button className="px-4 py-2 bg-[#8B70F6] text-white rounded-xl hover:bg-[#7E64F2] transition-colors flex items-center gap-2">
          <Plus size={20} />
          Добавить услугу
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-6 border border-[#E0E0E0] dark:border-[#404040]"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <span className="text-xs text-[#8B70F6] bg-[#8B70F6]/10 px-2 py-1 rounded-full">
                  {service.category}
                </span>
                <h3 className="text-lg font-semibold text-[#0D0D0D] dark:text-white mt-2">
                  {service.name}
                </h3>
              </div>
              <button className="text-[#666666] dark:text-[#AAAAAA] hover:text-[#0D0D0D] dark:hover:text-white">
                <Edit3 size={16} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-lg font-semibold text-[#0D0D0D] dark:text-white">
                  {service.price} ₽
                </span>
                <span className="text-sm text-[#666666] dark:text-[#AAAAAA]">
                  {service.duration} мин
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

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

      <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-6 border border-[#E0E0E0] dark:border-[#404040]">
        <div className="text-center py-12 text-[#666666] dark:text-[#AAAAAA]">
          <Calendar size={48} className="mx-auto mb-4 opacity-50" />
          <p>Календарь будет доступен после настройки базы данных</p>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-[#0D0D0D] dark:text-white">
        Аналитика
      </h2>

      <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-6 border border-[#E0E0E0] dark:border-[#404040]">
        <div className="text-center py-12 text-[#666666] dark:text-[#AAAAAA]">
          <BarChart3 size={48} className="mx-auto mb-4 opacity-50" />
          <p>Детальная аналитика будет доступна после создания базы данных</p>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: "overview", label: "Обзор", icon: BarChart3 },
    { id: "services", label: "Услуги", icon: Settings },
    { id: "calendar", label: "Расписание", icon: Calendar },
    { id: "analytics", label: "Аналитика", icon: TrendingUp },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return renderOverview();
      case "services":
        return renderServices();
      case "calendar":
        return renderCalendar();
      case "analytics":
        return renderAnalytics();
      default:
        return renderOverview();
    }
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Instrument+Serif:wght@400;500&family=Inter:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      <div className="min-h-screen bg-gradient-to-br from-[#F8F6F3] to-[#ECE9E5] dark:from-[#1A1A1A] dark:to-[#0F0F0F]">
        {/* Header */}
        <header className="px-6 py-6 border-b border-[#E0E0E0] dark:border-[#404040] bg-white/50 dark:bg-[#1E1E1E]/50 backdrop-blur-sm">
          <div className="max-w-[1200px] mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <button
                onClick={() => (window.location.href = "/")}
                className="flex items-center gap-2 text-[#666666] dark:text-[#AAAAAA] hover:text-[#0D0D0D] dark:hover:text-white transition-colors"
              >
                <ArrowLeft size={20} />
                На главную
              </button>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-[#8B70F6] to-[#9D7DFF] rounded-xl"></div>
                <span className="text-[#0D0D0D] dark:text-white text-xl font-medium">
                  ServiceHub
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#8B70F6] to-[#9D7DFF] rounded-xl flex items-center justify-center">
                  <User size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#0D0D0D] dark:text-white">
                    Мастер-демо
                  </p>
                  <p className="text-xs text-[#666666] dark:text-[#AAAAAA]">
                    Москва
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="flex">
          {/* Sidebar */}
          <aside className="w-64 bg-white dark:bg-[#1E1E1E] border-r border-[#E0E0E0] dark:border-[#404040] min-h-[calc(100vh-88px)]">
            <nav className="p-6 space-y-2">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left ${
                      activeTab === tab.id
                        ? "bg-[#8B70F6] text-white"
                        : "text-[#666666] dark:text-[#AAAAAA] hover:bg-[#F8F6F3] dark:hover:bg-[#262626] hover:text-[#0D0D0D] dark:hover:text-white"
                    }`}
                  >
                    <IconComponent size={20} strokeWidth={1.5} />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-8">
            <div className="max-w-[1000px]">{renderContent()}</div>
          </main>
        </div>
      </div>
    </>
  );
}
