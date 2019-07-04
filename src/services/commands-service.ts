import * as _ from "lodash";
import {AbstractCommand} from "../commands/abstract-command";

/**
 * Consider this class as sort of signal manager - first register command then call it.
 */
export class CommandsService {
    private static _instance: CommandsService;
    private _commands: _.Dictionary<AbstractCommand> = {};

    public static get instance(): CommandsService {
        return CommandsService._instance;
    }

    constructor() {
        if (!_.isNil(CommandsService.instance)) {
            throw new Error("CommandsService class can not be instantiated. Please use CommandsService.instance");
        }
        CommandsService._instance = this;
    }

    public registerCommand(commandName: string, commandClass: new () => AbstractCommand): void {
        if (!_.has(this._commands, commandName)) {
            this._commands[commandName] = new commandClass();
        }
    }

    public callCommand(commandName: string, params?: {}): void {
        if (_.has(this._commands, commandName)) {
            this._commands[commandName].execute(params);
        }
    }
}