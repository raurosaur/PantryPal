const navigateTo = url => {
    history.pushState(null, null, url);
    router();
}

const router = async () => {
    const routes = [
        {path: "/" , view: () => {console.log("1")}},
        {path: "/recipe" , view: () => {console.log("2")}},
        {path: "/list" , view: () => {console.log("3")}}
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

    console.log(match.route.view());
};

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]") ){
            e.preventDefault();
            console.log(e.target.href)
            navigateTo(e.target.href);
        }
    });

    router();
});