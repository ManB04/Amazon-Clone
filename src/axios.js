import axios from "axios";

const instance = axios.create({
    baseURL:'https://us-central1-clone-83c93.cloudfunctions.net/api'  //API URL taken from firebase/functions
    // baseURL:'http://localhost:5001/clone-83c93/us-central1/api'// API(cloud function) URL from index.js/functions(backend)
});

export default instance;