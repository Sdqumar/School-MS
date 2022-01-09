import Errror from "../global/Error";

export default function Input({ register, name, label, required = true, errors, type = 'text', style = '', ...rest }) {


  return (
    <div>
      <label>{label}</label>
      <input
        {...register(name, { required: required })}
        type={type}
        {...rest}
        className={`${style} ${errors[name] && "border-red-600"}`}

      />
      {errors[name] && <Errror message={`${label} is required`} />}
    </div>

  )
}
