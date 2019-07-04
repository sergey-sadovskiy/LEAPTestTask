import {AbstractCommand} from "./abstract-command";
import {Names} from "../names/Names";

/**
 * If you're here that mean's there is no more animation steps to play. Just reset everything
 * and enjoy it one more time.
 */
export class CompleteAnimationCommand extends AbstractCommand {

    public execute(params?: {}): void {
        this.animationService.reset();
        this.gameObjectsService.retrieveGameObject(Names.GameObjects.PLAYER).resetPosition();
    }
}