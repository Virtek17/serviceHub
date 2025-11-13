// src/hooks/useTimeSlots.js
import { useState, useEffect, useCallback } from "react";
import {
  fetchSlots,
  createSlot,
  updateSlot,
  deleteSlot,
} from "../Api/timeSlots";

export function useTimeSlots(performerId) {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Загрузка
  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await fetchSlots(performerId);
      setSlots(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [performerId]);

  useEffect(() => {
    load();
  }, [load]);

  // Создание
  const addSlot = useCallback(async (slotData) => {
    const newSlot = await createSlot(slotData);
    setSlots((prev) => [...prev, newSlot]);
    return newSlot;
  }, []);

  // Обновление
  const editSlot = useCallback(async (id, patch) => {
    const updated = await updateSlot(id, patch);
    setSlots((prev) => prev.map((slot) => (slot.id === id ? updated : slot)));
    return updated;
  }, []);

  // Удаление
  const removeSlot = useCallback(async (id) => {
    await deleteSlot(id);
    setSlots((prev) => prev.filter((s) => s.id !== id));
  }, []);

  return {
    slots,
    loading,
    error,
    addSlot,
    editSlot,
    removeSlot,
    reload: load,
  };
}
