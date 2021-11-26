import useStore from "../../components/useStore";
import SideNavBar from "../../components/StudentSideBar";
import ProfileReview from "../../components/profileReview";

export default function Profile() {
  const user = useStore((state) => state.user);

  return (
    <main className="flex min-h-full">
      <div>
        <SideNavBar />
      </div>
      <div className="mx-auto">
        <ProfileReview user={user} />
      </div>
    </main>
  );
}
