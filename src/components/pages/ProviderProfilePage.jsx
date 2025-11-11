// просмотр профиля мастера (от лица клиента)

import { useState } from "react";
import {
  ArrowLeft,
  Star,
  MapPin,
  Clock,
  DollarSign,
  Calendar,
  Check,
  X,
} from "lucide-react";
import { useParams } from "react-router-dom";

export default function ProviderProfilePage() {
  const { id } = useParams();

  const [selectedService, setSelectedService] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showBooking, setShowBooking] = useState(false);

  // Mock provider data - in real app would fetch by params.id
  const provider = {
    id,
    name: "Анна Смирнова",
    city: "Москва",
    description:
      "Профессиональный мастер маникюра с опытом работы более 5 лет. Специализируюсь на классическом и аппаратном маникюре, наращивании ногтей и художественном дизайне. Использую только качественные материалы и современное оборудование.",
    tags: ["маникюр", "педикюр", "дизайн ногтей", "наращивание"],
    rating: 4.8,
    reviewCount: 124,
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616c96f31d5?auto=format&fit=crop&w=150&q=80",
  };

  const services = [
    {
      category: "Маникюр",
      items: [
        {
          id: 1,
          name: "Классический маникюр",
          price: 1200,
          duration: 60,
          description: "Обработка кутикулы, придание формы, покрытие базой",
        },
        {
          id: 2,
          name: "Маникюр с покрытием",
          price: 1800,
          duration: 90,
          description: "Классический маникюр + покрытие гель-лаком",
        },
        {
          id: 3,
          name: "Наращивание ногтей",
          price: 2500,
          duration: 120,
          description: "Наращивание на формы + покрытие + дизайн",
        },
      ],
    },
    {
      category: "Педикюр",
      items: [
        {
          id: 4,
          name: "Классический педикюр",
          price: 1500,
          duration: 90,
          description: "Обработка стоп, придание формы, покрытие",
        },
        {
          id: 5,
          name: "Педикюр с покрытием",
          price: 1800,
          duration: 120,
          description: "Классический педикюр + покрытие гель-лаком",
        },
      ],
    },
  ];

  const timeSlots = [
    { date: "2024-11-12", time: "10:00", available: true },
    { date: "2024-11-12", time: "12:00", available: false },
    { date: "2024-11-12", time: "14:00", available: true },
    { date: "2024-11-12", time: "16:00", available: true },
    { date: "2024-11-13", time: "09:00", available: true },
    { date: "2024-11-13", time: "11:00", available: false },
    { date: "2024-11-13", time: "13:00", available: true },
    { date: "2024-11-13", time: "15:00", available: true },
  ];

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setSelectedSlot(null);
    setShowBooking(true);
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  const handleBooking = () => {
    if (selectedService && selectedSlot) {
      alert(
        `Запись успешно создана!\n\nУслуга: ${selectedService.name}\nДата: ${selectedSlot.date} в ${selectedSlot.time}\nСтоимость: ${selectedService.price} ₽`
      );
      setShowBooking(false);
      setSelectedService(null);
      setSelectedSlot(null);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-[#F8F6F3] to-[#ECE9E5] dark:from-[#1A1A1A] dark:to-[#0F0F0F]">
        {/* Header */}
        <header className="px-6 py-6 border-b border-[#E0E0E0] dark:border-[#404040] bg-white/50 dark:bg-[#1E1E1E]/50 backdrop-blur-sm">
          <div className="max-w-[1200px] mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <button
                onClick={() => (window.location.href = "/customer/browse")}
                className="flex items-center gap-2 text-[#666666] dark:text-[#AAAAAA] hover:text-[#0D0D0D] dark:hover:text-white transition-colors"
              >
                <ArrowLeft size={20} />К списку
              </button>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-[#8B70F6] to-[#9D7DFF] rounded-xl"></div>
                <span className="text-[#0D0D0D] dark:text-white text-xl font-medium">
                  ServiceHub
                </span>
              </div>
            </div>
          </div>
        </header>

        <main className="p-6">
          <div className="max-w-[1000px] mx-auto">
            {/* Provider Profile */}
            <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-8 mb-8 border border-[#E0E0E0] dark:border-[#404040]">
              <div className="flex items-start gap-8">
                <img
                  src={provider.avatar}
                  alt={provider.name}
                  className="w-32 h-32 rounded-3xl object-cover"
                />

                <div className="flex-1">
                  <h1
                    className="text-4xl font-semibold text-[#0D0D0D] dark:text-white mb-3"
                    style={{ fontFamily: "Instrument Serif, serif" }}
                  >
                    {provider.name}
                  </h1>

                  <div className="flex items-center gap-6 mb-4">
                    <div className="flex items-center gap-2 text-[#666666] dark:text-[#AAAAAA]">
                      <MapPin size={20} />
                      <span>{provider.city}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star
                        size={20}
                        className="fill-[#F59E0B] text-[#F59E0B]"
                      />
                      <span className="text-[#0D0D0D] dark:text-white font-semibold">
                        {provider.rating}
                      </span>
                      <span className="text-[#666666] dark:text-[#AAAAAA]">
                        ({provider.reviewCount} отзывов)
                      </span>
                    </div>
                  </div>

                  <p className="text-[#666666] dark:text-[#AAAAAA] leading-relaxed mb-6">
                    {provider.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {provider.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 rounded-full text-sm bg-[#FF6B9D]/10 text-[#FF6B9D] border border-[#FF6B9D]/20"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Services */}
              <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-8 border border-[#E0E0E0] dark:border-[#404040]">
                <h2 className="text-2xl font-semibold text-[#0D0D0D] dark:text-white mb-6">
                  Услуги
                </h2>

                <div className="space-y-6">
                  {services.map((category) => (
                    <div key={category.category}>
                      <h3 className="text-lg font-medium text-[#0D0D0D] dark:text-white mb-3">
                        {category.category}
                      </h3>
                      <div className="space-y-3">
                        {category.items.map((service) => (
                          <div
                            key={service.id}
                            className="p-4 rounded-2xl border border-[#E0E0E0] dark:border-[#404040] hover:border-[#FF6B9D] dark:hover:border-[#FF8FB3] transition-colors cursor-pointer"
                            onClick={() => handleServiceSelect(service)}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-medium text-[#0D0D0D] dark:text-white">
                                {service.name}
                              </h4>
                              <button className="px-3 py-1 bg-[#FF6B9D] text-white rounded-xl text-sm hover:bg-[#F55C91] transition-colors">
                                Записаться
                              </button>
                            </div>
                            <p className="text-sm text-[#666666] dark:text-[#AAAAAA] mb-3">
                              {service.description}
                            </p>
                            <div className="flex items-center gap-4 text-sm">
                              <div className="flex items-center gap-1">
                                <DollarSign
                                  size={16}
                                  className="text-[#10B981]"
                                />
                                <span className="font-semibold text-[#0D0D0D] dark:text-white">
                                  {service.price} ₽
                                </span>
                              </div>
                              <div className="flex items-center gap-1 text-[#666666] dark:text-[#AAAAAA]">
                                <Clock size={16} />
                                <span>{service.duration} мин</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Schedule */}
              <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-8 border border-[#E0E0E0] dark:border-[#404040]">
                <h2 className="text-2xl font-semibold text-[#0D0D0D] dark:text-white mb-6">
                  Доступные слоты
                </h2>

                <div className="space-y-4">
                  {timeSlots.map((slot, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-2xl border transition-colors ${
                        slot.available
                          ? "border-[#E0E0E0] dark:border-[#404040] hover:border-[#10B981] cursor-pointer"
                          : "border-[#F87171]/20 bg-[#F87171]/5 cursor-not-allowed"
                      }`}
                      onClick={() => slot.available && handleSlotSelect(slot)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-[#0D0D0D] dark:text-white">
                            {slot.date} в {slot.time}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            slot.available
                              ? "bg-[#10B981]/10 text-[#10B981]"
                              : "bg-[#F87171]/10 text-[#F87171]"
                          }`}
                        >
                          {slot.available ? "Свободен" : "Занят"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Booking Modal */}
        {showBooking && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
            <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-8 max-w-[500px] w-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-semibold text-[#0D0D0D] dark:text-white">
                  Запись на услугу
                </h3>
                <button
                  onClick={() => setShowBooking(false)}
                  className="p-2 text-[#666666] dark:text-[#AAAAAA] hover:text-[#0D0D0D] dark:hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>

              {selectedService && (
                <div className="space-y-6">
                  <div className="p-4 rounded-2xl bg-[#F8F6F3] dark:bg-[#262626]">
                    <h4 className="font-medium text-[#0D0D0D] dark:text-white mb-2">
                      {selectedService.name}
                    </h4>
                    <p className="text-sm text-[#666666] dark:text-[#AAAAAA] mb-3">
                      {selectedService.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="font-semibold text-[#0D0D0D] dark:text-white">
                        {selectedService.price} ₽
                      </span>
                      <span className="text-[#666666] dark:text-[#AAAAAA]">
                        {selectedService.duration} мин
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#0D0D0D] dark:text-white mb-3">
                      Выберите время
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {timeSlots
                        .filter((slot) => slot.available)
                        .map((slot, index) => (
                          <button
                            key={index}
                            onClick={() => handleSlotSelect(slot)}
                            className={`p-3 rounded-xl border text-sm transition-colors ${
                              selectedSlot === slot
                                ? "border-[#FF6B9D] bg-[#FF6B9D] text-white"
                                : "border-[#E0E0E0] dark:border-[#404040] text-[#0D0D0D] dark:text-white hover:border-[#FF6B9D]"
                            }`}
                          >
                            {slot.date} в {slot.time}
                          </button>
                        ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowBooking(false)}
                      className="flex-1 px-4 py-3 rounded-2xl border border-[#E0E0E0] dark:border-[#404040] text-[#666666] dark:text-[#AAAAAA] hover:border-[#C0C0C0] transition-colors"
                    >
                      Отмена
                    </button>
                    <button
                      onClick={handleBooking}
                      disabled={!selectedSlot}
                      className={`flex-1 px-4 py-3 rounded-2xl text-white transition-colors ${
                        selectedSlot
                          ? "bg-[#FF6B9D] hover:bg-[#F55C91]"
                          : "bg-[#C0C0C0] cursor-not-allowed"
                      }`}
                    >
                      Записаться
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
