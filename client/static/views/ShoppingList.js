import AbstractView from "./AbstractView"

function list_item(id, item){
  if (!id || !item){
    throw Error("Missing params");
  }
  return `
    <div class= "flex justify-between">
      <input type="checkbox" name="list${id}" id = "list${id}" class="peer">
      <label for="list${id}" id="${id}">${item}</label>
      <span id="span-${id}" class="del-list-item-btn">🗑</span>
    </div>
  `;
}

export default class extends AbstractView{
    constructor(search){
        super();
        this.setTitle("Shopping List");
    }

    async getHtml(){
        document.querySelector('#recipe-nav').dataset.state = "disabled"
        document.querySelector('#list-nav').dataset.state = "active"
        document.querySelector('#rtab-nav').dataset.state = "disabled"
        
        let items = JSON.parse(sessionStorage.getItem("shop-list") ?? localStorage.getItem("shop-list")) ?? {1:"onion",2:"garlic",3:"chicken"};
  
        sessionStorage.setItem("shop-list", JSON.stringify(items));
        // console.log(items)
        return `
              <div class = "shopping-list flex-1">
                ${Object.entries(items).map(x => list_item(x[0],x[1])).join("")}
              </div>
              <div class="flex  w-full items-stretch">
                <input type="text" class="input-bar flex-2" id="add-list-input" placeholder="Enter Item to Add to List"/>
                <div class="list-btns my-1 ml-1 rounded-r-xl text-center" id="add-list-item-btn"> Add list item </div>
              </div>
              <div class="list-action-bar w-full flex justify-between items-stretch text-center">
                <div class="rounded-l-xl border-r list-btns" id="save-list-btn">Save</div>
                <div class="border-r mx-1 list-btns" id="del-list-btn">Delete</div>
                <div class="rounded-r-xl list-btns" id="share-btn">Share</div>
              </div>
        `;
    }
}