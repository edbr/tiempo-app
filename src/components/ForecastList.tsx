import { weatherCodeToDisplay } from "@/lib/weather-icons";

type ForecastDay = {
  date: number;
  min: number;
  max: number;
  weatherCode: number;
};

export function ForecastList({ days }: { days: ForecastDay[] }) {
  return (
    <div className="mt-4 space-y-2">
      {days.map((day) => {
        const weather = weatherCodeToDisplay(day.weatherCode);

        return (
          <div
            key={day.date}
            className="flex items-center gap-4 rounded bg-white px-4 py-3 shadow-sm"
          >
            {/* Day */}
            <span className="w-16 text-sm font-medium">
              {new Date(day.date).toLocaleDateString(undefined, {
                weekday: "short",
              })}
            </span>

            {/* Icon + description (left aligned) */}
            <span className="flex items-center gap-2 min-w-[160px] text-left">
              <span className="text-xl">{weather.icon}</span>
              <span className="text-sm text-gray-600">
                {weather.label}
              </span>
            </span>

            {/* Temps (right aligned) */}
            <span className="ml-auto font-medium">
              {day.max}° / {day.min}°
            </span>
          </div>
        );
      })}
    </div>
  );
}
