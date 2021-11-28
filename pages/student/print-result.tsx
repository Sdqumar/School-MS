import useStore from "../../components/useStore";
import SideNavBar from "../../components/StudentSideBar";
import ProfileReview from "../../components/profileReview";
import FindResult from "../../components/findResult";

export default function Form() {
  const navData = ["Profile", "Print result", "Print recipt", "Payment"];

  const user = useStore((state) => state.user);

  return (
    <main className="flex min-h-full">
      <div>
        <SideNavBar />
      </div>
      <div className="mx-auto">
        <ProfileReview user={user} />
        <div className="mt-7 ">
          <FindResult user={user} />
        </div>
      </div>
    </main>
  );
}
