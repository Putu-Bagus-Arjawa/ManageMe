import { useParams } from "react-router"
import Dashboard from "../../Components/Dashboard"
import Form from "../../Components/Form"
import InputForm from "../../Components/InputForm"
import LevelSection from "../../Components/LevelSection"
import { useState } from "react"
import { useEffect } from "react"

const ModifyEating = () => {
    const { day } = useParams()
    const [formData, setFormData] = useState({
        item: "",
        harga: "",
        gizi: "",
        exp: ""
    })

    const handleSubmit = async () => {
    try {
      const res = await fetch(`http://localhost:9000/eating/modify/${day}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          item: formData.item,
          harga: parseInt(formData.harga),
          gizi: formData.gizi,
          exp: parseInt(formData.exp)
        })
      })
      const result = await res.json()
      if (!res.ok) throw new Error(result.message || "Update gagal")

    }catch(err){
            console.error("❌ Gagal update:", err)
        }
    }

      useEffect(() => {
        const fetchData = async () => {
        try {
            const res = await fetch(`http://localhost:9000/eating/${day}`, {
            method: "GET",
            credentials: "include"
            })
            if (!res.ok) throw new Error("Gagal ambil data")
            const data = await res.json()
            setFormData({
                item: data.items || "",
                harga: data.price || "",
                gizi: data.gizi || "",
                exp: data.eating_exp || ""
            })
      } catch (err) {
        console.error("❌ Error ambil data:", err)
      }
    }

    fetchData()
  }, [day])

  return (
    <div>
        <Dashboard>
            <LevelSection/>
            <div className="flex justify-center items-center h-full w-full">
                <Form submitting={handleSubmit}>
                    <div className="h-full w-full flex flex-col items-center justify-center">
                        <div className="flex flex-col mb-4">
                            <h1 className="font-insan text-3xl text-center">Makan</h1>
                            <div className="flex gap-x-4">
                                <InputForm 
                                    labelnya="Item:"
                                    value={formData.item}
                                    handleChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            item: e.target.value
                                        }))
                            
                                    }
                                    typenya={"text"}
                                />
                                <InputForm 
                                    labelnya="Harga:"
                                    value={formData.harga}
                                    handleChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            harga: parseInt(e.target.value)
                                        }))
                                    }
                                    typenya={"number"}
                                />
                            </div>
                            <div className="flex gap-x-4">
                                <InputForm 
                                    labelnya="Gizi:"
                                    value={formData.gizi}
                                    handleChange={(e) =>
                                    setFormData((prev) => ({
                                            ...prev,
                                            gizi: e.target.value
                                        }))
                                    }
                                     typenya={"text"}
                                />
                                <InputForm 
                                    labelnya="Exp:"
                                    name="exp"
                                    value={formData.exp}
                                    handleChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        exp: parseInt(e.target.value)
                                    }))
                                }
                                 typenya={"number"}
                                />
                            </div>
                        </div>
                        <button className="bg-black px-2 py-1 w-3/5 rounded-xl hover:bg-neutral-400  hover:text-teal-700">Adjust</button>
                    </div>
                </Form>
            </div>
        </Dashboard>
    </div>
  )
}

export default ModifyEating
