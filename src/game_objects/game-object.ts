import * as PIXI from "pixi.js";
import {IGameObjectConfig} from "../misc/i-game-object-config";
import {SceneService} from "../services/scene-service";

/**
 * Class representing game objects - actually things you can see on your screen
 */
export class GameObject {
    private _initialPosition: PIXI.Point;
    private readonly _sprite: PIXI.Sprite;
    private readonly _name: string;

    public get sprite(): PIXI.Sprite {
        return this._sprite;
    }

    public get name(): string {
        return this._name;
    }

    constructor(objectConfig: IGameObjectConfig) {
        this._name = objectConfig.name;
        this._initialPosition = new PIXI.Point(objectConfig.positionX, objectConfig.positionY);
        this._sprite = GameObject.createSprite(objectConfig);
        this._sprite.position.set(this._initialPosition.x, this._initialPosition.y);
        this._sprite.anchor.set(0.5, 1); // set anchor at the center by x-axis and at the bottom by y-axis
    }

    private static createSprite(objectConfig: IGameObjectConfig): PIXI.Sprite {
        const graphics = new PIXI.Graphics();
        graphics.beginFill(Number(objectConfig.color));
        graphics.drawRect(0, 0, objectConfig.width, objectConfig.height);
        graphics.endFill();
        return new PIXI.Sprite(SceneService.instance.renderer.generateTexture(graphics, PIXI.SCALE_MODES.LINEAR, 1));
    }

    public resetPosition(): void {
        this._sprite.position.set(this._initialPosition.x, this._initialPosition.y);
    }
}