type values={
    term:string,
    studentName?:string,
    year:number,
    class:string
}
type user={
    fullName?:string,
}

type getStudentId={
    values?:values,
    user?:user
}
export default function getResultId(values:values,user:user){
    let term = "01";

    if (values.term === "Second Term") {
      term = "02";
    }
    if (values.term === "Third Term") {
      term = "03";
    }
    let studentID: string[] | string = values?.studentName
      ?.split(" ")
      .map((item) => item.charAt(0));
    studentID = studentID?.toString()?.replace(",", "");

    if (user) {
      studentID = user?.fullName?.split(" ").map((item) => item.charAt(0));
      studentID = studentID.toString()?.replace(",", "");
    }

    let [class1st, class2nd] = values.class
      .toUpperCase()
      .split(" ")
      .map((item) => item.slice(0, 3));
    const classID = class1st + class2nd;
    const id = `${values.year}-${term}-${classID}-${studentID}`;

    return id;
  };