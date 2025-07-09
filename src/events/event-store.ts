import { Event } from '../types/events';
export class EventStore {
	private events: Event[] = [];

	add(event: Event) {
		this.events.push(event);
	}

	getAccountEvents(accountId: string): Event[] {
		return this.events.filter((event) => event.accountId === accountId);
	}
}
