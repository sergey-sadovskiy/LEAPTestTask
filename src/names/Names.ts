
/**
 * Names used by the game.
 */
export namespace Names {

    export class Commands {
        public static CREATE_GAME_OBJECTS: string = "create_game_objects";
        public static START_ANIMATION_STEP: string = "start_animation_step";
        public static START_ANIMATION: string = "start_animation";
        public static INITIALIZE_ANIMATION_CONFIG: string = "initialize_animation_config";
        public static INITIALIZE_GAME_UI: string = "initialize_game_ui";
        public static COMPLETE_ANIMATION: string = "complete_animation";
    }

    export class Resources {
        public static PLAYER: string = "player";
        public static OBSTACLES: string = "obstacles";
        public static ANIMATION: string = "animation";
    }

    export class GameObjects {
        public static PLAYER: string = "player";
    }
}