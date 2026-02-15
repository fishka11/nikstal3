import getData from "../lib/fetchAPI";
import { getFirmData } from "../lib/queries";
import { daysOfWeekPl } from "../lib/variables";
import { v4 as uuidv4 } from "uuid";

// Pomocnicza funkcja do tłumaczenia dni
function translateDay(day) {
  if (!day) return "";

  const translation = daysOfWeekPl.find(
    (item) => item.en.toLowerCase() === day.toLowerCase(),
  );

  return translation?.shortPl || day;
}

export default async function OpeningHours({ style }) {
  try {
    const data = await getData(getFirmData);
    const firmData = data?.firmsData?.[0];

    if (!firmData?.workingHours || firmData.workingHours.length === 0) {
      return null; // Nie pokazuj komponentu jeśli brak danych
    }

    // Przetwórz godziny otwarcia
    const workingHours = firmData.workingHours
      .filter((item) => item?.day) // Filtruj niepełne dane
      .map((item) => ({
        id: item.id,
        day: translateDay(item.day),
        hours: item.closed
          ? "Zamknięte"
          : `${item.openingHour} - ${item.closingHour}`,
        closed: item.closed,
      }));

    if (workingHours.length === 0) {
      return null;
    }

    return (
      <div className={style.container}>
        <div className={style.titleContainer}>
          <h2 className={style.title}>Godziny otwarcia</h2>
        </div>

        <div className={style.hoursListContainer}>
          {workingHours.map((item) => (
            <p key={item.id} className="text-base font-light">
              {item.day}:{" "}
              <span className={item.closed ? "font-light" : "font-normal"}>
                {item.hours}
              </span>
            </p>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading opening hours:", error);
    return null;
  }
}
