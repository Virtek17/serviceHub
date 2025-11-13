// src/api/bookings.js
import { supabase } from "../lib/createClient";

/**
 * Создаёт запись в таблице bookings
 * @param {Object} bookingData
 * @param {string} bookingData.customer_id
 * @param {string} bookingData.performer_id
 * @param {number} bookingData.service_id
 * @param {number} bookingData.slot_id
 */
export async function createBooking(bookingData) {
  const { error } = await supabase.from("bookings").insert(bookingData);

  if (error) {
    console.error("[Booking] Ошибка:", error);
    throw new Error(error.message || "Не удалось создать запись");
  }
}
