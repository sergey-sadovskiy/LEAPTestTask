import * as _ from "lodash";
import * as PIXI from "pixi.js";
import {GameResource} from "../misc/game-resource";

/**
 * Class used for loading and holding (to be used further) game resources (files, images, etc.).
 */
export class LoaderService {
    private static _instance: LoaderService;
    private _loader: PIXI.Loader = new PIXI.Loader();

    public static get instance(): LoaderService {
        return LoaderService._instance;
    }

    constructor() {
        if (!_.isNil(LoaderService.instance)) {
            throw new Error("LoaderService class can not be instantiated. Please use LoaderService.instance");
        }
        LoaderService._instance = this;
    }

    public loadResources(_resourcesToLoad: Array<GameResource>, onLoadingCompleteCallback: Function): void {
        _.each(_resourcesToLoad, (resToLoad: GameResource) => {
            this._loader.add(resToLoad.id, resToLoad.path);
        });
        this._loader.load();
        this._loader.onComplete.add(onLoadingCompleteCallback);
    }

    public getResource(resourceName: string): PIXI.LoaderResource | null {
        let resourceToRetrieve: PIXI.LoaderResource = null;
        if (_.has(this._loader.resources, resourceName)) {
            resourceToRetrieve = this._loader.resources[resourceName];
        }
        return resourceToRetrieve;
    }
}