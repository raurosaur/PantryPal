import AbstractView from "./AbstractView";

const ID = import.meta.env.VITE_API_ID;
const KEY = import.meta.env.VITE_API_KEY;

export default class extends AbstractView{
    constructor(search){
        super();
        this.setTitle("Recipes");
    }

    async getHtml(){
        
        document.querySelector('#recipe-nav').dataset.state = "active"
        document.querySelector('#list-nav').dataset.state = "disabled"
        document.querySelector('#rtab-nav').dataset.state = "disabled"
        
        if (!location.search){
           return ` <div class="recipe-list-full">
        </div>`
        }

        let hits = JSON.parse(sessionStorage.getItem(location.search));

        if(!hits){
            console.log("Making API calls");
            let req = `https://api.edamam.com/api/recipes/v2?type=public&${location.search.substring(1)}&app_id=${ID}&app_key=${KEY}`;
            
            const response = await fetch(req); 
    
            
            const resBody  = await response.json();
            hits = resBody["hits"];
            sessionStorage.setItem(location.search, JSON.stringify(hits));
        }


        let innerHTML = "";
        hits.forEach((hit,i) => {
            innerHTML += `<div class = "recipe-search-item" search-index=${i} data-label=${hit.recipe.uri}>${hit.recipe.label} - ${hit.recipe.source}</div>`;
        });
        if(hits.length === 0)
            innerHTML += `<div style="recipe-search-item"> Search returned no result ☹️. Try Again!</div>`

        return `
        <div class="recipe-list-full">
            ${innerHTML}
        </div>
        `;
    }
}