// Регистрация исполнителя

import { useState } from "react";
import { ArrowLeft, Plus, X, User, MapPin, Tag, FileText } from "lucide-react";

export default function ProviderSetupPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  // Form state
  const [profileData, setProfileData] = useState({
    name: "",
    city: "",
    description: "",
    tags: [],
  });
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState({});
  const [schedule, setSchedule] = useState({});

  // UI state
  const [newTag, setNewTag] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [selectedCategoryForService, setSelectedCategoryForService] =
    useState("");
  const [newService, setNewService] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
  });
  const [newSlot, setNewSlot] = useState({
    date: "",
    time: "",
    duration: 60,
  });

  const predefinedTags = [
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

  const handleAddTag = (tag) => {
    if (tag && !profileData.tags.includes(tag)) {
      setProfileData((prev) => ({
        ...prev,
        tags: [...prev.tags, tag],
      }));
    }
    setNewTag("");
  };

  const handleRemoveTag = (tagToRemove) => {
    setProfileData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories((prev) => [...prev, newCategory]);
      setServices((prev) => ({ ...prev, [newCategory]: [] }));
    }
    setNewCategory("");
  };

  const handleRemoveCategory = (categoryToRemove) => {
    setCategories((prev) => prev.filter((cat) => cat !== categoryToRemove));
    setServices((prev) => {
      const newServices = { ...prev };
      delete newServices[categoryToRemove];
      return newServices;
    });
  };

  const handleAddService = () => {
    if (
      selectedCategoryForService &&
      newService.name &&
      newService.price &&
      newService.duration
    ) {
      setServices((prev) => ({
        ...prev,
        [selectedCategoryForService]: [
          ...(prev[selectedCategoryForService] || []),
          {
            id: Date.now(),
            ...newService,
            price: parseInt(newService.price),
            duration: parseInt(newService.duration),
          },
        ],
      }));
      setNewService({ name: "", description: "", price: "", duration: "" });
      setSelectedCategoryForService("");
    }
  };

  const handleRemoveService = (category, serviceId) => {
    setServices((prev) => ({
      ...prev,
      [category]: prev[category].filter((service) => service.id !== serviceId),
    }));
  };

  const saveProfileData = () => {
    const profileToSave = {
      profileData,
      categories,
      services,
      schedule,
      createdAt: Date.now(),
    };
    localStorage.setItem("providerProfile", JSON.stringify(profileToSave));
  };

  const handleAddSlot = () => {
    if (newSlot.date && newSlot.time) {
      const slotKey = `${newSlot.date}_${newSlot.time}`;
      setSchedule((prev) => ({
        ...prev,
        [slotKey]: {
          id: Date.now(),
          date: newSlot.date,
          time: newSlot.time,
          duration: newSlot.duration,
          available: true,
          bookedBy: null,
        },
      }));
      setNewSlot({ date: "", time: "", duration: 60 });
    }
  };

  const handleRemoveSlot = (slotKey) => {
    setSchedule((prev) => {
      const newSchedule = { ...prev };
      delete newSchedule[slotKey];
      return newSchedule;
    });
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const renderStep1 = () => (
    <div className="space-y-2 md:space-y-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-[#8B70F6] to-[#9D7DFF] rounded-2xl flex items-center justify-center mb-4 mx-auto">
          <User size={28} className="text-white" strokeWidth={1.5} />
        </div>
        <h2 className="text-3xl font-semibold text-[#0D0D0D] dark:text-white mb-3">
          Основная информация
        </h2>
        <p className="text-[#666666] dark:text-[#AAAAAA]">
          Расскажите о себе и своей деятельности
        </p>
      </div>

      <div className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-[#0D0D0D] dark:text-white mb-2">
            Ваше имя
          </label>
          <input
            type="text"
            value={profileData.name}
            onChange={(e) =>
              setProfileData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="w-full px-4 py-3 rounded-2xl border border-[#E0E0E0] dark:border-[#404040] bg-white dark:bg-[#1E1E1E] text-[#0D0D0D] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#8B70F6] focus:border-transparent"
            placeholder="Введите ваше имя"
          />
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-medium text-[#0D0D0D] dark:text-white mb-2">
            Город
          </label>
          <div className="relative">
            <MapPin
              size={20}
              className="absolute left-3 top-3.5 text-[#666666] dark:text-[#AAAAAA]"
            />
            <input
              type="text"
              value={profileData.city}
              onChange={(e) =>
                setProfileData((prev) => ({ ...prev, city: e.target.value }))
              }
              className="w-full pl-12 pr-4 py-3 rounded-2xl border border-[#E0E0E0] dark:border-[#404040] bg-white dark:bg-[#1E1E1E] text-[#0D0D0D] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#8B70F6] focus:border-transparent"
              placeholder="Ваш город"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-[#0D0D0D] dark:text-white mb-2">
            Описание деятельности
          </label>
          <div className="relative">
            <FileText
              size={20}
              className="absolute left-3 top-3.5 text-[#666666] dark:text-[#AAAAAA]"
            />
            <textarea
              value={profileData.description}
              onChange={(e) =>
                setProfileData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              rows={4}
              className="w-full pl-12 pr-4 py-3 rounded-2xl border border-[#E0E0E0] dark:border-[#404040] bg-white dark:bg-[#1E1E1E] text-[#0D0D0D] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#8B70F6] focus:border-transparent resize-none"
              placeholder="Расскажите о себе и ваших услугах..."
            />
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-[#0D0D0D] dark:text-white mb-2">
            Теги услуг
          </label>

          {/* Selected Tags */}
          {profileData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {profileData.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1.5 rounded-full text-sm bg-[#8B70F6] text-white"
                >
                  {tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-2 hover:bg-white/20 rounded-full p-0.5"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Add custom tag */}
          <div className="flex gap-2 mb-3 flex-wrap">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddTag(newTag)}
              className="flex-1 px-4 py-2 rounded-xl border border-[#E0E0E0] dark:border-[#404040] bg-white dark:bg-[#1E1E1E] text-[#0D0D0D] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#8B70F6] focus:border-transparent"
              placeholder="Добавить свой тег"
            />
            <button
              onClick={() => handleAddTag(newTag)}
              className="px-4 py-2 bg-[#8B70F6] text-white rounded-xl hover:bg-[#7E64F2] transition-colors"
            >
              <Plus size={20} />
            </button>
          </div>

          {/* Predefined Tags */}
          <div className="flex flex-wrap gap-2">
            {predefinedTags
              .filter((tag) => !profileData.tags.includes(tag))
              .map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleAddTag(tag)}
                  className="px-3 py-1.5 rounded-full text-sm border border-[#E0E0E0] dark:border-[#404040] text-[#666666] dark:text-[#AAAAAA] hover:border-[#8B70F6] hover:text-[#8B70F6] transition-colors"
                >
                  {tag}
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-[#FF6B9D] to-[#FF8FB3] rounded-2xl flex items-center justify-center mb-4 mx-auto">
          <Tag size={28} className="text-white" strokeWidth={1.5} />
        </div>
        <h2 className="text-3xl font-semibold text-[#0D0D0D] dark:text-white mb-3">
          Категории услуг
        </h2>
        <p className="text-[#666666] dark:text-[#AAAAAA]">
          Создайте категории для организации ваших услуг
        </p>
      </div>

      <div className="space-y-6">
        {/* Add Category */}
        <div className="flex gap-3 flex-wrap">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAddCategory()}
            className="flex-1 px-4 py-3 rounded-2xl border border-[#E0E0E0] dark:border-[#404040] bg-white dark:bg-[#1E1E1E] text-[#0D0D0D] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF6B9D] focus:border-transparent"
            placeholder="Название категории (например: Маникюр)"
          />
          <button
            onClick={handleAddCategory}
            className="px-6 py-3 bg-[#FF6B9D] text-white rounded-2xl hover:bg-[#F55C91] transition-colors flex items-center gap-2"
          >
            <Plus size={20} />
            Добавить
          </button>
        </div>

        {/* Categories List */}
        {categories.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-[#0D0D0D] dark:text-white">
              Ваши категории ({categories.length})
            </h3>
            <div className="space-y-3">
              {categories.map((category, index) => (
                <div
                  key={category}
                  className="flex items-center justify-between p-4 rounded-2xl border border-[#E0E0E0] dark:border-[#404040] bg-white dark:bg-[#1E1E1E]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#FF6B9D] to-[#FF8FB3] rounded-xl flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {index + 1}
                      </span>
                    </div>
                    <span className="text-[#0D0D0D] dark:text-white font-medium">
                      {category}
                    </span>
                  </div>
                  <button
                    onClick={() => handleRemoveCategory(category)}
                    className="p-2 text-[#666666] dark:text-[#AAAAAA] hover:text-red-500 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {categories.length === 0 && (
          <div className="text-center py-12 text-[#666666] dark:text-[#AAAAAA]">
            <Tag size={48} className="mx-auto mb-4 opacity-50" />
            <p>Создайте первую категорию услуг</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4 md:space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-semibold text-[#0D0D0D] dark:text-white mb-3">
          Настройка услуг
        </h2>
        <p className="text-[#666666] dark:text-[#AAAAAA]">
          Добавьте услуги в каждую категорию
        </p>
      </div>

      {categories.length === 0 ? (
        <div className="text-center py-12 text-[#666666] dark:text-[#AAAAAA]">
          <p>Сначала создайте категории на предыдущем шаге</p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Add Service Form */}
          <div className="p-6 rounded-2xl border border-[#E0E0E0] dark:border-[#404040] bg-[#F8F6F3] dark:bg-[#262626]">
            <h3 className="text-lg font-semibold text-[#0D0D0D] dark:text-white mb-4">
              Добавить новую услугу
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {/* Category Selection */}
              <div>
                <label className="block text-sm font-medium text-[#0D0D0D] dark:text-white mb-2">
                  Категория
                </label>
                <select
                  value={selectedCategoryForService}
                  onChange={(e) =>
                    setSelectedCategoryForService(e.target.value)
                  }
                  className="w-full px-3 py-2 rounded-xl border border-[#E0E0E0] dark:border-[#404040] bg-white dark:bg-[#1E1E1E] text-[#0D0D0D] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#8B70F6] focus:border-transparent"
                >
                  <option value="">Выберите категорию</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Service Name */}
              <div>
                <label className="block text-sm font-medium text-[#0D0D0D] dark:text-white mb-2">
                  Название услуги
                </label>
                <input
                  type="text"
                  value={newService.name}
                  onChange={(e) =>
                    setNewService((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full px-3 py-2 rounded-xl border border-[#E0E0E0] dark:border-[#404040] bg-white dark:bg-[#1E1E1E] text-[#0D0D0D] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#8B70F6] focus:border-transparent"
                  placeholder="Например: Классический маникюр"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-[#0D0D0D] dark:text-white mb-2">
                  Цена (₽)
                </label>
                <input
                  type="number"
                  value={newService.price}
                  onChange={(e) =>
                    setNewService((prev) => ({
                      ...prev,
                      price: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 rounded-xl border border-[#E0E0E0] dark:border-[#404040] bg-white dark:bg-[#1E1E1E] text-[#0D0D0D] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#8B70F6] focus:border-transparent"
                  placeholder="1200"
                />
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-medium text-[#0D0D0D] dark:text-white mb-2">
                  Время (мин)
                </label>
                <input
                  type="number"
                  value={newService.duration}
                  onChange={(e) =>
                    setNewService((prev) => ({
                      ...prev,
                      duration: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 rounded-xl border border-[#E0E0E0] dark:border-[#404040] bg-white dark:bg-[#1E1E1E] text-[#0D0D0D] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#8B70F6] focus:border-transparent"
                  placeholder="60"
                />
              </div>
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#0D0D0D] dark:text-white mb-2">
                Описание (опционально)
              </label>
              <textarea
                value={newService.description}
                onChange={(e) =>
                  setNewService((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                rows={2}
                className="w-full px-3 py-2 rounded-xl border border-[#E0E0E0] dark:border-[#404040] bg-white dark:bg-[#1E1E1E] text-[#0D0D0D] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#8B70F6] focus:border-transparent resize-none"
                placeholder="Краткое описание услуги..."
              />
            </div>

            <button
              onClick={handleAddService}
              disabled={
                !selectedCategoryForService ||
                !newService.name ||
                !newService.price ||
                !newService.duration
              }
              className={`w-full px-4 py-2 rounded-xl text-white transition-colors ${selectedCategoryForService &&
                  newService.name &&
                  newService.price &&
                  newService.duration
                  ? "bg-[#8B70F6] hover:bg-[#7E64F2]"
                  : "bg-[#C0C0C0] dark:bg-[#404040] cursor-not-allowed"
                }`}
            >
              Добавить услугу
            </button>
          </div>

          {/* Services by Categories */}
          {categories.map((category) => (
            <div
              key={category}
              className="p-6 rounded-2xl border border-[#E0E0E0] dark:border-[#404040] bg-white dark:bg-[#1E1E1E]"
            >
              <h3 className="text-xl font-semibold text-[#0D0D0D] dark:text-white mb-4">
                {category} ({services[category]?.length || 0})
              </h3>

              {services[category] && services[category].length > 0 ? (
                <div className="space-y-3">
                  {services[category].map((service) => (
                    <div
                      key={service.id}
                      className="flex items-center justify-between p-4 rounded-xl bg-[#F8F6F3] dark:bg-[#262626]"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium text-[#0D0D0D] dark:text-white">
                          {service.name}
                        </h4>
                        {service.description && (
                          <p className="text-sm text-[#666666] dark:text-[#AAAAAA] mt-1">
                            {service.description}
                          </p>
                        )}
                        <div className="flex items-center gap-4 mt-2 text-sm text-[#666666] dark:text-[#AAAAAA]">
                          <span>{service.price} ₽</span>
                          <span>{service.duration} мин</span>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          handleRemoveService(category, service.id)
                        }
                        className="p-2 text-[#666666] dark:text-[#AAAAAA] hover:text-red-500 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-[#666666] dark:text-[#AAAAAA]">
                  <p>В этой категории пока нет услуг</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-semibold text-[#0D0D0D] dark:text-white mb-3">
          Расписание
        </h2>
        <p className="text-[#666666] dark:text-[#AAAAAA]">
          Настройте доступные слоты для записи
        </p>
      </div>

      <div className="space-y-8">
        {/* Add Slot Form */}
        <div className="p-6 rounded-2xl border border-[#E0E0E0] dark:border-[#404040] bg-[#F8F6F3] dark:bg-[#262626]">
          <h3 className="text-lg font-semibold text-[#0D0D0D] dark:text-white mb-4">
            Добавить временной слот
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-[#0D0D0D] dark:text-white mb-2">
                Дата
              </label>
              <input
                type="date"
                value={newSlot.date}
                min={getTodayDate()}
                onChange={(e) =>
                  setNewSlot((prev) => ({ ...prev, date: e.target.value }))
                }
                className="w-full px-3 py-2 rounded-xl border border-[#E0E0E0] dark:border-[#404040] bg-white dark:bg-[#1E1E1E] text-[#0D0D0D] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#8B70F6] focus:border-transparent"
              />
            </div>

            {/* Time */}
            <div>
              <label className="block text-sm font-medium text-[#0D0D0D] dark:text-white mb-2">
                Время
              </label>
              <input
                type="time"
                value={newSlot.time}
                onChange={(e) =>
                  setNewSlot((prev) => ({ ...prev, time: e.target.value }))
                }
                className="w-full px-3 py-2 rounded-xl border border-[#E0E0E0] dark:border-[#404040] bg-white dark:bg-[#1E1E1E] text-[#0D0D0D] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#8B70F6] focus:border-transparent"
              />
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-[#0D0D0D] dark:text-white mb-2">
                Длительность (мин)
              </label>
              <select
                value={newSlot.duration}
                onChange={(e) =>
                  setNewSlot((prev) => ({
                    ...prev,
                    duration: parseInt(e.target.value),
                  }))
                }
                className="w-full px-3 py-2 rounded-xl border border-[#E0E0E0] dark:border-[#404040] bg-white dark:bg-[#1E1E1E] text-[#0D0D0D] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#8B70F6] focus:border-transparent"
              >
                <option value={30}>30 мин</option>
                <option value={60}>60 мин</option>
                <option value={90}>90 мин</option>
                <option value={120}>120 мин</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleAddSlot}
            disabled={!newSlot.date || !newSlot.time}
            className={`w-full px-4 py-2 rounded-xl text-white transition-colors ${newSlot.date && newSlot.time
                ? "bg-[#8B70F6] hover:bg-[#7E64F2]"
                : "bg-[#C0C0C0] dark:bg-[#404040] cursor-not-allowed"
              }`}
          >
            Добавить слот
          </button>
        </div>

        {/* Schedule List */}
        <div className="p-6 rounded-2xl border border-[#E0E0E0] dark:border-[#404040] bg-white dark:bg-[#1E1E1E]">
          <h3 className="text-xl font-semibold text-[#0D0D0D] dark:text-white mb-4">
            Ваше расписание ({Object.keys(schedule).length} слотов)
          </h3>

          {Object.keys(schedule).length > 0 ? (
            <div className="space-y-3">
              {Object.entries(schedule)
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([slotKey, slot]) => (
                  <div
                    key={slotKey}
                    className="flex items-center justify-between p-4 rounded-xl bg-[#F8F6F3] dark:bg-[#262626]"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-4">
                        <div className="text-sm">
                          <span className="font-medium text-[#0D0D0D] dark:text-white">
                            {new Date(slot.date).toLocaleDateString("ru-RU", {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                          <span className="text-[#666666] dark:text-[#AAAAAA] ml-2">
                            в {slot.time}
                          </span>
                        </div>
                        <span className="text-xs px-2 py-1 rounded-full bg-[#10B981]/10 text-[#10B981]">
                          {slot.duration} мин
                        </span>
                        <span className="text-xs px-2 py-1 rounded-full bg-[#8B70F6]/10 text-[#8B70F6]">
                          {slot.available ? "Свободен" : "Занят"}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveSlot(slotKey)}
                      className="p-2 text-[#666666] dark:text-[#AAAAAA] hover:text-red-500 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-8 text-[#666666] dark:text-[#AAAAAA]">
              <p>Добавьте первый временной слот для записи</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      default:
        return renderStep1();
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete setup - save data and redirect
      saveProfileData();
      window.location.href = "/provider/dashboard";
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      window.location.href = "/";
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return profileData.name && profileData.city && profileData.description;
      case 2:
        return categories.length > 0;
      case 3:
        return true; // For now, always valid
      case 4:
        return true; // For now, always valid
      default:
        return false;
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
        <header className="px-6 py-6">
          <div className="max-w-[800px] mx-auto flex items-center justify-between">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-[#666666] dark:text-[#AAAAAA] hover:text-[#0D0D0D] dark:hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
              Назад
            </button>

            <div className="flex items-center space-x-3">
              {/* <div className="w-8 h-8 bg-gradient-to-br from-[#8B70F6] to-[#9D7DFF] rounded-xl"></div>
              <span className="text-[#0D0D0D] dark:text-white text-xl font-medium">
                ServiceHub
              </span> */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 211 41" width="211" height="41">
                <path fill="#FF6F3C" d="M194.8,40.4h-61.7c-2.1,0-3.4-1.8-2.8-4l9.2-32.5c0.5-1.8,2.4-3.3,4.2-3.3h61.7c2.1,0,3.4,1.8,2.8,4l-9.2,32.5c-0.5,1.8-2.4,3.3-4.2,3.3Z" />
                <path fill="#FF6F3C" d="M11.6,16.7l-0.6,1.9h10.2l-2,7.4-3.7,2.6H0l1.3-4.4h10.2l0.6-2H1.9l2-7.3,3.7-2.7h15.4l-1.2,4.4h-10.2ZM20.6,28.6l4.7-16.3h17.3l-1.3,4.4h-9.2l-0.6,1.9h9.2l-1.1,3.6h-9.2l-0.6,1.9h9.2l-1.2,4.4h-17.4ZM39.6,28.6l4.7-16.3h19.2l-2,6.9-4.3,1.6,3.4,1.3-1.9,6.6h-8.5l1.3-4.4h-2l-1.3,4.4h-8.7ZM53.2,18.7l0.6-1.9h-1.9l-0.6,1.9h2ZM65.1,12.4h8.5l-2.8,10h2l2.8-10h8.5l-2.8,10-8.6,6.3h-5.2l-5.1-6.3,2.8-10ZM93.9,12.4l-4.7,16.3h-8.1l4.7-16.3h8.1ZM91,28.6l4.7-16.3h18.6l-2,7.1h-8.5l0.8-2.7h-2l-2.2,7.6h1.9l0.8-2.9h8.5l-1.3,4.7-3.7,2.6h-15.7ZM111.2,28.6l4.7-16.3h17.3l-1.3,4.4h-9.2l-0.6,1.9h9.2l-1.1,3.6h-9.2l-0.6,1.9h9.2l-1.2,4.4h-17.4Z" />

                <path fill="#1A1A1A" d="M141.2,12.4h8.5l-1.8,6.3h2l1.7-6.3h8.5l-4.7,16.3h-8.5l1.7-6.3h-1.9l-1.7,6.3h-8.5l4.7-16.3ZM157.2,28.6l4.7-16.3h8.6l-3.4,11.9h1.9l3.4-11.9h8.6l-3.9,13.7-3.7,2.6h-16.3ZM178.1,28.6l4.7-16.3h19.4l-2,6.9-3,1.3,2.5,0.7-1.4,4.7-3.7,2.6h-16.5ZM190.5,22.3h-1.9l-0.6,1.9h2l0.6-1.9ZM190.2,16.7l-0.6,1.9h2l0.6-1.9h-2Z" />
              </svg>
            </div>


          </div>
        </header>

        {/* Progress Bar */}
        <div className="px-6 mb-8">
          <div className="max-w-[800px] mx-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#666666] dark:text-[#AAAAAA]">
                Шаг {currentStep} из {totalSteps}
              </span>
              <span className="text-sm text-[#666666] dark:text-[#AAAAAA]">
                {Math.round((currentStep / totalSteps) * 100)}%
              </span>
            </div>
            <div className="w-full bg-[#E0E0E0] dark:bg-[#404040] rounded-full h-2">
              <div
                className="bg-gradient-to-r from-[#8B70F6] to-[#9D7DFF] h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="px-6 pb-12">
          <div className="max-w-[800px] mx-auto">
            <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-6 md:p-8 shadow-lg">
              {renderCurrentStep()}

              {/* Navigation */}
              <div className="flex justify-between mt-12 pt-8 border-t border-[#E0E0E0] dark:border-[#404040]">
                <button
                  onClick={handleBack}
                  className="px-6 py-3 rounded-2xl border border-[#E0E0E0] dark:border-[#404040] text-[#666666] dark:text-[#AAAAAA] hover:border-[#C0C0C0] dark:hover:border-[#606060] transition-colors"
                >
                  {currentStep === 1 ? "На главную" : "Назад"}
                </button>

                <button
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className={`px-6 py-3 rounded-2xl text-white transition-colors ${isStepValid()
                      ? "bg-gradient-to-r from-[#8B70F6] to-[#9D7DFF] hover:from-[#7E64F2] hover:to-[#8B70F6]"
                      : "bg-[#C0C0C0] dark:bg-[#404040] cursor-not-allowed"
                    }`}
                >
                  {currentStep === totalSteps ? "Завершить" : "Далее"}
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
