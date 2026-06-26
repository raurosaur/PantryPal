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
        this.allergens = obj.allergens;
        this.source = obj.source;
        this.setTitle(this.label);
        // console.log(this);
    }
    
    getHtml(){
        document.querySelector('#recipe-nav').dataset.state = "disabled"
        document.querySelector('#list-nav').dataset.state = "disabled"
        document.querySelector('#rtab-nav').dataset.state = "active"
        document.querySelector('#rtab-nav').innerText = this.label.substring(0,10) + "...";

       return `
      <h3 id = "label"> ${this.label}</h3>
      <div id = "source"> ${this.source}</div>
      <img src= "${this.image}" alt="Picture of ${this.label}">
      <div id = "ingredients">
        <h4>Ingredients</h4>
        <ul>
          ${this.ingredients.map(x => `<li>${x.text}</li>`).join("")}
        </ul>
      </div>
      <div id = "allergens"><strong>Allergens:</strong> ${this.allergens?.join(" | ")}</div>
      <div id = "calories"><strong>Calories:</strong> ${Math.round(this.calories)} kcal</div>
      <a href="${this.url}" id="url" target="_blank" rel="noopener noreferrer"> Full Recipe! </a>
    `;
    }
}