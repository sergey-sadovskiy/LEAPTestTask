import * as _ from "lodash";
import * as PIXI from "pixi.js";

/**
 * This class registers pixi application and then provides access to some its components needed for the game.
 */
export class SceneService {
    private static _instance: SceneService;
    private _pixiApp: PIXI.Application;

    public static get instance(): SceneService {
        return SceneService._instance;
    }

    public get scene(): PIXI.Container {
        return this._pixiApp.stage;
    }

    public get renderer(): PIXI.Renderer {
        return this._pixiApp.renderer;
    }

    constructor() {
        if (!_.isNil(SceneService.instance)) {
            throw new Error("SceneService class can not be instantiated. Please use SceneService.instance");
        }
        SceneService._instance = this;
    }

    public initializePixiApplication(): void {
        const appPotions: {} = {
            width: 960,
            height: 720,
            backgroundColor: 0x1099bb,
        };
        this._pixiApp = new PIXI.Application(appPotions);
        document.body.appendChild(this._pixiApp.view);
    }
}