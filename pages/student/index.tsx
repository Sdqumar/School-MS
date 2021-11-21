import useStore from "../../components/useStore";
import SideNavBar from "../../components/SideNavBar";
import ProfileReview from "../../components/profileReview";

export default function Form() {
  const navData = ["Profile","Print result","Print recipt","Payment"];

  const user = useStore((state) => state.user);

  return (
    <main className="flex min-h-full">
      <SideNavBar navData={navData} />
      <div>
        <ProfileReview user={user} />
      </div>
    </main>
  );
}
