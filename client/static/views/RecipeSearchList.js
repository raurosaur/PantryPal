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
        
        const search = location.hash?.replace("#", "").split("?")[1] ?? "";
        
        if (!window.sessionStorage.getItem("current") && !search){
           return ` <div class="recipe-list-full">
        </div>`
        }

        let hits = JSON.parse(sessionStorage.getItem("current"))?.hits;

        if(!hits || (search && sessionStorage.getItem("current").query !== search)){
            console.log("Making API calls");
            let req = `https://api.edamam.com/api/recipes/v2?type=public&${search}&app_id=${ID}&app_key=${KEY}`;
            
            const response = await fetch(req); 
    
            
            const resBody  = await response.json();
            hits = resBody["hits"];
            sessionStorage.setItem("current", JSON.stringify({query:search, hits: hits}));
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