// src/api/provider.js
import { supabase } from "../lib/createClient";

/**
 * Загружает профиль мастера по ID
 * @param {string} providerId UUID мастера
 * @returns {Promise<Object>} данные мастера
 */
export async function fetchProviderById(providerId) {
  console.log("[API] Запрос профиля мастера с ID:", providerId);

  // 1. Профиль + теги
  const profileResult = await supabase
    .from("profiles")
    .select(
      `
      id,
      full_name,
      city,
      photo_url,
      performer_profiles!inner(
        bio,
        performer_tags!inner(tag)
      )
    `
    )
    .eq("id", providerId)
    .single();

  // console.log("[API] Ответ profiles:", profileResult);

  if (profileResult.error) {
    console.error("[API] Ошибка загрузки профиля:", profileResult.error);
    throw profileResult.error;
  }

  const profile = profileResult.data;
  // console.log("[API] Успешно загружен профиль:", profile);

  // 2. Услуги с категориями
  const servicesResult = await supabase
    .from("services")
    .select(
      `
      id,
      name,
      description,
      price,
      duration_minutes,
      service_categories(name)
    `
    )
    .eq("service_categories.performer_id", providerId)
    .order("name", { ascending: true });

  // console.log("[API] Ответ services:", servicesResult);

  if (servicesResult.error) {
    console.error("[API] Ошибка загрузки услуг:", servicesResult.error);
    throw servicesResult.error;
  }

  const services = servicesResult.data || [];
  // console.log("[API] Успешно загружено услуг:", services.length);

  // Группируем услуги по категориям
  const categoriesMap = {};
  services.forEach((s) => {
    const catName = s.service_categories?.name;
    if (!catName) return; // защита от null
    if (!categoriesMap[catName]) categoriesMap[catName] = [];
    categoriesMap[catName].push({
      id: s.id,
      name: s.name,
      description: s.description || "",
      price: s.price,
      duration: s.duration_minutes,
    });
  });

  const servicesByCategory = Object.entries(categoriesMap).map(
    ([category, items]) => ({
      category,
      items,
    })
  );

  // console.log(
  //   "[API] Сгруппированные услуги по категориям:",
  //   servicesByCategory
  // );

  // 3. Слоты
  const slotsResult = await supabase
    .from("time_slots")
    .select("id, start_time, end_time, is_available")
    .eq("performer_id", providerId)
    .order("start_time", { ascending: true });

  // console.log("[API] Ответ time_slots:", slotsResult);

  if (slotsResult.error) {
    // console.error("[API] Ошибка загрузки слотов:", slotsResult.error);
    throw slotsResult.error;
  }

  const slots = slotsResult.data || [];
  // console.log("[API] Успешно загружено слотов:", slots.length);

  // Форматируем слоты под UI
  const formattedSlots = slots.map((slot) => ({
    id: slot.id,
    date: slot.start_time.split("T")[0], // "2025-11-20"
    time: slot.start_time.split("T")[1].slice(0, 5), // "10:00"
    available: slot.is_available,
  }));

  // console.log("[API] Отформатированные слоты:", formattedSlots);

  // 4. Формируем результат
  const result = {
    id: profile.id,
    name: profile.full_name,
    city: profile.city,
    description:
      profile.performer_profiles?.bio || "Информация временно недоступна",
    tags: profile.performer_profiles?.performer_tags?.map((t) => t.tag) || [],
    rating: 4.8,
    reviewCount: 0,
    avatar: profile.photo_url || null,
    services: servicesByCategory,
    timeSlots: formattedSlots,
  };

  console.log("[API] Итоговый объект мастера:", result);
  return result;
}
