export class Account {
	constructor(
		public readonly accountId: string,
		public balance: number = 1000
	) {}

	withdrawnMoney(amount: number) {
		this.balance -= amount;
	}
}
