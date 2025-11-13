import { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProviderCard from "../components/providers/ProviderCard";
import FilterSidebar from "../components/filters/FilterSidebar";
import PageHeader from "../components/common/PageHeader";
import EmptyState from "../components/common/EmptyState";
import { useProviders } from "../hooks/userProviders";

export default function CustomerBrowsePage() {
  const { providers, loading, error } = useProviders();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  // 🆕 Загрузка данных при монтировании
  // useEffect(() => {
  //   const fetchProviders = async () => {
  //     try {
  //       setLoading(true);

  //       // Получаем всех исполнителей с тегами и базовой инфой
  //       const { data, error } = await supabase
  //         .from("profiles")
  //         .select(
  //           `
  //           id,
  //           full_name,
  //           city,
  //           performer_profiles!inner(bio)
  //           performer_tags!inner(tag)
  //         `
  //         )
  //         .order("full_name", { ascending: true });
  //       console.log("Данные из БД: ", data);
  //       if (error) throw error;

  //       // Получаем теги для всех мастеров
  //       const performerIds = data.map((p) => p.id);
  //       const { data: tagsData } = await supabase
  //         .from("performer_tags")
  //         .select("performer_id, tag")
  //         .in("performer_id", performerIds);

  //       // Группируем теги по мастеру
  //       const tagsByPerformer = {};
  //       tagsData.forEach((t) => {
  //         if (!tagsByPerformer[t.performer_id])
  //           tagsByPerformer[t.performer_id] = [];
  //         tagsByPerformer[t.performer_id].push(t.tag);
  //       });

  //       // Формируем данные в формате, совместимом с твоим UI
  //       const formattedProviders = data.map((profile) => ({
  //         id: profile.id, // UUID!
  //         name: profile.full_name,
  //         city: profile.city,
  //         description:
  //           profile.performer_profiles.bio || "Информация временно недоступна",
  //         tags: tagsByPerformer[profile.id] || [],
  //         rating: 4.8, // 🔜 позже можно добавить реальные отзывы
  //         reviewCount: 0,
  //         priceFrom: 1000, // 🔜 позже: MIN(services.price)
  //         categories: [], // 🔜 пока пусто, но можно добавить
  //         avatar: "https://placehold.co/150?text=👤", // 🔜 позже: фото из storage
  //       }));

  //       setProviders(formattedProviders);
  //     } catch (err) {
  //       console.error("Ошибка загрузки мастеров:", err);
  //       setError("Не удалось загрузить список мастеров");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchProviders();
  // }, []);

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

  // const providers = [
  //   {
  //     id: 1,
  //     name: "Анна Смирнова",
  //     city: "Москва",
  //     description:
  //       "Профессиональный мастер маникюра с опытом работы более 5 лет. Специализируюсь на классическом и аппаратном маникюре.",
  //     tags: ["маникюр", "педикюр", "дизайн ногтей"],
  //     rating: 4.8,
  //     reviewCount: 124,
  //     priceFrom: 1200,
  //     categories: ["Маникюр", "Педикюр"],
  //     avatar:
  //       "https://images.unsplash.com/photo-1494790108755-2616c96f31d5?auto=format&fit=crop&w=150&q=80",
  //   },
  //   {
  //     id: 2,
  //     name: "Елена Козлова",
  //     city: "Москва",
  //     description:
  //       "Мастер по наращиванию ресниц и оформлению бровей. Использую только качественные материалы.",
  //     tags: ["брови", "ресницы", "татуаж"],
  //     rating: 4.9,
  //     reviewCount: 89,
  //     priceFrom: 800,
  //     categories: ["Брови", "Ресницы"],
  //     avatar:
  //       "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
  //   },
  //   {
  //     id: 3,
  //     name: "Мария Петрова",
  //     city: "Санкт-Петербург",
  //     description:
  //       "Стилист-парикмахер. Создаю стильные образы для любого случая. Специализируюсь на окрашивании и стрижках.",
  //     tags: ["стрижка", "окрашивание", "укладка"],
  //     rating: 4.7,
  //     reviewCount: 203,
  //     priceFrom: 2000,
  //     categories: ["Стрижка", "Окрашивание"],
  //     avatar:
  //       "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
  //   },
  //   {
  //     id: 4,
  //     name: "Ольга Иванова",
  //     city: "Москва",
  //     description:
  //       "Массажист и косметолог. Предлагаю широкий спектр услуг для ухода за телом и лицом.",
  //     tags: ["массаж", "косметология", "депиляция"],
  //     rating: 4.6,
  //     reviewCount: 156,
  //     priceFrom: 1500,
  //     categories: ["Массаж", "Косметология"],
  //     avatar:
  //       "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?auto=format&fit=crop&w=150&q=80",
  //   },
  //   {
  //     id: 5,
  //     name: "Татьяна Волкова",
  //     city: "Екатеринбург",
  //     description:
  //       "Мастер универсал. Выполняю маникюр, педикюр, наращивание ногтей. Индивидуальный подход к каждому клиенту.",
  //     tags: ["маникюр", "педикюр", "наращивание"],
  //     rating: 4.5,
  //     reviewCount: 98,
  //     priceFrom: 1000,
  //     categories: ["Маникюр", "Педикюр"],
  //     avatar:
  //       "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
  //   },
  // ];

  const handleTagToggle = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCity("");
    setSelectedCategory("");
    setSelectedTags([]);
  };

  const filteredProviders = providers.filter((provider) => {
    const matchesSearch =
      provider.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCity = !selectedCity || provider.city === selectedCity;

    // Временно отключено — категории не загружаются из БД
    const matchesCategory = true;

    const matchesTags =
      selectedTags.length === 0 ||
      (Array.isArray(provider.tags) &&
        selectedTags.some((tag) => provider.tags.includes(tag)));

    return matchesSearch && matchesCity && matchesCategory && matchesTags;
  });

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F6F3] to-[#ECE9E5] dark:from-[#1A1A1A] dark:to-[#0F0F0F]">
      <PageHeader backTo="/" backLabel="На главную" />

      <div className="flex flex-wrap">
        <FilterSidebar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCity={selectedCity}
          onCityChange={setSelectedCity}
          cities={cities}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categories={categories}
          selectedTags={selectedTags}
          onTagToggle={handleTagToggle}
          tags={tags}
          onReset={handleResetFilters}
        />

        <main className="flex-1 p-6 md:p-8">
          <div className="max-w-[800px]">
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
              <p className="text-sm text-[#666666] dark:text-[#AAAAAA] mt-2">
                Найдено мастеров: {filteredProviders.length}
              </p>
            </div>

            {filteredProviders.length === 0 ? (
              <EmptyState
                icon={Search}
                title="По вашему запросу ничего не найдено"
                description="Попробуйте изменить параметры поиска"
              />
            ) : (
              <div className="flex flex-col gap-6">
                {filteredProviders.map((provider) => (
                  <ProviderCard
                    name={provider.name}
                    avatar={provider.avatar}
                    description={provider.description}
                    city={provider.city}
                    categories={provider.categories}
                    tags={provider.tags}
                    priceFrom={provider.priceFrom}
                    key={provider.id}
                    onClick={() =>
                      navigate(`/customer/provider/${provider.id}`)
                    }
                  />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

/** 
                <div className="space-y-6">
                  {filteredProviders.map((provider) => (
                    <div
                      key={provider.id}
                      className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-6 border border-[#E0E0E0] dark:border-[#404040] hover:shadow-lg transition-all duration-200 cursor-pointer hover:border-[#FF6B9D] dark:hover:border-[#FF8FB3]"
                      onClick={() =>
                        navigate(`/customer/provider/${provider.id}`)
                      }
                    >
                      
                      <div className="flex items-start gap-6">
                        <img
                          src={provider.avatar}
                          alt={provider.name}
                          className="w-20 h-20 rounded-2xl object-cover"
                        />

                        
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

                          
                          <div className="flex items-center gap-1 text-lg font-semibold text-[#0D0D0D] dark:text-white">
                            <DollarSign size={18} />
                            <span>от {provider.priceFrom} ₽</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                */
