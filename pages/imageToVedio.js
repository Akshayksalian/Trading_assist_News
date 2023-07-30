import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { useState } from "react";

function ImageToVedio() {
  const [imageFile, setImageFile] = useState({});
  const [soundFile, setSoundFile] = useState({});

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    console.log(file);
  };

  return (
    <div>
      <input
        type="file"
        id="image"
        accept="image/*"
        onChange={handleChangeImage}
      ></input>
    </div>
  );
}

export default ImageToVedio;
