

const Form = ({children, submitting}) => {
  return (
    <form className="formBG shadow-3xl rounded-2xl  px-20 py-16 w-[30vw] h-[60vh] text-green-300" onSubmit={submitting}>
      {children}
    </form>
  )
}

export default Form
