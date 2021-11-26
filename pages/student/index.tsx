import useStore from "../../components/useStore";
import SideNavBar from "../../components/SideNavBar";
import ProfileReview from "../../components/profileReview";

export default function Form() {
  const navData = ["Profile", "Print result", "Print recipt", "Payment"];

  const user = useStore((state) => state.user);

  return (
    <main className="flex min-h-full">
      <div>
        <SideNavBar navData={navData} />
      </div>
      <div className="mx-auto">
        <ProfileReview user={user} />
      </div>
    </main>
  );
}
