export default class BaseRoute {
    protected title: string;
    protected activeMenu: string;
    private scripts: string[];
    private css: string[];

    /**
     * Constructor
     *
     * @class BaseRoute
     * @constructor
     */
    constructor() {
        //initialize variables
        this.title = "Tour of Heros";
        this.activeMenu = null;
        this.scripts = [];
        this.css = [];
    }

    /**
     * Add a JS external file to the request.
     *
     * @class BaseRoute
     * @method addScript
     * @param src {string} The src to the external JS file.
     * @return {BaseRoute} Self for chaining
     */
    public addScript(src: string): BaseRoute {
        this.scripts.push(src);
        return this;
    }

    /**
     * Add a CSS external file to the request.
     *
     * @class BaseRoute
     * @method addCss
     * @param src {string} The src to the external JS file.
     * @return {BaseRoute} Self for chaining
     */
    public addCss(src: string): BaseRoute {
        this.css.push(src);
        return this;
    }

    public render(ctx, view: string, options?: Object) {
        ctx.body = ctx.render(view, {
            title: this.title ? this.title : null,
            activeMenu: this.activeMenu ? this.activeMenu : null,
            scripts: this.scripts,
            css: this.css
        });
    }
}