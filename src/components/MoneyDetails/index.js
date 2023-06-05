// Write your code here
import './index.css'

const MoneyDetails = props => {
  const {transactionTypeOptions} = props
  const {optionId, displayText} = transactionTypeOptions
  return (
    <option key={optionId} value={optionId}>
      {displayText}
    </option>
  )
}

export default MoneyDetails
