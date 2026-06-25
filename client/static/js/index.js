import AbstractView from "../views/AbstractView";
import Dashboard from "../views/Dashboard";
import RecipeSearchList from "../views/RecipeSearchList";
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
        // {path: "/recipe" , view: () => {console.log("2")}},
        {path: "/recipe-search" , view: RecipeSearchList},
        //recipe
        //
        {path: "/list" , view: ShoppingList}
    ];

    const potentialMatches = routes.map( route => {
        return {
            route,
            isMatch: location.pathname == route.path
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

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.id === "list-nav" ){
            e.preventDefault();
            navigateTo(e.target.dataset.href);
        }
        else if (e.target.id === "search-recipe" || e.target.id === "recipe-nav"){
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
    });

    router();
});