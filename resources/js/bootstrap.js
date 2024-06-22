import axios from "axios";
import "./bootstrap";
window.axios = axios;

axios.defaults.withCredentials = true;

axios.defaults.withXSRFToken = true;

window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
