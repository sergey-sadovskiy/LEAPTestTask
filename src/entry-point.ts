import {SceneService} from "./services/scene-service";
import {GameResource} from "./misc/game-resource";
import {LoaderService} from "./services/loader-service";
import {CommandsService} from "./services/commands-service";
import {Names} from "./names/Names";
import {CreateGameObjectsCommand} from "./commands/create-game-objects-command";
import {GameObjectsService} from "./services/game-objects-service";
import {StartAnimationStepCommand} from "./commands/start-animation-step-command";
import {StartAnimationCommand} from "./commands/start-animation-command";
import {AnimationService} from "./services/animation-service";
import {InitializeAnimationConfigCommand} from "./commands/initialize-animation-config-command";
import {InitializeGameUiCommand} from "./commands/initialize-game-ui-command";
import {CompleteAnimationCommand} from "./commands/complete-animation-command";

/**
 * Application's entry point. The game starts here.
 */
export class EntryPoint {
    private static readonly BASE_ASSETS_PATH: string = "./assets/";
    private _resources: Array<GameResource> = [];

    /**
     * Instantiate all services.
     */
    private registerServices(): void {
        new LoaderService();
        new SceneService();
        new CommandsService();
        new GameObjectsService();
        new AnimationService();
    }

    /**
     * Register resources used by game.
     */
    private registerResources(): void {
        this._resources.push(new GameResource(Names.Resources.PLAYER, EntryPoint.BASE_ASSETS_PATH + "player_config.json"));
        this._resources.push(new GameResource(Names.Resources.OBSTACLES, EntryPoint.BASE_ASSETS_PATH + "obstacles_config.json"));
        this._resources.push(new GameResource(Names.Resources.ANIMATION, EntryPoint.BASE_ASSETS_PATH + "animation_config.json"));
    }

    /**
     * Register all commands here. You can use commands to split in-game logic into small chunks.
     */
    private registerCommands(): void {
        CommandsService.instance.registerCommand(Names.Commands.CREATE_GAME_OBJECTS, CreateGameObjectsCommand);
        CommandsService.instance.registerCommand(Names.Commands.START_ANIMATION_STEP, StartAnimationStepCommand);
        CommandsService.instance.registerCommand(Names.Commands.START_ANIMATION, StartAnimationCommand);
        CommandsService.instance.registerCommand(Names.Commands.INITIALIZE_ANIMATION_CONFIG, InitializeAnimationConfigCommand);
        CommandsService.instance.registerCommand(Names.Commands.INITIALIZE_GAME_UI, InitializeGameUiCommand);
        CommandsService.instance.registerCommand(Names.Commands.COMPLETE_ANIMATION, CompleteAnimationCommand);
    }

    private loadInGameResources(): void {
        LoaderService.instance.loadResources(this._resources, this.handleResourcesLoadedEvent.bind(this));
    }

    /**
     * This method is called when all resources have been loaded.
     */
    private handleResourcesLoadedEvent(): void {
        SceneService.instance.initializePixiApplication();
        CommandsService.instance.invokeCommand(Names.Commands.CREATE_GAME_OBJECTS);
        CommandsService.instance.invokeCommand(Names.Commands.INITIALIZE_ANIMATION_CONFIG);
        CommandsService.instance.invokeCommand(Names.Commands.INITIALIZE_GAME_UI);
    }

    /**
     * So, here we go
     */
    public initializeApp(): void {
        this.registerResources();
        this.registerServices();
        this.registerCommands();
        this.loadInGameResources();
    }
}

window.onload = () => {
    const ep = new EntryPoint();
    ep.initializeApp();
};