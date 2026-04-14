import { useState } from 'react';
import axios from "axios";

const App = () => {

  const [file, setFile] = useState(null);
  const [image, setImage] = useState("");
  const[msg,setMsg] = useState(undefined) 

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please Select File!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "http://localhost:3000/upload",
        formData
      );
      setMsg("File Uploded SuccessFully!!")
      alert(msg)
      console.log(res.data);
      // assuming backend returns { filename: "abc.jpg" } 
      setImage(res.data.filename);

    } catch (error) {
      setMsg("Upload Failed!")
      alert(msg);
      console.log(error);
      console.log(error.message);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>File Upload</h2>

      <input type="file" onChange={handleFileChange} />
      <br /><br />

      <button onClick={handleUpload}>Upload</button>

      <br /><br />

      {/* Show image only after upload */}
      {image && (
        <img
          src={`http://localhost:3000/uploads/${image}`}
          alt="Uploaded"
          width="300"
        />
      )}
    </div>
  );
};

export default App;