import { WeatherData } from "@/lib/weather";
import Image from "next/image";

type Props = {
  data: WeatherData;
};

export function WeatherCard({ data }: Props) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm space-y-4">
      {/* --------------------------------------------------
          Location
      -------------------------------------------------- */}
      <div className="text-center">
        <h2 className="text-xl font-semibold">{data.city}</h2>
        <p className="text-sm text-gray-500">
          Lat {data.lat.toFixed(3)}, Lon {data.lon.toFixed(3)}
        </p>
        {data.elevation !== undefined && data.elevation !== null && (
          <p className="text-sm text-gray-500">
            Elevation: {data.elevation.toLocaleString()} m
          </p>
        )}
      </div>

      {/* --------------------------------------------------
          Primary Weather
      -------------------------------------------------- */}
      <div className="flex items-center justify-center gap-4">
<Image
  src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
  alt={data.description}
  width={64}
  height={64}
/>
        <div>
          <p className="text-4xl font-bold">
            {Math.round(data.temperature)}°C
          </p>
          <p className="capitalize text-gray-600">{data.description}</p>
        </div>
      </div>

      {/* --------------------------------------------------
          Details
      -------------------------------------------------- */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="flex flex-col">
          <span className="text-gray-500">Humidity</span>
          <span className="font-medium">{data.humidity}%</span>
        </div>

        <div className="flex flex-col">
          <span className="text-gray-400">Wind Speed</span>
          <span className="font-medium">{data.windSpeed} m/s</span>
        </div>

        <div className="flex flex-col">
          <span className="text-gray-600">Condition</span>
          <span className="font-medium capitalize">{data.condition}</span>
        </div>

        <div className="flex flex-col">
          <span className="text-gray-500">Raw Temp</span>
          <span className="font-medium">{data.temp}°C</span>
        </div>
      </div>

      {/* --------------------------------------------------
          Debug / Advanced (optional)
      -------------------------------------------------- */}
      <details className="text-xs text-gray-500">
        <summary className="cursor-pointer">Technical details</summary>
        <pre className="mt-2 overflow-x-auto rounded bg-gray-50 p-2">
          {JSON.stringify(data, null, 2)}
        </pre>
      </details>
    </div>
  );
}
