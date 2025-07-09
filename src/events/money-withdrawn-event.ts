import { Event, EventType } from '../types/events';

export class MoneyWithdrawnEvent implements Event {
	type = EventType.MoneyWithdrawn;
	constructor(
		public readonly accountId: string,
		public readonly amount: number
	) {}
}
