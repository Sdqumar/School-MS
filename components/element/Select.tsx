import Errror from "../global/Error";

export default function Select({register,name,label,required=true,errors,data,...rest}) {

  
  return (
    <div className="block">
      <label>{label}</label>
      <select 
        {...register(name, { required: required })}
        {...rest}
         className={errors[name] &&"border-red-600"}
      >
        {data.map((item,index) => (
          <option value={item} key={index}>
            {item}
          </option>
        ))}
      </select>
      {errors[name] && <Errror message={`${label} is required`} />}

    </div>
  )
}
