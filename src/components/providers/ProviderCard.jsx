import { MapPin, Star, Eye, DollarSign } from "lucide-react";

export default function ProviderCard({
  avatar,
  name,
  description,
  city,
  onClick,
  categories,
  tags,
  priceFrom,
}) {
  return (
    <div className="space-y-6">
      <div
        className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-6 border border-[#E0E0E0] dark:border-[#404040] hover:shadow-lg transition-all duration-200 cursor-pointer hover:border-[#FF6B9D] dark:hover:border-[#FF8FB3]"
        onClick={onClick}
      >
        {/* Avatar */}
        <div className="flex items-start flex-col md:flex-row gap-6">
          <img
            src={avatar}
            alt={name}
            className="w-20 h-20 rounded-2xl object-cover"
          />

          {/* Content */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-semibold text-[#0D0D0D] dark:text-white mb-1">
                  {name}
                </h3>
                <div className="flex items-center gap-4 text-sm text-[#666666] dark:text-[#AAAAAA]">
                  <div className="flex items-center gap-1">
                    <MapPin size={16} />
                    <span>{city}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star size={16} className="fill-[#F59E0B] text-[#F59E0B]" />
                    {/* <span>{provider.rating}</span>
                    <span>({provider.reviewCount})</span> */}
                  </div>
                </div>
              </div>
              <button className="text-[#FF6B9D] hover:text-[#F55C91] flex items-center gap-1 text-sm">
                <Eye size={16} />
                Смотреть
              </button>
            </div>

            <p className="text-[#666666] dark:text-[#AAAAAA] text-sm mb-4 leading-relaxed">
              {description}
            </p>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-4">
              {categories.map((category) => (
                <span
                  key={category}
                  className="px-3 py-1 rounded-full text-xs bg-[#FF6B9D]/10 text-[#FF6B9D] border border-[#FF6B9D]/20"
                >
                  {category}
                </span>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded text-xs bg-[#F8F6F3] dark:bg-[#262626] text-[#666666] dark:text-[#AAAAAA]"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Price */}
            <div className="flex items-center gap-1 text-lg font-semibold text-[#0D0D0D] dark:text-white">
              <DollarSign size={18} />
              <span>от {priceFrom} ₽</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
