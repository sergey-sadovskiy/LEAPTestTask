import {AnimationService} from "../services/animation-service";
import {GameObjectsService} from "../services/game-objects-service";
import {LoaderService} from "../services/loader-service";
import {SceneService} from "../services/scene-service";
import {CommandsService} from "../services/commands-service";

/**
 * Abstract class of in-game command.
 */
export abstract class AbstractCommand {
    // Now each command has an access to every game service. No need to use notation ServiceClass.instance
    protected animationService: AnimationService = AnimationService.instance;
    protected gameObjectsService: GameObjectsService = GameObjectsService.instance;
    protected loaderService: LoaderService = LoaderService.instance;
    protected sceneService: SceneService = SceneService.instance;
    protected commandsService: CommandsService = CommandsService.instance;

    /**
     * Should be implemented by derived class.
     * This method will be used each time when command is invoked via CommandsService.
     */
    public abstract execute(params?: {}): void;
}