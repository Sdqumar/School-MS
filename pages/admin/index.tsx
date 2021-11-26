import AdminNavBar from "../../components/AdminSideBar";

export default function Dashboard() {
  return (
    <div className="flex min-h-full">
      <div>
        <AdminNavBar />
      </div>
      <main className="ml-6">
        <h1 className="text-gray-700 text-5xl mt-8  font-medium">Dashboard</h1>
      </main>
    </div>
  );
}
