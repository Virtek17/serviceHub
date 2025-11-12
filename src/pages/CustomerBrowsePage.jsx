// Поиск мастеров
// TODO: разбить на компоненты (компоненты уже есть )
import { useState } from "react";
import {
  Search,
  MapPin,
  Filter,
  Star,
  Clock,
  DollarSign,
  ArrowLeft,
  Eye,
  Tag,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CustomerBrowsePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // Mock data for demonstration
  const cities = [
    "Москва",
    "Санкт-Петербург",
    "Новосибирск",
    "Екатеринбург",
    "Казань",
  ];
  const categories = [
    "Маникюр",
    "Педикюр",
    "Наращивание",
    "Массаж",
    "Стрижка",
    "Окрашивание",
  ];
  const tags = [
    "маникюр",
    "педикюр",
    "наращивание",
    "дизайн ногтей",
    "массаж",
    "стрижка",
    "окрашивание",
    "укладка",
    "брови",
    "ресницы",
    "косметология",
    "депиляция",
    "татуаж",
    "макияж",
  ];

  const providers = [
    {
      id: 1,
      name: "Анна Смирнова",
      city: "Москва",
      description:
        "Профессиональный мастер маникюра с опытом работы более 5 лет. Специализируюсь на классическом и аппаратном маникюре.",
      tags: ["маникюр", "педикюр", "дизайн ногтей"],
      rating: 4.8,
      reviewCount: 124,
      priceFrom: 1200,
      categories: ["Маникюр", "Педикюр"],
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616c96f31d5?auto=format&fit=crop&w=150&q=80",
    },
    {
      id: 2,
      name: "Елена Козлова",
      city: "Москва",
      description:
        "Мастер по наращиванию ресниц и оформлению бровей. Использую только качественные материалы.",
      tags: ["брови", "ресницы", "татуаж"],
      rating: 4.9,
      reviewCount: 89,
      priceFrom: 800,
      categories: ["Брови", "Ресницы"],
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    },
    {
      id: 3,
      name: "Мария Петрова",
      city: "Санкт-Петербург",
      description:
        "Стилист-парикмахер. Создаю стильные образы для любого случая. Специализируюсь на окрашивании и стрижках.",
      tags: ["стрижка", "окрашивание", "укладка"],
      rating: 4.7,
      reviewCount: 203,
      priceFrom: 2000,
      categories: ["Стрижка", "Окрашивание"],
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
    },
    {
      id: 4,
      name: "Ольга Иванова",
      city: "Москва",
      description:
        "Массажист и косметолог. Предлагаю широкий спектр услуг для ухода за телом и лицом.",
      tags: ["массаж", "косметология", "депиляция"],
      rating: 4.6,
      reviewCount: 156,
      priceFrom: 1500,
      categories: ["Массаж", "Косметология"],
      avatar:
        "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?auto=format&fit=crop&w=150&q=80",
    },
    {
      id: 5,
      name: "Татьяна Волкова",
      city: "Екатеринбург",
      description:
        "Мастер универсал. Выполняю маникюр, педикюр, наращивание ногтей. Индивидуальный подход к каждому клиенту.",
      tags: ["маникюр", "педикюр", "наращивание"],
      rating: 4.5,
      reviewCount: 98,
      priceFrom: 1000,
      categories: ["Маникюр", "Педикюр"],
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    },
  ];

  const handleTagToggle = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filteredProviders = providers.filter((provider) => {
    const matchesSearch =
      provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = !selectedCity || provider.city === selectedCity;
    const matchesCategory =
      !selectedCategory || provider.categories.includes(selectedCategory);
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => provider.tags.includes(tag));

    return matchesSearch && matchesCity && matchesCategory && matchesTags;
  });

  const navigate = useNavigate();

  // const handleProviderClick = (providerId) => {
  //   window.location.href = `/customer/provider/${providerId}`;
  // };

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
                onClick={() => navigate(`/`)}
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

            <div className="text-sm text-[#666666] dark:text-[#AAAAAA]">
              Найдено мастеров: {filteredProviders.length}
            </div>
          </div>
        </header>

        <div className="flex">
          {/* Sidebar - Filters */}
          <aside className="w-80 bg-white dark:bg-[#1E1E1E] border-r border-[#E0E0E0] dark:border-[#404040] min-h-[calc(100vh-88px)]">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-[#0D0D0D] dark:text-white">
                  Фильтры
                </h2>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCity("");
                    setSelectedCategory("");
                    setSelectedTags([]);
                  }}
                  className="text-sm text-[#8B70F6] hover:text-[#7E64F2]"
                >
                  Сбросить
                </button>
              </div>

              <div className="space-y-6">
                {/* Search */}
                <div>
                  <label className="block text-sm font-medium text-[#0D0D0D] dark:text-white mb-2">
                    Поиск
                  </label>
                  <div className="relative">
                    <Search
                      size={20}
                      className="absolute left-3 top-3 text-[#666666] dark:text-[#AAAAAA]"
                    />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E0E0E0] dark:border-[#404040] bg-white dark:bg-[#262626] text-[#0D0D0D] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF6B9D] focus:border-transparent"
                      placeholder="Поиск по имени или описанию"
                    />
                  </div>
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-medium text-[#0D0D0D] dark:text-white mb-2">
                    Город
                  </label>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#E0E0E0] dark:border-[#404040] bg-white dark:bg-[#262626] text-[#0D0D0D] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF6B9D] focus:border-transparent"
                  >
                    <option value="">Все города</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-[#0D0D0D] dark:text-white mb-2">
                    Категория
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#E0E0E0] dark:border-[#404040] bg-white dark:bg-[#262626] text-[#0D0D0D] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF6B9D] focus:border-transparent"
                  >
                    <option value="">Все категории</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-[#0D0D0D] dark:text-white mb-3">
                    Теги услуг
                  </label>

                  {selectedTags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {selectedTags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-[#FF6B9D] text-white cursor-pointer"
                          onClick={() => handleTagToggle(tag)}
                        >
                          {tag}
                          <span className="ml-1">×</span>
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
                    {tags
                      .filter((tag) => !selectedTags.includes(tag))
                      .map((tag) => (
                        <button
                          key={tag}
                          onClick={() => handleTagToggle(tag)}
                          className="px-3 py-1 rounded-full text-xs border border-[#E0E0E0] dark:border-[#404040] text-[#666666] dark:text-[#AAAAAA] hover:border-[#FF6B9D] hover:text-[#FF6B9D] transition-colors"
                        >
                          {tag}
                        </button>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-8">
            <div className="max-w-[800px]">
              {/* Results Header */}
              <div className="mb-8">
                <h1
                  className="text-3xl font-semibold text-[#0D0D0D] dark:text-white mb-3"
                  style={{ fontFamily: "Instrument Serif, serif" }}
                >
                  Найти мастера
                </h1>
                <p className="text-[#666666] dark:text-[#AAAAAA]">
                  Выберите подходящего специалиста для ваших потребностей
                </p>
              </div>

              {/* Provider Cards */}
              {filteredProviders.length === 0 ? (
                <div className="text-center py-12 text-[#666666] dark:text-[#AAAAAA]">
                  <Search size={48} className="mx-auto mb-4 opacity-50" />
                  <p>По вашему запросу ничего не найдено</p>
                  <p className="text-sm mt-2">
                    Попробуйте изменить параметры поиска
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredProviders.map((provider) => (
                    <div
                      key={provider.id}
                      className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-6 border border-[#E0E0E0] dark:border-[#404040] hover:shadow-lg transition-all duration-200 cursor-pointer hover:border-[#FF6B9D] dark:hover:border-[#FF8FB3]"
                      onClick={() =>
                        navigate(`/customer/provider/${provider.id}`)
                      }
                    >
                      {/* Avatar */}{" "}
                      <div className="flex items-start gap-6">
                        <img
                          src={provider.avatar}
                          alt={provider.name}
                          className="w-20 h-20 rounded-2xl object-cover"
                        />

                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-xl font-semibold text-[#0D0D0D] dark:text-white mb-1">
                                {provider.name}
                              </h3>
                              <div className="flex items-center gap-4 text-sm text-[#666666] dark:text-[#AAAAAA]">
                                <div className="flex items-center gap-1">
                                  <MapPin size={16} />
                                  <span>{provider.city}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Star
                                    size={16}
                                    className="fill-[#F59E0B] text-[#F59E0B]"
                                  />
                                  <span>{provider.rating}</span>
                                  <span>({provider.reviewCount})</span>
                                </div>
                              </div>
                            </div>
                            <button className="text-[#FF6B9D] hover:text-[#F55C91] flex items-center gap-1 text-sm">
                              <Eye size={16} />
                              Смотреть
                            </button>
                          </div>

                          <p className="text-[#666666] dark:text-[#AAAAAA] text-sm mb-4 leading-relaxed">
                            {provider.description}
                          </p>

                          {/* Categories */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {provider.categories.map((category) => (
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
                            {provider.tags.map((tag) => (
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
                            <span>от {provider.priceFrom} ₽</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
