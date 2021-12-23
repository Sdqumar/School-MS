import useStore from "../../components/useStore";
import SideNavBar from "../../components/StudentSideBar";
import ProfileReview from "../../components/profileReview";
import Link from "next/link";
import FindRecipt from "../../components/findRecipt";

export default function PrintRecipt() {
    const user = useStore((state) => state.user);

    return (
    <main className="flex min-h-full">
      <div>
        <SideNavBar />
      </div>
      <div className="mx-auto">
        <ProfileReview user={user} />
        <div className="mt-7 ">
        <FindRecipt user={user} />

        </div>
      </div>
    </main>
  );
}
