export class ErrorMessage {
    constructor(
      public forControl: string,
      public forValidator: string,
      public text: string
    ) { }
  }
  
export const MetricCCErrorMessages = [
    new ErrorMessage('chartName', 'required', 'A chart name is required'),
];  