import useStore from "../../components/useStore";
import SideNavBar from "../../components/StudentSideBar";
import ProfileReview from "../../components/profileReview";

export default function Index() {
  const user = useStore((state) => state.user);

  return (
    <main className="flex min-h-full">
      <div>
        <SideNavBar />
      </div>
      <div className="mx-auto">
        <ProfileReview user={user} />

        <div>
        <h3 className="text-xl mt-5 border border-blue-200 w-max p-2 cursor-pointer hover:bg-gray-50">
            Edit Profile
          </h3>
        </div>
      </div>
      
    </main>
  );
}
