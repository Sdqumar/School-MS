import SideNavBar from "../../components/StudentSideBar";

export default function Dashboard() {
  const navData = ["Staff", "Student", "Classes", "Results"];

  return (
    <div className="flex min-h-full">
      <div>
        <SideNavBar navData={navData} />
      </div>
      <main className="ml-6">
        <h1 className="text-gray-700 text-5xl mt-8  font-medium">Dashboard</h1>
      </main>
    </div>
  );
}
