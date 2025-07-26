
const InputForm = ({handleChange, value, typenya, labelnya}) => {
  return (
    <div className="flex flex-col">
        <label className="font-aldrich">{labelnya}</label>
        <input
                    type={typenya}
                    value={value}
                    className="text-teal-900 focus:outline-none border-[0.5px] p-1 rounded-lg bg-white"
                    onChange={handleChange}
        />  
    </div>
  )
}

export default InputForm
