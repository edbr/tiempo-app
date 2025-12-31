import { WeatherData } from "@/lib/weather";
import Image from "next/image";

type Props = {
  data: WeatherData;
};

export function WeatherCard({ data }: Props) {
  return (
    <div className="weather-card">
      {/* Location */}
      <div className="weather-card__location">
        <h2 className="weather-card__city">{data.city}</h2>
        <p className="weather-card__meta">
          Lat {data.lat.toFixed(3)}, Lon {data.lon.toFixed(3)}
        </p>
        {data.elevation !== undefined && (
          <p className="weather-card__meta">
            Elevation: {data.elevation.toLocaleString()} m
          </p>
        )}
      </div>

      {/* Primary weather */}
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
          <p className="weather-card__description">
            {data.description}
          </p>
        </div>
      </div>

      {/* Details */}
      <div className="weather-card__details">
        <div className="weather-card__detail">
          <span className="weather-card__label">Humidity</span>
          <span className="weather-card__value">{data.humidity}%</span>
        </div>

        <div className="weather-card__detail">
          <span className="weather-card__label">Wind Speed</span>
          <span className="weather-card__value">{data.windSpeed} m/s</span>
        </div>

        <div className="weather-card__detail">
          <span className="weather-card__label">Condition</span>
          <span className="weather-card__value capitalize">
            {data.condition}
          </span>
        </div>

        <div className="weather-card__detail">
          <span className="weather-card__label">Raw Temp</span>
          <span className="weather-card__value">{data.temp}°C</span>
        </div>
      </div>

      {/* Debug */}
      <details className="weather-card__debug">
        <summary className="cursor-pointer">Technical details</summary>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </details>
    </div>
  );
}
