import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here
class MoneyManager extends Component {
  state = {
    transactionsList: [],
    title: '',
    amount: '',
    optionId: transactionTypeOptions[0].optionId,
  }

  onDeleteItem = id => {
    console.log(id)
    const {transactionsList} = this.state
    const updatedList = transactionsList.filter(eachItem => eachItem.id !== id)
    this.setState({transactionsList: updatedList})
  }

  onChangeOptionId = event => {
    this.setState({optionId: event.target.value})
  }

  onClickAdd = () => {
    const {amount, title, optionId} = this.state
    console.log(optionId)
    const typeOfMoney = transactionTypeOptions.find(
      eachItem => eachItem.optionId === optionId,
    )
    const {displayText} = typeOfMoney

    const newList = {
      id: uuidv4(),
      type: displayText,
      title,
      amount: parseInt(amount),
    }

    this.setState(prevState => ({
      transactionsList: [...prevState.transactionsList, newList],
      title: '',
      amount: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amount: event.target.value})
  }

  getExpenses = () => {
    const {transactionsList} = this.state
    let expenses = 0

    transactionsList.forEach(eachTrans => {
      if (eachTrans.type === transactionTypeOptions[1].displayText) {
        expenses += eachTrans.amount
      }
    })
    return expenses
  }

  getIncome = () => {
    const {transactionsList} = this.state
    let income = 0

    transactionsList.forEach(eachTrans => {
      if (eachTrans.type === transactionTypeOptions[0].displayText) {
        income += eachTrans.amount
      }
    })
    return income
  }

  getBalance = () => {
    const {transactionsList} = this.state
    let balanceAmount = 0
    let incomeAmount = 0
    let expensesAmount = 0

    transactionsList.forEach(eachTrans => {
      if (eachTrans.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTrans.amount
      } else {
        expensesAmount += eachTrans.amount
      }
    })
    balanceAmount = incomeAmount - expensesAmount
    return balanceAmount
  }

  render() {
    const {transactionsList, title, amount} = this.state
    const balance = this.getBalance()
    const income = this.getIncome()
    const expenses = this.getExpenses()
    return (
      <div className="container">
        <div className="card">
          <div className="nav-bar-container">
            <h1>Hi, Richard</h1>
            <p>
              Welcome back to your{' '}
              <span className="span-element">Money Manager</span>
            </p>
          </div>
          <div className="money-diff-container">
            <div className="Balance-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
                alt="balance"
                className="img"
              />
              <div className="your-balance-container">
                <p>Your Balance</p>
                <p data-testid="balanceAmount">Rs {balance}</p>
              </div>
            </div>
            <div className="Income-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png "
                alt="income"
                className="img"
              />
              <div className="your-balance-container">
                <p>Your Income</p>
                <p data-testid="incomeAmount">Rs {income}</p>
              </div>
            </div>
            <div className="expenses-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
                alt="expenses"
                className="img"
              />
              <div className="your-balance-container">
                <p>Your Expenses</p>
                <p data-testid="expensesAmount">Rs {expenses}</p>
              </div>
            </div>
          </div>
          <div className="transaction-history-container">
            <div className="add-transaction-container">
              <h1>Add Transaction</h1>
              <label htmlFor="title" className="label">
                TITLE
              </label>
              <br />
              <input
                type="text"
                id="title"
                className="title"
                placeholder="TITLE"
                value={title}
                onChange={this.onChangeTitle}
              />
              <br />
              <label htmlFor="amount">AMOUNT</label>
              <br />
              <input
                type="text"
                id="amount"
                className="amount"
                placeholder="AMOUNT"
                onChange={this.onChangeAmount}
                value={amount}
              />
              <br />
              <label htmlFor="type">TYPE</label>
              <br />
              <select id="type" onChange={this.onChangeOptionId}>
                {transactionTypeOptions.map(eachItem => (
                  <MoneyDetails
                    transactionTypeOptions={eachItem}
                    key={eachItem.optionId}
                  />
                ))}
              </select>
              <br />
              <button
                type="button"
                className="button"
                onClick={this.onClickAdd}
              >
                ADD
              </button>
            </div>
            <ul className="history-container">
              <h1>History</h1>
              <div className="table-container">
                <p>Title</p>
                <p>Amount</p>
                <p>Type</p>
                <p> </p>
              </div>
              {transactionsList.map(eachItem => (
                <TransactionItem
                  moneyMangerList={eachItem}
                  key={eachItem.id}
                  onDeleteItem={this.onDeleteItem}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
