import { WeatherData } from "@/lib/weather";
import Image from "next/image";

type Props = {
  data: WeatherData;
};

/* ============================================================
   TIME HELPERS (OpenWeather timestamps are UTC)
============================================================ */
function formatTimeUTC(timestamp: number, timezoneOffset: number) {
  return new Date((timestamp + timezoneOffset) * 1000).toLocaleTimeString(
    "en-US",
    {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
    }
  );
}

function formatLocalDateTimeUTC(
  timestamp: number,
  timezoneOffset: number
) {
  return new Date((timestamp + timezoneOffset) * 1000).toLocaleString(
    "en-US",
    {
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
    }
  );
}

/* ============================================================
   COUNTRY NAME
============================================================ */
const countryNames = new Intl.DisplayNames(["en"], {
  type: "region",
});

function getCountryName(code?: string) {
  if (!code) return null;
  return countryNames.of(code);
}

export function WeatherCard({ data }: Props) {
  return (
    <div className="weather-card space-y-5">
      {/* ======================
          LOCATION (PRIMARY)
      ====================== */}
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold tracking-tight">
            {data.name}, 
            {data.country && (
              <span className="ml-1 text-base font-normal text-muted-foreground">
                {getCountryName(data.country)}
              </span>
            )}
          </h2>

          {data.country && (
            <Image
              src={`https://flagcdn.com/w20/${data.country.toLowerCase()}.png`}
              alt={`${getCountryName(data.country)} flag`}
              width={20}
              height={14}
              className="border border-border"
            />
          )}
        </div>

        <p className="text-xs text-muted-foreground">
          Lat {data.lat.toFixed(3)} · Lon {data.lon.toFixed(3)}
          {data.elevation != null && ` · Elev ${data.elevation} m`}
        </p>
      </div>

      {/* ======================
          TIME & SUN
      ====================== */}
      {data.timezone != null && data.dt != null && (
        <div className="space-y-1 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>🕒</span>
            <span>
              Local time:{" "}
              <span className="text-foreground">
                {formatLocalDateTimeUTC(data.dt, data.timezone)}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            {data.sunrise != null && (
              <span>🌅 {formatTimeUTC(data.sunrise, data.timezone)}</span>
            )}
            {data.sunset != null && (
              <span>🌇 {formatTimeUTC(data.sunset, data.timezone)}</span>
            )}
          </div>
        </div>
      )}

      {/* ======================
          TEMPERATURE (HERO)
      ====================== */}
      <div className="flex items-start gap-6 py-4">
        <Image
          src={`https://openweathermap.org/img/wn/${data.icon}@4x.png`}
          alt={data.description}
          width={96}
          height={96}
        />

        <div>
          <p className="text-5xl font-semibold tracking-tight">
            {Math.round(data.temperature)}°C
          </p>

          <p className="mt-1 capitalize">
            {data.description}
          </p>

          {data.feelsLike != null && (
            <p className="text-sm text-muted-foreground">
              Feels like {Math.round(data.feelsLike)}°C
            </p>
          )}
        </div>
      </div>

      {/* ======================
          DETAILS (SCAN-ABLE)
      ====================== */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="flex items-center gap-2">
          💧 <span>{data.humidity}%</span>
        </div>

        {data.pressure != null && (
          <div className="flex items-center gap-2">
            🧭 <span>{data.pressure} hPa</span>
          </div>
        )}

        <div className="flex items-center gap-2">
          💨{" "}
          <span>
            {data.windSpeed} m/s
            {data.windDeg != null && ` · ${data.windDeg}°`}
          </span>
        </div>

        {data.cloudCover != null && (
          <div className="flex items-center gap-2">
            ☁️ <span>{data.cloudCover}%</span>
          </div>
        )}
      </div>

      {/* ======================
          DEBUG
      ====================== */}
      <details className="weather-card__debug">
        <summary className="cursor-pointer">
          Technical details
        </summary>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </details>
    </div>
  );
}
