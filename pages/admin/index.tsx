import SideNavBar from "../../components/SideNavBar"

export default function dashboard (){

const navData=['Staff','Student','Classes','Results']

return(
    <main className="flex min-h-full">
      <SideNavBar navData={navData} />
      <div>
      <h1 className="text-gray-700 text-5xl mt-8 ml-14 font-medium">Dashboard</h1>
      </div>
    </main>

      
)
}