import React, { useState } from 'react'
import Dashboard from '../../../Components/Dashboard'
import Form from '../../../Components/Form'
import InputTaskName from './InputTaskName'
import InputTaskEXP from './InputTaskEXP'

const AddTask = () => {
  const [form, setForm] = useState({
    nama_task: "",
    exp: null,
  })

  const [message, setMessage] = useState({ pesan: "", tipe: "" })

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const respons = await fetch('http://localhost:9000/task/insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          task: form.nama_task,
          exp: form.exp,
        }),
      })

      const data = await respons.json()

      if (respons.ok) {
        setForm({ nama_task: "", exp: null })
        setMessage({ pesan: data.message, tipe: "success" })
      } else {
        setMessage({ pesan: data.message, tipe: "failed" })
      }

    } catch (error) {
      setMessage({ pesan: error.message || "Terjadi kesalahan", tipe: "failed" })
    }
  }

   

  return (
    <div>
      <Dashboard>
        <div className="w-full h-full flex justify-center py-20">
          <Form submitting={handleSubmit}>
            <div className="flex flex-col justify-around h-full w-full">
              <section>
                <h2 className="font-aldrich text-4xl flex justify-center">Insert Task</h2>
              </section>

              <section className="flex flex-col gap-y-4">
                <InputTaskName 
                  value={form.nama_task}
                  handleChange={(e) => {
                      setForm((prev) => ({ ...prev, nama_task: e.target.value }))
                      if (message.pesan) setMessage({ pesan: "", tipe: "" })
                    }}
                />
                <InputTaskEXP 
                  value={form.exp}
                  handleInputExp={(e) => {
                      setForm((prev) => ({ ...prev, exp: parseInt(e.target.value) || 0 }))
                      if (message.pesan) setMessage({ pesan: "", tipe: "" })
                    }}
                />


                <button
                  type="submit"
                  className="font-aldrich bg-green-300 hover:bg-teal-200 hover:text-neutral-700 text-black px-4 py-2 rounded-2xl w-full"
                >
                  Insert Task
                </button>
              </section>
            </div>
          </Form>
        </div>
      </Dashboard>

      {message.pesan && message.tipe && (
        <div
          className={`border ${
            message.tipe === "success"
              ? "bg-green-200 border-green-300"
              : "bg-red-200 border-red-300"
          } px-8 py-4 rounded-lg text-sm absolute right-4 bottom-8 shadow-lg text-blue-950`}
        >
          <p className="flex justify-center">{message.pesan}</p>
        </div>
      )}
    </div>
  )
}

export default AddTask
