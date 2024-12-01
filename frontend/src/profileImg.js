import axios from "axios";

const profileImg = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "myrealestate");

  try {
    const res = await axios.post("https://api.cloudinary.com/v1_1/devkpaapb/image/upload", data);

    console.log(res.data);

    const { url } = res.data
    return url;

  } catch (err) {
    console.log(err);
    return null;
  }
}

export default profileImg;