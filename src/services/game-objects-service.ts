import * as _ from "lodash";
import {GameObject} from "../game_objects/game-object";
import {SceneService} from "./scene-service";

/**
 * You can save and retrieve game objects using this class
 */
export class GameObjectsService {
    private static _instance: GameObjectsService;
    private _gameObjectsMap: _.Dictionary<GameObject> = {};

    public static get instance(): GameObjectsService {
        return GameObjectsService._instance;
    }

    constructor() {
        if (!_.isNil(GameObjectsService.instance)) {
            throw new Error("GameObjectsService class can not be instantiated. Please use GameObjectsService.instance");
        }
        GameObjectsService._instance = this;
    }

    public addGameObject(gameObject: GameObject): void {
        this._gameObjectsMap[gameObject.name] = gameObject;
    }

    public dropGameObjectsOnScene(): void {
        _.each(this._gameObjectsMap, (gameObject: GameObject) => {
            SceneService.instance.scene.addChild(gameObject.sprite);
        });
    }

    public retrieveGameObject(name: string): GameObject {
        return this._gameObjectsMap[name];
    }
}