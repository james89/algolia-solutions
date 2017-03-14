import React from 'react'
import { Menu, Label } from 'semantic-ui-react'



const PaymentFilter = (props) => {


  let activePaymentItem = props.activePaymentItem;

  let validPayments = ['Visa', 'MasterCard', 'AMEX', 'Discover'];

  return (
    <Menu text vertical className="filter">
      <Menu.Item header>Payment Options</Menu.Item>
       {
          props.data.facets && props.data.getFacetValues('payment_options').map((payment, index) => {
            if(validPayments.includes(payment.name)){
              return (
                <Menu.Item key={index} name={payment.name} active={activePaymentItem === payment.name} onClick={() => props.handlePaymentClick(payment.name, 'payment_options')} >
                  <Label>{payment.count}</Label>
                  {payment.name}
                </Menu.Item>
              )  
            }
              
          })
       }
      
      {/* <Menu.Item name='AMEX' active={activePaymentItem === 'AMEX'} onClick={() => props.handlePaymentClick('AMEX', 'payment_options')} />
      <Menu.Item name='Mastercard' active={activePaymentItem === 'MasterCard'} onClick={() => props.handlePaymentClick('MasterCard', 'payment_options')} />
      <Menu.Item name='Visa' active={activePaymentItem === 'Visa'} onClick={() => props.handlePaymentClick('Visa', 'payment_options')} />
      <Menu.Item name='Discover' active={activePaymentItem === 'Discover'} onClick={() => props.handlePaymentClick('Discover', 'payment_options')} /> */}
    
    </Menu>
  )
}
export default PaymentFilter
