

const Form = ({children, submitting}) => {
  return (
    <form className="formBG shadow-3xl rounded-2xl  px-6 py-2 w-[50vw] h-[60vh] text-green-300" onSubmit={submitting}>
      {children}
    </form>
  )
}

export default Form
