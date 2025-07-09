import { Account } from '../domain/account';
import { Event, EventType } from '../types/events';

export class AccountProjector {
	static project(events: Event[], accountId: string): Account {
		const account = new Account(accountId);
		events?.forEach((event) => {
			switch (event.type) {
				case EventType.MoneyWithdrawn:
					account.withdrawnMoney(event.amount);
					break;
			}
		});
		return account;
	}
}
