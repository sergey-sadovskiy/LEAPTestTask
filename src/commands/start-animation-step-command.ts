import {AbstractCommand} from "./abstract-command";
import {Names} from "../names/Names";

/**
 * This class used to run animation step retrieve from animation AnimationService
 */
export class StartAnimationStepCommand extends AbstractCommand {

    public execute(params?: {}): void {
        if (!this.animationService.isAnimationStepInProgress) {
            if (this.animationService.hasAvailableAnimations()) {
                this.animationService.isAnimationStepInProgress = true;
                this.commandsService.callCommand(Names.Commands.START_ANIMATION, this.animationService.getNextAnimationConfig());
            } else {
                this.commandsService.callCommand(Names.Commands.COMPLETE_ANIMATION);
            }
        }
    }
}