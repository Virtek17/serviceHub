// src/api/services.js
import { supabase } from "../lib/createClient";

export async function fetchPerformerServicesFlat(performerId) {
  try {
    // 1. Сначала достаём категории мастера
    const { data: categories, error: catError } = await supabase
      .from("service_categories")
      .select("id, name")
      .eq("performer_id", performerId);

    if (catError) throw catError;
    if (!categories?.length) return [];

    const categoryIds = categories.map((c) => c.id);

    // 2. Достаём все услуги по этим категориям
    const { data: services, error: servError } = await supabase
      .from("services")
      .select("id, name, description, price, duration_minutes, category_id")
      .in("category_id", categoryIds)
      .order("id", { ascending: true });

    if (servError) throw servError;

    // 3. Склеиваем с названиями категорий
    const categoriesById = Object.fromEntries(
      categories.map((c) => [c.id, c.name])
    );

    return services.map((s) => ({
      id: s.id,
      name: s.name,
      description: s.description,
      price: Number(s.price),
      duration: s.duration_minutes,
      category: categoriesById[s.category_id] || "Без категории",
    }));
  } catch (error) {
    console.error("[API] Ошибка загрузки услуг мастера:", error);
    return [];
  }
}

export async function updateService(serviceId, updates) {
  try {
    const { data, error } = await supabase
      .from("services")
      .update({
        name: updates.name,
        description: updates.description,
        price: updates.price,
        duration_minutes: updates.duration,
        category_id: updates.category_id,
      })
      .eq("id", serviceId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (err) {
    console.error("[API] Ошибка обновления услуги:", err);
    throw new Error("Не удалось обновить услугу");
  }
}
