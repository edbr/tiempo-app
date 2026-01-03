import { WeatherData } from "@/lib/weather";
import Image from "next/image";

type Props = {
  data: WeatherData;
};

/* ============================================================
   TIME HELPERS (OpenWeather timestamps are UTC)
============================================================ */
function formatTimeUTC(
  timestamp: number,
  timezoneOffset: number
) {
  return new Date(
    (timestamp + timezoneOffset) * 1000
  ).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });
}

function formatLocalDateTimeUTC(
  timestamp: number,
  timezoneOffset: number
) {
  return new Date(
    (timestamp + timezoneOffset) * 1000
  ).toLocaleString("en-US", {
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });
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
    <div className="weather-card">
      {/* ======================
          Location
      ====================== */}
      <div className="weather-card__location">
        <div className="flex items-center gap-2">
          <h2 className="weather-card__city">
            {data.name}
            {data.country && (
              <span className="ml-2 text-muted-foreground text-base">
                {getCountryName(data.country)}
              </span>
            )}
          </h2>

          {data.country && (
            <Image
              src={`https://flagcdn.com/w20/${data.country.toLowerCase()}.png`}
              alt={`${getCountryName(data.country)} flag`}
              width={20}
              height={15}
              className="border border-border"
            />
          )}
        </div>

        <p className="weather-card__meta">
          Lat {data.lat.toFixed(3)}, Lon {data.lon.toFixed(3)}
        </p>

        {data.elevation != null && (
          <p className="weather-card__meta">
            Elevation: {data.elevation.toLocaleString()} m
          </p>
        )}
      </div>

      {/* ======================
          Time & Sun
      ====================== */}
      {data.timezone != null && data.dt != null && (
        <div className="weather-card__time">
          <p className="weather-card__meta">
            Local time:{" "}
            <strong>
              {formatLocalDateTimeUTC(data.dt, data.timezone)}
            </strong>
          </p>

          {(data.sunrise != null || data.sunset != null) && (
            <p className="weather-card__meta">
              {data.sunrise != null && (
                <>
                  Sunrise{" "}
                  <strong>
                    {formatTimeUTC(data.sunrise, data.timezone)}
                  </strong>
                </>
              )}

              {data.sunrise != null && data.sunset != null && " · "}

              {data.sunset != null && (
                <>
                  Sunset{" "}
                  <strong>
                    {formatTimeUTC(data.sunset, data.timezone)}
                  </strong>
                </>
              )}
            </p>
          )}
        </div>
      )}

      {/* ======================
          Primary Weather
      ====================== */}
      <div className="weather-card__primary">
        <Image
          src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
          alt={data.description}
          width={64}
          height={64}
        />

        <div>
          <p className="weather-card__temp">
            {Math.round(data.temperature)}°C
          </p>

          <p className="weather-card__description capitalize">
            {data.description}
          </p>

          {data.feelsLike != null && (
            <p className="weather-card__meta">
              Feels like {Math.round(data.feelsLike)}°C
            </p>
          )}
        </div>
      </div>

      {/* ======================
          Details
      ====================== */}
      <div className="weather-card__details">
        <div className="weather-card__detail">
          <span className="weather-card__label">Humidity</span>
          <span className="weather-card__value">
            {data.humidity}%
          </span>
        </div>

        {data.pressure != null && (
          <div className="weather-card__detail">
            <span className="weather-card__label">Pressure</span>
            <span className="weather-card__value">
              {data.pressure} hPa
            </span>
          </div>
        )}

        <div className="weather-card__detail">
          <span className="weather-card__label">Wind</span>
          <span className="weather-card__value">
            {data.windSpeed} m/s
            {data.windDeg != null && ` · ${data.windDeg}°`}
          </span>
        </div>

        {data.rain1h != null && (
          <div className="weather-card__detail">
            <span className="weather-card__label">Rain (1h)</span>
            <span className="weather-card__value">
              {data.rain1h} mm
            </span>
          </div>
        )}

        {data.cloudCover != null && (
          <div className="weather-card__detail">
            <span className="weather-card__label">Clouds</span>
            <span className="weather-card__value">
              {data.cloudCover}%
            </span>
          </div>
        )}
      </div>

      {/* ======================
          Debug
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
