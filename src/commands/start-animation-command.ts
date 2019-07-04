import * as _ from "lodash";
import {AbstractCommand} from "./abstract-command";
import {GameObject} from "../game_objects/game-object";
import {IAnimationStep} from "../misc/i-animation-step";
import {TweenMax, Power0} from "gsap";
import {Names} from "../names/Names";

/**
 * Class used to calculate animation path and run the animation based on animation step data
 */
export class StartAnimationCommand extends AbstractCommand {

    public execute(params?: {}): void {
        if (!_.isNil(params)) {
            const animationStep: IAnimationStep = params as IAnimationStep;
            const animatedObject: GameObject = this.gameObjectsService.retrieveGameObject(Names.GameObjects.PLAYER);
            const animationTarget: GameObject = this.gameObjectsService.retrieveGameObject(animationStep.target);
            const bezierPath: Array<{}> = this.createBezierPathPoints(animatedObject, animationTarget);
            TweenMax.to(animatedObject.sprite, animationStep.duration, {
                bezier: {
                    values: bezierPath,
                    timeResolution: 10,
                    curviness: 1.1,
                },
                ease: Power0.easeNone,
                onComplete: () => {
                    this.animationService.isAnimationStepInProgress = false;
                },
            });
        }
    }

    private createBezierPathPoints(animatedObj: GameObject, animationTarg: GameObject): Array<{}> {
        const initX: number = animatedObj.sprite.position.x; // player's x coordinate
        const initY: number = animatedObj.sprite.position.y; // player's y coordinate
        const destX: number = animationTarg.sprite.position.x; // next obstacle's x coordinate
        const destY: number = animationTarg.sprite.position.y - animationTarg.sprite.height; // y coordinate of the top part of the obstacle
        const maxHeight: number = Math.min(initY, destY); // looking for higher point: player's position or top of next obstacle
        const checkPointX: number = (destX - initX) / 2 + initX;
        const checkPointY: number = maxHeight - 100; // 100 works not bad here making curve used fo animations pretty smooth
        return [{x: initX, y: initY}, {x: checkPointX, y: checkPointY}, {x: destX, y: destY}];
    }
}