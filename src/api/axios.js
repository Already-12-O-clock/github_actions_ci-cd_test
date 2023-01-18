import axios from "axios";

// export default axios.create({
//   baseURL: "https://api.openweathermap.org/data/2.5",
// });

export const getAPIData = async (APIKeyword) => {
  try {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${APIKeyword.city}&appid=${APIKeyword.key}`
    );
    return res;
  } catch (err) {
    if (err.response) {
      // 응답코드 2xx가 아닌 경우
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
    } else {
      console.log(`Error: ${err.message}`);
    }
  }
};
