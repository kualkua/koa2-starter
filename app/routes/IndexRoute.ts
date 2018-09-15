import BaseRoute from "./BaseRoute";
import Router from 'koa-router';

export default class IndexRoute extends BaseRoute {
    /**
     * Constructor
     *
     * @class IndexRoute
     * @constructor
     */
    constructor() {
        super();
        this.addCss('https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css');

        this.addScript('https://code.jquery.com/jquery-3.3.1.slim.min.js');
        this.addScript('https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js');
        this.addScript('https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js');
    }

    /*
    * @class IndexRoute
    * @method create
    * @static
    */
    public static create(router: Router) {
        console.debug("[IndexRoute::create] Creating index route.");
        router.get("/", async (ctx, next) => {
            new IndexRoute().index(ctx, next)
        });

        router.get("/about", async (ctx, next) => {
            new IndexRoute().about(ctx, next)
        });

        router.get("/contact", async (ctx, next) => {
            new IndexRoute().contact(ctx, next)
        });

        router.get("/login", async (ctx, next) => {
            new IndexRoute().login(ctx, next)
        });

        return router;
    }

    public index(ctx, next) {
        this.title = "Home | Tour of Heros";
        this.activeMenu = 'home';

        //set message
        let options: Object = {
            "message": "Welcome to the Tour of Heros"
        };

        //render template
        this.render(ctx, "index", options);
    }

    public about(ctx, next) {
        this.title = "Home | Tour of Heros";
        this.activeMenu = 'about';

        //set message
        let options: Object = {
            "message": "Welcome to the Tour of Heros"
        };

        //render template
        this.render(ctx, "index", options);
    }


    public contact(ctx, next) {
        this.title = "Home | Tour of Heros";
        this.activeMenu = 'contact';

        //set message
        let options: Object = {
            "message": "Welcome to the Tour of Heros"
        };

        //render template
        this.render(ctx, "index", options);
    }


    public login(ctx, next) {
        this.title = "Home | Tour of Heros";
        this.activeMenu = 'login';

        //set message
        let options: Object = {
            "message": "Welcome to the Tour of Heros"
        };

        //render template
        this.render(ctx, "login", options);
    }
}