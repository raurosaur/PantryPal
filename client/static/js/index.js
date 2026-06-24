import AbstractView from "../views/AbstractView";
import Dashboard from "../views/Dashboard";
import RecipeSearchList from "../views/RecipeSearchList";

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
        {path: "/recipe-search/" , view: RecipeSearchList},
        //recipe
        //
        {path: "/list" , view: () => {console.log("3")}}
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
    document.querySelector('button#search-recipe').addEventListener('click', e => {
        e.preventDefault();
        console.log(e.target);
        let ref = e.target.dataset.href;
        let input = document.querySelector('#recipe-search-bar').value;
        navigateTo(`${ref}/?=${input.split(' ').join('&')}`);
        });

    // document.body.addEventListener("click", e => {
    //     if (e.target.matches("[data-link]") ){
    //         e.preventDefault();
    //         navigateTo(e.target.href);
    //     }
    // });

    router();
});