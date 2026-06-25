import AbstractView from "./AbstractView"


export default class extends AbstractView{
    constructor(search){
        super();
        this.setTitle("Shopping List");
    }

    async getHtml(){
        const id=0;
        const item = "chicken";
        return `
              <div class = "shopping-list">
                <div class="flex justify-between">
                  <input type="checkbox" name="list${id}" id = "list${id}" class="peer">
                  <label for="list${id}" id="label-list${id}">${item}</label>
                  <span id="span-${id}" class="hover:bg-cyan-900/80 rounded-xl">🗑</span>
                </div>
                <div class= "flex justify-between">
                  <input type="checkbox" name="list${id}" id = "list${id}" class="peer">
                  <label for="list${id}" id="label-list${id}">${item}</label>
                  <span id="span-${id}">🗑</span>
                </div>
                <div class= "flex justify-between">
                  <input type="checkbox" name="list${id}" id = "list${id}" class="peer">
                  <label for="list${id}" id="label-list${id}">${item}</label>
                  <span id="span-${id}">🗑</span>
                </div>
                <div class= "flex justify-between">
                  <input type="checkbox" name="list${id}" id = "list${id}" class="peer">
                  <label for="list${id}" id="label-list${id}">${item}</label>
                  <span id="span-${id}">🗑</span>
                </div>
              </div>
              <div class="list-action-bar w-full flex justify-between items-stretch text-center">
                <div class="rounded-l-xl border-r">Save</div>
                <div class="border-r">Delete</div>
                <div class="rounded-r-xl">Share</div>
              </div>
        `;
    }
}