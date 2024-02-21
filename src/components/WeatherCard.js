
const WeatherCard = ({ weather }) => {
  
  const { name, main, weather: weatherDetails, wind } = weather;
  const { temp, feels_like, temp_min, temp_max, humidity, pressure } = main;
  const { description } = weatherDetails[0];
  const { speed } = wind;

  
  const formatTemp = (temp) => Math.round(temp);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
      <div className="flex items-center justify-center gap-20">
        <div>
          <p className="text-2xl font-semibold">{name}</p>
          <div className="flex items-baseline">
            <p className="text-6xl font-bold">{formatTemp(temp)}°</p>
            <p className="text-xl text-gray-500 ml-2">{description}</p>
          </div>
        </div>
        <div className="flex flex-col justify-around">
          <p className="text-lg"><span className="font-semibold">Feels like</span> {formatTemp(feels_like)}°</p>
          <div className="flex justify-between">
            <p className="text-lg"><span className="font-semibold">High</span> {formatTemp(temp_max)}°</p>
            <p className="text-lg"><span className="font-semibold">Low</span> {formatTemp(temp_min)}°</p>
          </div>
          <p className="text-lg"><span className="font-semibold">Humidity</span> {humidity}%</p>
          <p className="text-lg"><span className="font-semibold">Wind</span> {speed}kph</p>
          <p className="text-lg"><span className="font-semibold">Pressure</span> {pressure}hPa</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;

