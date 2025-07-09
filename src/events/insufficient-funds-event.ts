import { Event, EventType } from '../types/events';

export class InsufficientFundsEvent implements Event {
	type = EventType.InsufficientFunds;
	constructor(
		public readonly accountId: string,
		public readonly amount: number
	) {}
}
