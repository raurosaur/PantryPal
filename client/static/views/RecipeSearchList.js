import AbstractView from "./AbstractView";

const KEY = "17a117cc72203109eacfce3afae1487f";
const ID  = "d66e5273";

export default class extends AbstractView{
    constructor(search){
        super();
        this.setTitle("Recipes");
    }

    async getHtml(){
        if (!location.search){
           return ` <div class="recipe-list-full">
        </div>`
        }
        let req = `https://api.edamam.com/api/recipes/v2?type=public&${location.search.substring(1)}&app_id=${ID}&app_key=${KEY}`;
        
        const response = await fetch(req); 

        
        const resBody  = await response.json();
        
        document.querySelector('#recipe-nav').dataset.state = "active"
        document.querySelector('#list-nav').dataset.state = "disabled"

        console.log(resBody)
        let innerHTML = "";
        const hits = resBody["hits"];
        console.log(resBody)
        hits.forEach((hit,i) => {
            innerHTML += `<div class = "recipe-search-item" search-index=${i}>${hit.recipe.label} - ${hit.recipe.source}</div>`;
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