export interface EventHandler {
  [key: string]: (event: any) => void;
}
