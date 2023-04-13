class Fetch{
    async getCurrent(input){
        const key = "c3cb9dc7d30e9e95d2f37f12204fb7cb";
        const units = "metric" //to change unit from default kelvin unit to degree celsius
        
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=${units}&appid=${key}`
        );

        const data = await response.json();

        console.log(data);

        return data;
    }
}