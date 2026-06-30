import Dashboard from "../views/Dashboard";
import RecipeSearchList from "../views/RecipeSearchList";
import RecipeView from "../views/RecipeView";
import ShoppingList from  "../views/ShoppingList";

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
}

function pathMatches(pattern, path) {
  const clean = (value) => value.replace(/^\/+|\/+$/g, "")

  const patternParts = clean(pattern).split("/")
  const pathParts = clean(path).split("/")

  if (patternParts.length !== pathParts.length) return false

  return patternParts.every((part, index) => {
    return part === "*" || part === pathParts[index]
  })
}

const router = async () => {
    const routes = [
        {path: "/" , view: Dashboard},
        {path: "/recipe" , view: RecipeView},
        {path: "/recipe-search" , view: RecipeSearchList},
        {path: "/list" , view: ShoppingList}
    ];
    const curr = location.hash?.replace("#", "").split("?")[0] ?? "/";
    const potentialMatches = routes.map( route => {
        return {
            route,
            isMatch: curr === route.path
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);

    if (!match){
        match = {
            route : routes[0],
            isMatch : true
        };
    }
    const view = await new match.route.view();

    document.querySelector('section').innerHTML = await view.getHtml();

    // console.log(match.route.view());
};

function displayBody(){
    document.querySelector(".body-main").style.display = "flex";
    document.querySelector("#header").classList.add('flex-change');
}
document.addEventListener("DOMContentLoaded", async() => {
    // sessionStorage.clear()
    // return;
    const BASE_API_URL = import.meta.env.VITE_API_URL;
    document.body.addEventListener("click", async (e) => {
        if (e.target.classList.contains("nav-bar") || e.target.id === "search-recipe"){
            e.preventDefault();
            displayBody();
            let ref = e.target.dataset.href;
            let input = document.querySelector('#recipe-search-bar').value.trim();
            if (input && ref !== '/#/list') {
                ref += `?q=${encodeURIComponent(input)}`;
            }
            // console.log(ref)
            navigateTo(ref);
        }  
        else if (e.target.id === "save-list-btn"){
            if (sessionStorage.getItem("shop-list"))
                localStorage.setItem("shop-list", sessionStorage.getItem("shop-list"));
        }
        else if (e.target.classList.contains("del-list-item-btn")){
            const id = e.target.id.substring(5);
            e.target.parentElement.remove();
            const items = JSON.parse(sessionStorage.getItem("shop-list"));
            delete items[id];
            sessionStorage.setItem("shop-list", JSON.stringify(items));
        }
        else if (e.target.id === "del-list-btn"){
            localStorage.removeItem("shop-list");
            sessionStorage.removeItem("shop-list");
            document.querySelector("div.shopping-list").innerHTML = "";
        }
        else if(e.target.className === "recipe-search-item"){
            e.preventDefault();

            const uri = e.target.dataset.label;

            const KEY = import.meta.env.VITE_API_KEY;
            const ID = import.meta.env.VITE_API_ID;

            const query = new URLSearchParams({
                type: "public",
                uri,
                app_id: ID,
                app_key: KEY,
            });

            const res = await fetch(
                `https://api.edamam.com/api/recipes/v2/by-uri?${query}`
            );

            if (!res.ok) {
                throw new Error(`Edamam request failed: ${res.status}`);
            }

            const recipe = await res.json();

            window.sessionStorage.setItem("recipe", JSON.stringify(recipe.hits[0].recipe));
            document.querySelector('#rtab-nav').classList.remove("hidden");
           
            navigateTo("#/recipe");
        }
        else if(e.target.id === 'share-btn'){
            e.preventDefault();
            const items = []
            document.querySelectorAll('.shopping-list>div>label').forEach(x=>items.push(x.innerText));
            if(items){
                const response = await fetch(`${BASE_API_URL}/lists`,{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({items}),
                });
                if (response.ok){
                    const data = await response.json();
                    navigator.clipboard.writeText(data.id);
                    window.alert('Copied to clipboard');
                }
            }
        }
        else if(e.target.id === 'load-list'){
            e.preventDefault();
            const ID = document.querySelector('#list-search-bar').value.trim();
            console.log(ID)
            if(ID){
                const response = await fetch(`${BASE_API_URL}/lists/${ID}`,{
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (response.ok){
                    displayBody();
                    const {createdAt,id,items,expiresAt} = await response.json();
                    navigateTo(`/#/list?id=${id}`);
                    window.sessionStorage.setItem("shop-list", JSON.stringify(items));
                    console.log(createdAt, expiresAt, id);
                }
                
            }

        }
        else if(e.target.id === 'add-list-item-btn'){
            const input_bar = document.querySelector('#add-list-input');
            const list_item = input_bar.value.trim();
            if(list_item){
                const currlist = JSON.parse(window.sessionStorage.getItem("shop-list")) ?? [];
                currlist[new Date().toISOString()]=list_item;
                window.sessionStorage.setItem("shop-list", JSON.stringify(currlist));
                input_bar.value="";
                navigateTo('/#/list')
                // window.location.reload();
            }
        }
    });

    document.body.addEventListener("dblclick", (e)=>{
        if (e.target.classList.contains("ing-li")){
            let shoplist = JSON.parse(window.sessionStorage.getItem("shop-list") ?? window.localStorage.getItem("shop-list")) ?? [];
            shoplist[new Date().toISOString()]=e.target.innerText;
            window.sessionStorage.setItem("shop-list", JSON.stringify(shoplist));
        }
    })

    document.body.addEventListener("keydown", e => {
        if(e.key === "Enter" && document.querySelector('#recipe-search-bar').value){
            e.preventDefault();
            displayBody();
            let ref = '/#/recipe-search';
            let input = document.querySelector('#recipe-search-bar').value.trim();
            if (input) {
                ref += `?q=${encodeURIComponent(input)}`;
            }
            navigateTo(ref);
        }
    });

    router();
});