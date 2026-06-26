import AbstractView from "../views/AbstractView";
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
        {path: "/" , view: AbstractView},
        {path: "/recipe" , view: RecipeView},
        {path: "/recipe-search" , view: RecipeSearchList},
        {path: "/list" , view: ShoppingList}
    ];

    const potentialMatches = routes.map( route => {
        return {
            route,
            isMatch: location.pathname === route.path
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


document.addEventListener("DOMContentLoaded", async() => {
    // sessionStorage.clear()
    document.body.addEventListener("click", async (e) => {
        if (e.target.classList.contains("nav-bar") || e.target.id === "search-recipe"){
            e.preventDefault();
            let ref = e.target.dataset.href;
            let input = document.querySelector('#recipe-search-bar').value.trim();
            if (input) {
                ref += `?q=${encodeURIComponent(input)}`;
            }
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
           
            navigateTo("/recipe");
        }
    });

    document.body.addEventListener("dblclick", (e)=>{
        if (e.target.classList.contains("ing-li")){
            let shoplist = JSON.parse(window.sessionStorage.getItem("shop-list") ?? window.localStorage.getItem("shop-list")) ?? [];
            shoplist[new Date().toISOString()]=e.target.innerText;
            window.sessionStorage.setItem("shop-list", JSON.stringify(shoplist));
        }
    })
    router();
});