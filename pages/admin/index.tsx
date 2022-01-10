import AdminNavBar from "../../components/admin/SideBar";
import DashboardCard from "../../components/admin/dashboardCard";

export default function Dashboard() {

  return (
    <div className="flex min-h-full">
      <div>
        <AdminNavBar  />
      </div>
      <main className="mx-6">
        <div className="flex justify-between align-middle ">
        <h1 className="text-gray-700 text-[2.8rem] mt-8  font-medium">Dashboard</h1>
        <h1 className="text-blue-500 text-2xl mt-8 mr-14 font-medium">2022/2033 Session</h1>
        </div>
        <div className="flex flex-wrap children:mr-4 children:mb-4">
          <DashboardCard text='TOTAL STUDENTS' number={1234} />
          <DashboardCard text='TOTAL TEACHER' number={34} />
          <DashboardCard text='TOTAL ADMINISTRATOR' number={34} />
          <DashboardCard text='TOTAL PARENTS' number={52} />
          <DashboardCard text='TOTAL MALE STUDENTS' number={970} />
          <DashboardCard text='TOTAL FEMALE STUDENTS' number={643} />

        </div>
      </main>
    </div>
  );
}
