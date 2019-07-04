import * as _ from "lodash";
import * as PIXI from "pixi.js";
import {AbstractCommand} from "./abstract-command";
import {IGameObjectConfig} from "../misc/i-game-object-config";
import {Names} from "../names/Names";
import {GameObject} from "../game_objects/game-object";

/**
 * Class used to create game objects from configurations.
 */
export class CreateGameObjectsCommand extends AbstractCommand {

    public execute(): void {
        this.createPlayerObject();
        this.createObstacles();
        this.gameObjectsService.dropGameObjectsOnScene();
    }

    private createPlayerObject(): void {
        const playerConfResource: PIXI.LoaderResource | null = this.loaderService.getResource(Names.Resources.PLAYER);
        if (!_.isNull(playerConfResource)) {
            const playerConfig: IGameObjectConfig = playerConfResource.data as IGameObjectConfig;
            this.gameObjectsService.addGameObject(new GameObject(playerConfig));
        }
    }

    private createObstacles(): void {
        const obstacleConfResources: PIXI.LoaderResource | null = this.loaderService.getResource(Names.Resources.OBSTACLES);
        if (!_.isNull(obstacleConfResources)) {
            const obstacleConfigs: Array<IGameObjectConfig> = obstacleConfResources.data["obstacles"] as Array<IGameObjectConfig>;
            _.each(obstacleConfigs, (obstacleConf: IGameObjectConfig) => {
                this.gameObjectsService.addGameObject(new GameObject(obstacleConf));
            });
        }
    }
}