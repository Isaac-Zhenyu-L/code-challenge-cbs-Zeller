import { WithdrawMoneyCommand } from '../commands/withdraw-money-command';
import { EventStore } from '../events/event-store';
import { InsufficientFundsEvent } from '../events/insufficient-funds-event';
import { MoneyWithdrawnEvent } from '../events/money-withdrawn-event';
import { AccountProjector } from './account-projector';

export class CommandHandler {
	constructor(private readonly eventStore: EventStore) {}

	handle(withdrawMoneyCommand: WithdrawMoneyCommand) {
		if (withdrawMoneyCommand.amount <= 0) {
			throw new Error('Please double check the amount');
		}
		const events = this.eventStore.getAccountEvents(
			withdrawMoneyCommand.accountId
		);
		const account = AccountProjector.project(
			events,
			withdrawMoneyCommand.accountId
		);

		if (account.balance >= withdrawMoneyCommand.amount) {
			const event = new MoneyWithdrawnEvent(
				withdrawMoneyCommand.accountId,
				withdrawMoneyCommand.amount
			);
			this.eventStore.add(event);
		} else {
			const event = new InsufficientFundsEvent(
				withdrawMoneyCommand.accountId,
				withdrawMoneyCommand.amount
			);

			this.eventStore.add(event);
		}
	}
}
