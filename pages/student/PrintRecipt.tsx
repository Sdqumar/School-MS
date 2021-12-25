import useStore from "../../components/useStore";
import SideNavBar from "../../components/StudentSideBar";
import ProfileReview from "../../components/profileReview";
import { useEffect, useState } from "react";
import useLocalStorage from "../../components/hooks/useLocalStorage";

export default function PrintRecipt() {
  const user = useStore((state) => state.user);
  const [recipts, setRecipts] = useState(null);
  const [value, setValue] = useLocalStorage("recipt",null );
  
  useEffect(() => {
    const getRecipts = async () => {
      try {
        const res = await fetch("/api/student/recipt", {
          method: "POST",
          body: JSON.stringify({ studentId: user._id }),
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        setRecipts(data);
        if (data.errors) {
          console.log(data.errors);
        } else {
        }
      } catch (err) {
        console.log(err);
      }
    };

user &&    getRecipts();
  }, []);

  const handlePrintRecipt = (recipt) => {
   setValue(recipt)
     window.open("./reciptView", "_blank");
  };

  return (
    <main className="flex min-h-full">
      <div>
        <SideNavBar />
      </div>
      <div className="mx-auto">
        <ProfileReview user={user} />
        <h3 className="mt-3 text-center">List of Recipts</h3>
        <h3 className="w-[100%] mt-2 text-center ">
          Click on any of the payment description below to generate recipt
        </h3>
        <table>
          <tr>
            <td className="w-2">S/N</td>
            <td>Class</td>
            <td>Term</td>
            <td>Year</td>
          </tr>

          {recipts?.map((item, index) => {
            const { term, class: className } = item.data.metadata;
            const year = item.data.paidAt.split("-")[0];

            return (
              <tr
                className="cursor-pointer"
                onClick={() => handlePrintRecipt(item)}
              >
                <td>{index + 1}</td>
                <td>{className}</td>
                <td>{term}</td>
                <td>{year}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </main>
  );
}
