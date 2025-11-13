import { Plus } from "lucide-react";
import ServiceCard from "./ServiceCard";

export default function ServicesTab({
  services,
  onAddService,
  onEditService,
  onDeleteService,
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-[#0D0D0D] dark:text-white">
          Мои услуги
        </h2>
        <button
          onClick={onAddService}
          className="px-4 py-2 bg-[#8B70F6] text-white rounded-xl hover:bg-[#7E64F2] transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          Добавить услугу
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            service={service}
            onEdit={onEditService}
            onDelete={onDeleteService}
          />
        ))}
      </div>
    </div>
  );
}
