import Errror from "./Error";

export default function Input({register,name,label,required=true,errors,type='text',...rest}) {
  
    return(
      <div>
      <label>{label}</label>
      <input
        {...register(name, { required: required })}
        type={type}
        {...rest}
      />
      {errors.staffID && <Errror message={errors.staffID.message} />}
      </div>

    )
  }
  