import * as _ from "lodash";
import * as PIXI from "pixi.js";
import {AbstractCommand} from "./abstract-command";
import {Names} from "../names/Names";
import {IAnimationStep} from "../misc/i-animation-step";

/**
 * This class initializes animation service by animation step configurations.
 */
export class InitializeAnimationConfigCommand extends AbstractCommand {

    public execute(params?: {}): void {
        const animationConfigResource: PIXI.LoaderResource | null = this.loaderService.getResource(Names.Resources.ANIMATION);
        if (!_.isNull(animationConfigResource)) {
            const animationConfig: Array<IAnimationStep> = animationConfigResource.data["animation"] as Array<IAnimationStep>;
            this.animationService.setAnimationConfig(animationConfig);
        }
    }
}