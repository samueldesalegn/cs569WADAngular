export enum GUESS_RESULT {
  Correct = 'Correct',
  Incorrect = 'Incorrect',
}

export interface ITry {
  word: string;
  result: GUESS_RESULT;
  timestamp: number;
}

export interface IState {
  complexity: number;
  win_count: number;
  loss_count: number;
  logs: ITry[];
}

export const INITIAL_STATE = {
  complexity: 5,
  win_count: 0,
  loss_count: 0,
  logs: [],
};
