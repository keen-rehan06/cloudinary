import { useEffect, useState } from 'react';
import axios from "axios";

const App = () => {

  const [file, setFile] = useState(null);
  const [name, setName] = useState([]);
  const [post,setPost] = useState([])
  const [image, setImage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please Select File!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file); 
    formData.append("name", name);

    try {
      const res = await axios.post(
        "http://localhost:3000/upload",
        formData,{ 
          headers: {
      "Content-Type": "multipart/form-data",
    },
  }
      );
      console.log(res.data);

      // backend se filename aa raha hai
      setImage(res.data.filename);
      alert(res.data.message);
    } catch (error) {
      alert(error.message)
      console.log(error);
    }
  };


useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:3000/find');
        console.log(res.data);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []); // ❗ dependency hata di (warna loop ban sakta tha)

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>File Upload</h2>

      <input type="file" onChange={handleFileChange} />
      <input type="text" name='name' onChange={(e)=>setName(e.target.value)} value={name}/>

      <br /><br />

      <button onClick={handleUpload}>Upload</button>

      <br /><br />
        <h4>Image Preview</h4>
        <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
    padding: "20px",
  }}
>
  {post.map((item, index) => {
    return (
      <div
        key={index}
        style={{
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          transition: "transform 0.3s ease",
          cursor: "pointer",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.transform = "scale(1.05)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.transform = "scale(1)")
        }
      >
        <img
          src={item.url}
          alt="Uploaded"
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
          }}
        />
        <h4>{item.name}</h4>
      </div>
    );
  })}
</div>
    </div>
  );
};

export default App;