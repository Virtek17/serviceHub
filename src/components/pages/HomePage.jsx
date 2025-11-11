// главная страница - выбор роли

import { useState } from "react";
import { User, Store } from "lucide-react";
import { useNavigate } from "react-router-dom";
import RoleCard from "../common/RoleCard";

export default function HomePage() {
  const [selectedRole, setSelectedRole] = useState(null);

  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    if (role === "provider") {
      navigate("/provider/setup");
    } else {
      navigate("/customer/browse");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-[#F8F6F3] to-[#ECE9E5] dark:from-[#1A1A1A] dark:to-[#0F0F0F]">
        {/* Header */}
        <header className="px-4 sm:px-6 py-4 sm:py-6">
          <div className="max-w-[1200px] mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-[#8B70F6] to-[#9D7DFF] rounded-lg sm:rounded-xl"></div>
              <span
                className="text-[#0D0D0D] dark:text-white text-lg sm:text-xl font-medium"
                style={{ fontFamily: "Inter, system-ui, sans-serif" }}
              >
                ServiceHub
              </span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-4 sm:px-6 py-6 sm:py-12">
          <div className="max-w-[800px] mx-auto text-center">
            {/* Headline */}
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-[#0D0D0D] dark:text-white mb-4 sm:mb-6 max-w-4xl mx-auto"
              style={{
                fontFamily: "Instrument Serif, serif",
                letterSpacing: "-0.02em",
              }}
            >
              Присоединяйтесь к <em className="font-medium">нашей</em> платформе
              услуг
            </h1>

            <p className="text-base sm:text-lg text-[#555555] dark:text-[#C0C0C0] opacity-80 mb-12 sm:mb-16 max-w-[50ch] mx-auto px-4">
              Выберите свою роль и начните работать с клиентами или находить
              нужные услуги
            </p>

            {/* Role Selection Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-[700px] mx-auto">
              {/* Provider Card */}

              <RoleCard
                role={"provider"}
                title={"Я исполнитель"}
                description={
                  "Создайте свой профиль, добавьте услуги и управляйте расписанием. Привлекайте клиентов и развивайте свой бизнес."
                }
                features={[
                  "Создание профиля и портфолио",
                  "Управление услугами и ценами",
                  "Календарь и статистика",
                ]}
                handleRoleSelect={() => handleRoleSelect("provider")}
              />
              {/* Customer Card */}
              <RoleCard
                role={"customer"}
                title={"Я заказчик"}
                description={
                  "Найдите идеального мастера для ваших нужд. Просматривайте профили, сравнивайте цены и записывайтесь на удобное время."
                }
                features={[
                  "Поиск мастеров по категориям",
                  "Фильтрация по городу и тегам",
                  "Удобное бронирование",
                ]}
                handleRoleSelect={() => handleRoleSelect("customer")}
              />
            </div>

            {/* Additional Info */}
            <div className="mt-12 sm:mt-16 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white/50 dark:bg-[#1E1E1E]/50 border border-[#E0E0E0] dark:border-[#404040] max-w-[600px] mx-auto">
              <p className="text-xs sm:text-sm text-[#666666] dark:text-[#AAAAAA]">
                <strong>Примечание:</strong> Это демо-версия для ознакомления с
                функционалом. Регистрация и авторизация временно отключены.
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
