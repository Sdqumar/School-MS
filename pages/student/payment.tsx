import useStore from "../../components/useStore";
import SideNavBar from "../../components/StudentSideBar";
import ProfileReview from "../../components/profileReview";
import Image from "next/image";
import { usePaystackPayment } from 'react-paystack';


export default function Form() {
  const user = useStore((state) => state.user);
console.log(user);


const payment={
    amount:50000,
    charges:150,
    type:"First Term Fees (2020 academic session)",
    total:50150

}
  const config = {
    reference: (new Date()).getTime().toString(),
    email: user?.email,
    amount: payment.total * 100,
    publicKey:"pk_test_cc89c527520c2442c1e462c3128f57442882a3ca",
};


const onSuccess = (reference) => {
    console.log(reference);
  };
  
  const onClose = () => {
    console.log('closed')
  }
  const initializePayment = usePaystackPayment(config);
const makePayment=()=>{
        initializePayment(onSuccess, onClose)
}

  return (
    <main className="flex min-h-full">
      <div>
        <SideNavBar />
      </div>
      <div className="mx-auto">
        <ProfileReview user={user} />
        <div className="mt-7 mx-4">
          <h2>Payment preview</h2>
          <p className="my-4">
            <strong className="text-red-400">Note*</strong> Below is the preview
            of the payment you are attempting to make. Kindly verify that the
            information is correct before clicking{" "}
            <strong>"Make Payment"</strong> button{" "}
          </p>
          <div className="border children:border-b payment">
            <h3 className="font-medium text-center text-lg">Current Charges</h3>
            <div>
              <span>Payment Type</span>
              <span>{payment.type}</span>
            </div>
            <div>
              <span>Amount</span>
              <span>{payment.amount}</span>
            </div>
            <div>
              <span>Processing Fees</span>
              <span>{payment.charges}</span>
            </div>
            <div>
              <span>Total Amount</span>
              <span>{payment.total}</span>
            </div>
          </div>
          <div className="my-4 m-auto ">
          <Image
            src="/paystackcard.png"
            alt="Picture of the author"
            width={350}
            height={120}
          />
          </div>
        <button onClick={makePayment} className="mb-10 m-auto">make payment</button>
        </div>
      </div>
    </main>
  );
}
