import axios from 'axios'

const API_ROOT =
    process.env.NODE_ENV === "production"
        ? "/api"
        : "http://localhost:4000/api";

// const WS_URL =
//   process.env.NODE_ENV === "production"
//     ? window.location.origin.replace(/^http/, "ws")
//     : "ws://localhost:4000";

export default axios.create({ baseURL: API_ROOT });
