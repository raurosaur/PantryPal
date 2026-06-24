import AbstractView from "./AbstractView";

export default class extends AbstractView{
    constructor(){
        super();
        this.setTitle("Dashboard");
    }

    async getHtml(){
        return `
        <div class="recipe-list-full flex flex-col overflow-y-auto min-h-0 flex-1 p-2">
            <div class="recipe-search-item p-2 bg-teal-400/25 hover:bg-fuchsia-100/20 rounded-2xl m-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit voluptates tenetur quos natus doloremque ducimus?</div>
            <div class="recipe-search-item p-2 bg-teal-400/25 hover:bg-fuchsia-100/20 rounded-2xl m-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit voluptates tenetur quos natus doloremque ducimus?</div>
            <div class="recipe-search-item p-2 bg-teal-400/25 hover:bg-fuchsia-100/20 rounded-2xl m-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit voluptates tenetur quos natus doloremque ducimus?</div>
            <div class="recipe-search-item p-2 bg-teal-400/25 hover:bg-fuchsia-100/20 rounded-2xl m-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit voluptates tenetur quos natus doloremque ducimus?</div>
            <div class="recipe-search-item p-2 bg-teal-400/25 hover:bg-fuchsia-100/20 rounded-2xl m-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit voluptates tenetur quos natus doloremque ducimus?</div>
        </div>
        `;
    }
}