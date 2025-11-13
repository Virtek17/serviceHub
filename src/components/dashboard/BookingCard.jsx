export default function BookingCard({ booking }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-[#F8F6F3] dark:bg-[#262626]">
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
  );
}
