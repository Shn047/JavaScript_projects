class UI{
    constructor(){
        this.uiContainer = document.getElementById("content");
        this.city;
        this.defaultCity = "London";
    }

    populateUI(data){
        this.uiContainer.innerHTML = `
        
        <div class = "card mx-auto mt-5" style = "width: 18rem;">
            <div class = "card-body justify-content-center">
                <h5 class = "card-title">${data.name}</h5>
                <h6 class = "card-subtitle mb-2 text-muted">Highest at ${data.main.temp_max}°C. Lowest at ${data.main.temp_min}°C</h6>
                <p class = "card-text ">Weather conditions are described as: ${data.weather[0].description}</p>
            </div>
        </div>    
        `;
    }

    clearUI(){
        this.uiContainer.innerHTML = "";
    }

    saveToLS(data){
        localStorage.setItem("city",JSON.stringify(data));
    }

    getFromLS(){
        if(localStorage.getItem("city" == null)){
            return this.defaultCity;
        }else{
            this.city = JSON.parse(localStorage.getItem("city"));
        }
        return this.city;
    }

    clearLS(){
        localStorage.clear();
    }
}