import React from 'react'
import { Menu } from 'semantic-ui-react'



const PaymentFilter = (props) => {


  let activePaymentItem = null;


  return (
    <Menu text vertical>
      <Menu.Item header>Payment Options</Menu.Item>
      <Menu.Item name='AMEX' active={activePaymentItem === 'American Express'} onClick={props.handleFilterClick} />
      <Menu.Item name='Mastercard' active={activePaymentItem === 'MasterCard'} onClick={props.handleFilterClick} />
      <Menu.Item name='Visa' active={activePaymentItem === 'Visa'} onClick={props.handleFilterClick} />
      <Menu.Item name='Discover' active={activePaymentItem === 'Discover'} onClick={props.handleFilterClick} />
    </Menu>
  )
}
export default PaymentFilter
