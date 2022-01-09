import AdminNavBar from "../../components/AdminSideBar";
import DashboardCard from "../../components/admin/dashboardCard";

export default function Dashboard() {

  return (
    <div className="flex min-h-full">
      <div>
        <AdminNavBar />
      </div>
      <main className="mx-6">
        <div className="flex justify-between align-middle ">
        <h1 className="text-gray-700 text-5xl mt-8  font-medium">Dashboard</h1>
        <h1 className="text-primary text-3xl mt-8 mr-14 font-medium">2022/2033 Session</h1>
        </div>
        <div className="flex flex-wrap children:mr-4 children:mb-4">
          <DashboardCard text='TOTAL STUDENTS' number={1234} />
          <DashboardCard text='TOTAL TEACHER' number={34} />
          <DashboardCard text='TOTAL ADMINISTRATOR' number={34} />
          <DashboardCard text='TOTAL PARENTS' number={12} />
          <DashboardCard text='TOTAL MALE STUDENTS' number={970} />
          <DashboardCard text='TOTAL FEMALE STUDENTS' number={643} />
          <DashboardCard text='STUDENTS WITH DISABILITIES' number={1234} />

        </div>
      </main>
    </div>
  );
}
