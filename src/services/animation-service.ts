import * as _ from "lodash";
import {IAnimationStep} from "../misc/i-animation-step";

/**
 * Class used to save and hold animation steps data
 */
export class AnimationService {
    private static _instance: AnimationService;
    private _currentAnimationStep: number = 0;
    private _currentAnimationConfig: Array<IAnimationStep> = [];
    private _isAnimationStepInProgress: boolean = false;

    public static get instance(): AnimationService {
        return AnimationService._instance;
    }

    public get isAnimationStepInProgress(): boolean {
        return this._isAnimationStepInProgress;
    }

    public set isAnimationStepInProgress(value: boolean) {
        this._isAnimationStepInProgress = value;
    }

    constructor() {
        if (!_.isNil(AnimationService.instance)) {
            throw new Error("AnimationService class can not be instantiated. Please use AnimationService.instance");
        }
        AnimationService._instance = this;
    }

    public hasAvailableAnimations(): boolean {
        return this._currentAnimationStep < this._currentAnimationConfig.length;
    }

    public getNextAnimationConfig(): any {
        return this._currentAnimationConfig[this._currentAnimationStep++];
    }

    public reset(): void {
        this._currentAnimationStep = 0;
    }

    public setAnimationConfig(animationConfig: Array<IAnimationStep>): void {
        this._currentAnimationConfig = animationConfig;
    }
}