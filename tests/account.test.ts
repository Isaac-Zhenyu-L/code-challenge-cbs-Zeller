import { WithdrawMoneyCommand } from '../src/commands/withdraw-money-command';
import { EventStore } from '../src/events/event-store';
import { InsufficientFundsEvent } from '../src/events/insufficient-funds-event';
import { CommandHandler } from '../src/projector/command-handler';
import { AccountQueries } from '../src/queries/account-queries';

let eventStore: EventStore;
let command: CommandHandler;
let query: AccountQueries;

beforeEach(() => {
	eventStore = new EventStore();
	command = new CommandHandler(eventStore);
	query = new AccountQueries(eventStore);
});

test('Successful withdrawal', () => {
	command.handle(new WithdrawMoneyCommand('account001', 200));
	expect(query.getBalance('account001')).toBe(800);
});

test('Multiple withdrawals', () => {
	command.handle(new WithdrawMoneyCommand('account001', 300));
	command.handle(new WithdrawMoneyCommand('account001', 200));
	expect(query.getBalance('account001')).toBe(500);
});

test('Withdrawal exceeding balance', () => {
	command.handle(new WithdrawMoneyCommand('account001', 1100));
	expect(query.getBalance('account001')).toBe(1000);

	const events = eventStore.getAccountEvents('account001');
	expect(events[0]).toBeInstanceOf(InsufficientFundsEvent);
});

test('Negative withdrawal amount', () => {
	expect(() => {
		command.handle(new WithdrawMoneyCommand('account001', -50));
	}).toThrow('Please double check the amount');
});

test('Zero withdrawal amount', () => {
	expect(() => {
		command.handle(new WithdrawMoneyCommand('account001', 0));
	}).toThrow('Please double check the amount');
});
