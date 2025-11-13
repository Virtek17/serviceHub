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
import { useNavigate, useParams } from "react-router-dom";
import { useProviderById } from "../hooks/useProviderById";
import { createBooking } from "../Api/booking";

export default function ProviderProfilePage() {
  const { id } = useParams();
  const { provider, loading, error } = useProviderById(id);

  const customerId = "customer_001";

  const [selectedService, setSelectedService] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showBooking, setShowBooking] = useState(false);

  const navigate = useNavigate();

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setSelectedSlot(null);
    setShowBooking(true);
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  const handleBooking = async () => {
    if (!selectedService || !selectedSlot) return;

    setBookingLoading(true);
    try {
      await createBooking({
        customer_id: customerId,
        performer_id: provider.id,
        service_id: selectedService.id,
        slot_id: selectedSlot.id,
      });

      alert("✅ Вы успешно записаны!");
      setShowBooking(false);
      setSelectedService(null);
      setSelectedSlot(null);
    } catch (err) {
      alert("❌ Ошибка: " + err.message);
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error || !provider) {
    return <div>Ошибка: {error || "Мастер не найден"}</div>;
  }
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-[#F8F6F3] to-[#ECE9E5] dark:from-[#1A1A1A] dark:to-[#0F0F0F]">
        {/* Header */}
        <header className="px-6 py-6 border-b border-[#E0E0E0] dark:border-[#404040] bg-white/50 dark:bg-[#1E1E1E]/50 backdrop-blur-sm">
          <div className="max-w-[1200px] mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <button
                onClick={() => navigate("/customer/browse")}
                className="flex items-center gap-2 text-[#666666] dark:text-[#AAAAAA] hover:text-[#0D0D0D] dark:hover:text-white transition-colors"
              >
                <ArrowLeft size={20} />К списку
              </button>

              <div className="flex items-center space-x-3">
                {/* <div className="w-8 h-8 bg-gradient-to-br from-[#8B70F6] to-[#9D7DFF] rounded-xl"></div>
                <span className="text-[#0D0D0D] dark:text-white text-xl font-medium">
                  ServiceHub
                </span> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 211 41"
                  width="211"
                  height="41"
                >
                  <path
                    fill="#FF6F3C"
                    d="M194.8,40.4h-61.7c-2.1,0-3.4-1.8-2.8-4l9.2-32.5c0.5-1.8,2.4-3.3,4.2-3.3h61.7c2.1,0,3.4,1.8,2.8,4l-9.2,32.5c-0.5,1.8-2.4,3.3-4.2,3.3Z"
                  />
                  <path
                    fill="#FF6F3C"
                    d="M11.6,16.7l-0.6,1.9h10.2l-2,7.4-3.7,2.6H0l1.3-4.4h10.2l0.6-2H1.9l2-7.3,3.7-2.7h15.4l-1.2,4.4h-10.2ZM20.6,28.6l4.7-16.3h17.3l-1.3,4.4h-9.2l-0.6,1.9h9.2l-1.1,3.6h-9.2l-0.6,1.9h9.2l-1.2,4.4h-17.4ZM39.6,28.6l4.7-16.3h19.2l-2,6.9-4.3,1.6,3.4,1.3-1.9,6.6h-8.5l1.3-4.4h-2l-1.3,4.4h-8.7ZM53.2,18.7l0.6-1.9h-1.9l-0.6,1.9h2ZM65.1,12.4h8.5l-2.8,10h2l2.8-10h8.5l-2.8,10-8.6,6.3h-5.2l-5.1-6.3,2.8-10ZM93.9,12.4l-4.7,16.3h-8.1l4.7-16.3h8.1ZM91,28.6l4.7-16.3h18.6l-2,7.1h-8.5l0.8-2.7h-2l-2.2,7.6h1.9l0.8-2.9h8.5l-1.3,4.7-3.7,2.6h-15.7ZM111.2,28.6l4.7-16.3h17.3l-1.3,4.4h-9.2l-0.6,1.9h9.2l-1.1,3.6h-9.2l-0.6,1.9h9.2l-1.2,4.4h-17.4Z"
                  />

                  <path
                    fill="#1A1A1A"
                    d="M141.2,12.4h8.5l-1.8,6.3h2l1.7-6.3h8.5l-4.7,16.3h-8.5l1.7-6.3h-1.9l-1.7,6.3h-8.5l4.7-16.3ZM157.2,28.6l4.7-16.3h8.6l-3.4,11.9h1.9l3.4-11.9h8.6l-3.9,13.7-3.7,2.6h-16.3ZM178.1,28.6l4.7-16.3h19.4l-2,6.9-3,1.3,2.5,0.7-1.4,4.7-3.7,2.6h-16.5ZM190.5,22.3h-1.9l-0.6,1.9h2l0.6-1.9ZM190.2,16.7l-0.6,1.9h2l0.6-1.9h-2Z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </header>

        <main className="p-6">
          <div className="max-w-[1000px] mx-auto">
            {/* Provider Profile */}
            <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-6 md:p-8 mb-8 border border-[#E0E0E0] dark:border-[#404040]">
              <div className="flex items-start md:flex-row flex-col gap-8">
                <img
                  src={provider.avatar || "https://placehold.co/150?text=👤"}
                  alt={provider.name || "Мастер"}
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
              <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-6 md:p-8 border border-[#E0E0E0] dark:border-[#404040]">
                <h2 className="text-2xl font-semibold text-[#0D0D0D] dark:text-white mb-6">
                  Услуги
                </h2>

                <div className="space-y-6">
                  {provider.services.lenght === 0 ? (
                    <p className="text-gray-500">Услуги не добавлены</p>
                  ) : (
                    provider.services.map((category) => (
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
                    ))
                  )}
                </div>
              </div>

              {/* Schedule */}
              <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-6 md:p-8 border border-[#E0E0E0] dark:border-[#404040]">
                <h2 className="text-2xl font-semibold text-[#0D0D0D] dark:text-white mb-6">
                  Доступные слоты
                </h2>

                <div className="space-y-4">
                  {provider.timeSlots.map((slot, index) => (
                    <div
                      key={slot.id}
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
            <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-6 md:p-8 max-w-[500px] w-full">
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
                      {provider.timeSlots
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
                      disabled={!selectedSlot || bookingLoading}
                      className={`flex-1 py-2 rounded-xl text-white ${
                        selectedSlot && !bookingLoading
                          ? "bg-[#FF6B9D] hover:bg-[#F55C91]"
                          : "bg-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {bookingLoading ? "Запись..." : "Подтвердить"}
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
