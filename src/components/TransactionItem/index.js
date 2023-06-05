import './index.css'

// Write your code here

const TransactionItem = props => {
  const {moneyMangerList, onDeleteItem} = props
  const {id, title, amount, type} = moneyMangerList
  const onClickDlete = () => {
    onDeleteItem(id)
  }
  return (
    <li className="list-container">
      <p>{title}</p>
      <p>{amount}</p>
      <p>{type}</p>
      <button
        type="button"
        className="button-delete"
        data-testid="delete"
        onClick={onClickDlete}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
          className="img-delete"
        />
      </button>
    </li>
  )
}

export default TransactionItem
