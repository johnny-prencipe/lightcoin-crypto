class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
  commit() {
    if (this.canWithdraw()){
      this.time = new Date();
      this.account.addTransaction(this);

    }
  }
}

class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }
  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
  get balance() {
    let counter = 0;
    for (let i = 0; i < this.transactions.length; i++) {
      counter += this.transactions[i].value;
    }
    return counter;
  }
}


class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }
  canWithdraw() {
    if (this.account.balance - this.amount >= 0) {
      return true;
    }
    return false;
  }
}

class Deposit extends Transaction {

  canWithdraw() {
    return true;
  }

  get value() {
    return this.amount;
  }
}




// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account('snow-patrol');

console.log('Starting balance', myAccount.balance);

t1 = new Withdrawal(50.25, myAccount);
t1.commit();
console.log('Transaction 1:', t1);

t2 = new Withdrawal(9999999, myAccount);
t2.commit();
console.log('Transaction 2:', t2);

t3 = new Deposit(120.00, myAccount);
t3.commit();
console.log('Transaction 3:', t3);

console.log('Ending balance', myAccount.balance);
