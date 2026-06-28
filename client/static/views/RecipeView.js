import AbstractView from "./AbstractView";

export default class extends AbstractView{
    constructor(){
        super();
        const obj = JSON.parse(window.sessionStorage.getItem("recipe"));
        if(obj == null)
            return;
        this.url = obj.url;
        this.label = obj.label;
        this.image = obj.image;
        this.ingredients = obj.ingredients;
        this.calories = obj.calories;
        this.cuisine = obj.cuisine;
        this.mealType = obj.mealType;
        this.source = obj.source;
        this.setTitle(this.label);
        // console.log(obj);
    }
    
    getHtml(){
        document.querySelector('#recipe-nav').dataset.state = "disabled"
        document.querySelector('#list-nav').dataset.state = "disabled"
        document.querySelector('#rtab-nav').dataset.state = "active"
        document.querySelector('#rtab-nav').innerText = this.label.substring(0,10) + "...";
      
       return `
      <h3 id = "label" class="text-5xl text-orange-500"> ${this.label}</h3>
      <div id = "source" class="text-xl"> ${this.source}</div>
      <span class="w-full flex justify-center p-10"><img src= "${this.image}"  class="w-1/3 rounded-xl" alt="Picture of ${this.label}"></span>
      <div id = "ingredients" class="p-2">
        <h4 class="text-2xl text-orange-500">Ingredients</h4>
        <ul class="ml-4 ingredient-list">
          ${this.ingredients.map(x => `<li class="ing-li" title="double click to add to shopping list">${x.text}</li>`).join("")}
        </ul>
      </div>
      <div id = "calories"><strong class="text-orange-500">Calories:</strong> ${Math.round(this.calories)} kcal</div>
      <span><strong class="text-orange-500">  Link: </strong><a href="${this.url}" id="url" target="_blank" rel="noopener noreferrer"> Full Recipe! </a></span>
    `;
    }
}