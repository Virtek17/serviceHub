import { useState } from "react";
import { useParams } from "react-router-dom";
import { useProviderById } from "../hooks/useProviderById";
import { createBooking } from "../Api/booking";
import PageHeader from "../components/common/PageHeader";
import ProviderInfo from "../components/profile/ProviderInfo";
import ServicesList from "../components/profile/ServicesList";
import TimeSlotsList from "../components/profile/TimeSlotsList";
import BookingModal from "../components/modals/BookingModal";

export default function ProviderProfilePage() {
  const { id } = useParams();
  const { provider, loading, error, refetch } = useProviderById(id);

  const customerId = "5ca0c69b-b333-4650-9b4d-aa1ab3d42749";

  const [selectedService, setSelectedService] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showBooking, setShowBooking] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

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

      // Обновляем данные мастера, чтобы получить актуальные слоты
      refetch();

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
    <div className="min-h-screen bg-gradient-to-br from-[#F8F6F3] to-[#ECE9E5] dark:from-[#1A1A1A] dark:to-[#0F0F0F]">
      <PageHeader backTo="/customer/browse" backLabel="К списку" />

      <main className="p-6">
        <div className="max-w-[1000px] mx-auto">
          <ProviderInfo provider={provider} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ServicesList
              services={provider.services}
              onServiceSelect={handleServiceSelect}
            />
            <TimeSlotsList
              timeSlots={provider.timeSlots}
              onSlotSelect={handleSlotSelect}
            />
          </div>
        </div>
      </main>

      <BookingModal
        isOpen={showBooking}
        onClose={() => setShowBooking(false)}
        selectedService={selectedService}
        timeSlots={provider.timeSlots}
        selectedSlot={selectedSlot}
        onSlotSelect={handleSlotSelect}
        onConfirm={handleBooking}
        isLoading={bookingLoading}
      />
    </div>
  );
}
