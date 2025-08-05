import { Link, useParams, useNavigate } from "react-router";
import { useUserContext } from "../../Context/UserContext";

const AllocationStatus = () => {
  const { day } = useParams();
  const navigate = useNavigate();
  const {refreshUser} = useUserContext()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:9000/allocation/status/${day}`, {
        method: "PUT",
        credentials: "include", 
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({})
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Gagal update status");
      }
      await refreshUser()
      navigate("/allocation"); 
    } catch (err) {
      console.error("Error update status:", err.message);
      alert("Gagal mengubah status!");
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center formBG">
      <form
        onSubmit={handleSubmit}
        className="w-[40vw] h-[40vh] border-2 rounded-xl flex flex-col justify-between p-8"
      >
        <h2 className="text-xl font-semibold text-green-200">Change Status to Finished?</h2>
        <p className="text-center text-green-200">Day: {day}</p>
        <div className="grid grid-cols-2 gap-x-4">
          <button type="submit" className="rounded-xl bg-black text-white py-2">Yes</button>
          <Link to="/eating" className="rounded-xl border-2 text-center py-2">No</Link>
        </div>
      </form>
    </div>
  );
};

export default AllocationStatus;
