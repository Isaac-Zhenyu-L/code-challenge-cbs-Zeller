export interface Event {
	type: string;
	amount: number;
	accountId: string;
}

export enum EventType {
	MoneyWithdrawn = 'MoneyWithdrawn',
	InsufficientFunds = 'InsufficientFunds',
}
