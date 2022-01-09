import Input from "../element/input";
import { useState } from "react";

export default function ResultForm({subjects,register,errors,values,setValue}){
    const [subjectIndex, setSubjectIndex] = useState(0);

    const setTotalScore = () => {
        const firstCA = values.subject?.[subjectIndex].firstCA.toString();
        const secondCA = values.subject?.[subjectIndex].secondCA.toString();
        const examScore = values.subject?.[subjectIndex].examScore.toString();
    
        if (firstCA && secondCA && examScore) {
          const totalScore =
            parseInt(firstCA) + parseInt(secondCA) + parseInt(examScore);
    
          setValue(`subject.${subjectIndex}.totalScore`, totalScore);
    
          let grade = "";
          let remark = "";
    
          if (totalScore >= 0 && totalScore <= 29) {
            grade = "F";
            remark = "Very Poor";
          }
          if (totalScore >= 30 && totalScore <= 39) {
            grade = "E";
            remark = "Poor";
          }
          if (totalScore >= 40 && totalScore <= 49) {
            grade = "D";
            remark = "Fair";
          }
          if (totalScore >= 50 && totalScore <= 59) {
            grade = "C";
            remark = "Good";
          }
    
          if (totalScore >= 60 && totalScore <= 69) {
            grade = "B";
            remark = "Very Good";
          }
    
          if (totalScore >= 70 && totalScore <= 100) {
            grade = "A";
            remark = "Excellent";
          }
    
          setValue(`subject.${subjectIndex}.grade`, grade);
          setValue(`subject.${subjectIndex}.remark`, remark);
        }
      };
    
    return(
        subjects.map((item, index) => {
          
          return(
            <div
              className="result"
              key={item}
              onClick={() => setSubjectIndex(index)}
            >
              <div>
                <Input
                  register={register}
                  name={`subject.${index}.name`}
                  errors={errors}
                  label={item}
                  hidden
                  defaultValue={item}
                />
              </div>
              <section>
                <Input
                  register={register}
                  name={`subject.${index}.firstCA`}
                  label="1st CA"
                  errors={errors}
                  min="0"
                  max="20"
                  type="number"
                  onBlur={setTotalScore}
                />
                <Input
                  register={register}
                  name={`subject.${index}.secondCA`}
                  label="2nd CA"
                  errors={errors}
                  min="0"
                  max="20"
                  type="number"
                  onBlur={setTotalScore}
                />

                <Input
                  register={register}
                  name={`subject.${index}.examScore`}
                  label="Exam"
                  errors={errors}
                  min="0"
                  max="60"
                  type="number"
                  onBlur={setTotalScore}
                />
                <Input
                  register={register}
                  name={`subject.${index}.totalScore`}
                  label="Total"
                  errors={errors}
                  min="0"
                  max="100"
                  type="number"
                />
                <Input
                  register={register}
                  name={`subject.${index}.grade`}
                  label="Grade"
                  errors={errors}
                />
                <Input
                  register={register}
                  name={`subject.${index}.remark`}
                  label="Remark"
                  style='remark'
                  errors={errors}
                />
              </section>
            </div>
          )})
    )
}