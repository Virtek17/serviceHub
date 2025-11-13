// src/hooks/usePerformerServicesFlat.js
import { useEffect, useState, useCallback } from "react";
import { fetchPerformerServicesFlat, updateService } from "../Api/services";

export function usePerformerServicesFlat(performerId) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Загрузка всех услуг
  useEffect(() => {
    if (!performerId) return;
    let cancelled = false;

    setLoading(true);
    fetchPerformerServicesFlat(performerId)
      .then((data) => {
        if (!cancelled) setServices(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [performerId]);

  // Функция обновления услуги
  const editService = useCallback(async (serviceId, updates) => {
    try {
      await updateService(serviceId, updates);

      // Обновляем локальное состояние
      setServices((prev) =>
        prev.map((s) =>
          s.id === serviceId
            ? {
                ...s,
                name: updates.name,
                description: updates.description,
                price: Number(updates.price),
                duration: Number(updates.duration),
              }
            : s
        )
      );
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  return { services, loading, error, editService };
}
