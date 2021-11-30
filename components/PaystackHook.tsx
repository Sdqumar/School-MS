import { usePaystackPayment } from 'react-paystack';
  
const config = {
    reference: (new Date()).getTime().toString(),
    email: "user@example.com",
    amount: 20000,
    publicKey: process.env.PAYSTACK_PUBLIC_KEY,
};

const onSuccess = (reference) => {
  console.log(reference);
};

const onClose = () => {
  console.log('closed')
}

const PaystackHook = () => {
    const initializePayment = usePaystackPayment(config);
    return (
      <div>
          <button onClick={() => {
              initializePayment(onSuccess, onClose)
          }}>Paystack Hooks Implementation</button>
      </div>
    );
};

export default PaystackHook