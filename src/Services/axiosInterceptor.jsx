import axios from "axios"

const instance = axios.create({
  baseURL: "https://aseapp-19127165-19127423.herokuapp.com/",
  timeout: 2000
})

export default instance
