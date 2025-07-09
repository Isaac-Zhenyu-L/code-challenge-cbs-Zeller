import { EventStore } from '../events/event-store';
import { AccountProjector } from '../projector/account-projector';

export class AccountQueries {
	constructor(private readonly eventStore: EventStore) {}

	getBalance(accountId: string): number {
		const events = this.eventStore.getAccountEvents(accountId);
		return AccountProjector.project(events, accountId).balance;
	}
}
