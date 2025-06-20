

const AuthForm = ({children, submitting}) => {
  return (
    <form className="shadow-xl rounded-2xl bg-primary px-8 py-4 w-[30vw] h-[60vh]" onSubmit={submitting}>
      {children}
    </form>
  )
}

export default AuthForm
