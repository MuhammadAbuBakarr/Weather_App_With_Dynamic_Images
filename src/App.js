import { useState, useEffect } from "react";
import PrintDate from "./PrintDate";
import axios from "axios";

const api = {
	key: "9d668102e2949dab68d3a2267481a10c",
	base: "https://api.openweathermap.org/data/2.5/",
};
const imgApi = {
	base: "https://api.unsplash.com/search/photos?query=",
	key: "-PAUtZTC0i8wrnQ59ylexUSddHugNzd61vIcyyqupz4",
};

const App = () => {
	const [query, setQuery] = useState("");
	const [weather, setWeather] = useState({});
	const [img, setImg] = useState("");

	//First Screen Function
	const firstScreen = async () => {
		// Catching IP and City of User
		// const ipApi =
		// 	"https://api.ipdata.co?api-key=3d4b38b0d35eefec653c4cb1a7dc39ea8e3f760e2f01b06e8ce7adf9";

		const userIP = await axios.get("https://ipinfo.io?token=5675de78f2553f");
		console.log(userIP);

		const city = userIP.data.city;

		// Getting Weather From User City
		const weathercall = await axios.get(
			`${api.base}weather?q=${city}&units=metric&APPID=${api.key}`
		);
		console.log(weathercall);

		setWeather(weathercall.data);
		// Getting IMG from USer City
		const img = await axios.get(
			`${imgApi.base}islamabad&client_id=${imgApi.key}`
		);
		console.log(img);

		let randomNo = Math.floor(Math.random() * 1);
		let apiImg = img.data.results[randomNo].urls.regular;
		setImg(apiImg);
	};

	// UseEffect
	useEffect(() => {
		firstScreen();
	}, []);

	const search = async () => {
		const results = await axios.get(
			`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`
		);
		setQuery("");
		setWeather(results.data);
		console.log(results);
	};

	const getImg = async () => {
		const dataa = await axios.get(
			`${imgApi.base}${query}&client_id=${imgApi.key}`
		);
		let randomNo = Math.floor(Math.random() * 1);
		let apiImg = dataa.results[randomNo].urls.regular;
		setImg(apiImg);
		console.log(apiImg);
	};

	const bothFunc = (e) => {
		if (e.key === "Enter") {
			search();
			getImg();
		}
	};

	const handleChange = (e) => {
		setQuery(e.target.value);
	};

	const ConditionalRendering = () => {
		if (weather.main !== undefined) {
			return (
				<div className="text-black shadow-xl text-2xl flex items-center justify-center p-11 space-y-3 font-thin flex-col text-center tracking-wide">
					<div>{PrintDate(new Date())}</div>
					<div>
						{weather.name},{weather.sys.country}
					</div>
					<div>Temperature = {Math.floor(weather.main.temp)}°C</div>
					<div>Wind Speed = {weather.wind.speed}</div>
					<div>Atmoshpere = {weather.weather[0].description}</div>
				</div>
			);
		} else {
			<></>;
		}
	};

	return (
		<>
			<div
				className={`w-screen h-screen bg-no-repeat bg-cover bg-center justify-center flex items-center 
					bg-[url(${img})]
				`}
			>
				<div className="mb-4  w-5/12  flex bg-white rounded-2xl p-10   flex-col justify-center items-center border-2 ">
					<label className="block text-gray-700 text-xl font-bold mb-6 tracking-wider">
						Enter Your City
					</label>
					<input
						className="w-80 py-3 px-5 text-gray-700   leading-tight shadow-lg"
						id="username"
						type="text"
						placeholder="Enter Location"
						onChange={handleChange}
						value={query}
						onKeyPress={bothFunc}
					/>
					{<ConditionalRendering />}
				</div>
			</div>
		</>
	);
};

export default App;
