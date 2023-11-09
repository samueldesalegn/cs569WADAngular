export type APP_STATE = {winCount: number, lossCount: number, tieCount: number, computerChoice: string};
export const APP_INITIAL_STATE = {winCount: 0, lossCount: 0, tieCount: 0, computerChoice: ''};
export type HISTORY = {human: string, computer: string, result: string}