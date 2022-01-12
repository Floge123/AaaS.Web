import {LogCategory} from './log-category';

export class Log {
  constructor(
    public id: number,
    public timestamp: Date,
    public name: string,
    public clientId: string,
    public category: LogCategory,
    public message: string
  ) {}
}
