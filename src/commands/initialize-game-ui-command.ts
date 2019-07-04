import * as _ from "lodash";
import {AbstractCommand} from "./abstract-command";
import {Names} from "../names/Names";

/**
 * Class used to initialize game UI.
 * We have only one button and so far no need to keep reference to it.
 */
export class InitializeGameUiCommand extends AbstractCommand {

    public execute(params?: {}): void {
        const jumpButton: HTMLElement = document.getElementById("jumpButton");
        if (!_.isNil(jumpButton)) {
            jumpButton.addEventListener("click", () => {
                this.commandsService.callCommand(Names.Commands.START_ANIMATION_STEP);
            });
        }
    }
}