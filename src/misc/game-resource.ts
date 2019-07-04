
/**
 * Class representing game resource to load
 */
export class GameResource {
    public id: string;
    public path: string;

    constructor(resId: string, resPath: string) {
        this.id = resId;
        this.path = resPath;
    }
}