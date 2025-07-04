

const InputTaskEXP = ({value, handleInputExp}) => {
  return (
    <div className="flex flex-col">
        <label className="font-aldrich">Exp</label>
            <input
             type="number"
                    className="text-teal-900 focus:outline-none border-[0.5px] p-1 rounded-lg bg-white"
                    value={value}
                    onChange={handleInputExp}
        />
    </div>
  )
}

export default InputTaskEXP
