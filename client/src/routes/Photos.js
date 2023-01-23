import { useState } from "react"

const Photos = () => {
  const [file, setFile] = useState("")
  const handleChange = (e) => {
    console.log(e.target.files)
    setFile(URL.createObjectURL(e.target.files[0]))
  }

  return (
    <div>
      <h2 className="text-center font-montserrat font-bold leading-tight text-almost-white text-4xl mt-20">
        ✨ Add Your Image ✨
      </h2>
      <h2 className="text-center font-montserrat italic leading-tight text-almost-white text-xl mt-10 mb-10">
        You can add up to 4 images
      </h2>
      <div className="flex justify-center">
        <input type="file" onChange={handleChange} />
        <img src={file} alt="" />
      </div>
    </div>
  )
}

export default Photos
