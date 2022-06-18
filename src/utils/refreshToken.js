import axios from "axios";
import jwt_decode from "jwt-decode";

const refreshToken = async () => {
  try {
    const response = await axios.get(`http://localhost:5000/users/token`);
    const decoded = jwt_decode(response.data.accessToken);
    return decoded;
  } catch (error) {
    // console.log(error);
  }
};

export { refreshToken };
