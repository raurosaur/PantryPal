import AbstractView from "./AbstractView";

export default class extends AbstractView{
    constructor(){
        super();
        this.setTitle("PantryPal");
    }

    async getHtml(){
        return `
        
        `;
    }
}