import  { useState } from 'react'
import { useUserContext } from '../../Context/UserContext'
import { Camera } from 'lucide-react'
import { useLevelLabelName } from '../../Components/useLevelLabelName'
import { Link } from 'react-router'

const Profile = () => {
  const { user, loading, uploadAvatar } = useUserContext()
  const label = useLevelLabelName()
  const [preview, setPreview] = useState(null)
  const [uploading, setUploading] = useState(false)

  if (loading) return <div className="text-white text-center mt-10">Loading data kultivator...</div>

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0]
    if (file) {
      setPreview(URL.createObjectURL(file))
      try {
        setUploading(true)
        await uploadAvatar(file)
      } catch (err) {
        console.error("Upload gagal:", err)
        alert("Gagal upload avatar!")
      } finally {
        setUploading(false)
      }
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1c1b1b] to-[#2e2626] text-white px-4'>
      <div className='w-full max-w-2xl bg-[#2e2626] rounded-2xl shadow-2xl p-8 border border-[#633333]'>
        <h1 className='text-3xl font-bold mb-6 text-center text-[#c06f6f]'>Profil Saya</h1>

        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <img
              src={preview || (user.avatar && `http://localhost:9000${user.avatar}`) || "/default-avatar.png"}

              alt="Avatar"
              className="w-32 h-32 rounded-full object-cover border-4 border-[#8D6E6E] shadow-md"
            />
            <label className="absolute -bottom-2 -right-2 bg-[#8D6E6E] p-2 rounded-full cursor-pointer hover:bg-[#a98484] transition">
              <input type="file" className="hidden" onChange={handleAvatarChange} />
              <Camera className="w-5 h-5 text-white" />
            </label>
            {uploading && <p className="text-xs text-gray-400 mt-1">Uploading...</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <Info label="Name" value={user.name} />
            <Info label="Level" value={user.level} />
            <Info label="Ki Point" value={user.current_exp} />
            <Info label="Registration Date" value={new Date(user.registration_date).toLocaleDateString()} />
            <Info label="Ranah" value={label} />
          </div>
          <Link to={"/"} className='bg-primary px-4 py-2 w-full flex justify-center rounded-2xl hover:bg-triary hover:text-secondary'>Go back</Link>
        </div>
      </div>
      {console.log(user)}
    </div>
  )
}

const Info = ({ label, value }) => (
  <div className="bg-[#3a2f2f] rounded-lg p-4 border border-[#8D6E6E]">
    <p className="text-sm text-gray-400">{label}</p>
    <p className="text-lg font-semibold text-white">{value}</p>
  </div>
)

export default Profile
