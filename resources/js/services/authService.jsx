import axios from "axios";

axios.defaults.withCredentials = true;

axios.get("/sanctum/csrf-cookie").then((response) => {
    console.log("CSRF token set");
});

const login = async (email, password) => {
    try {
        const response = await axios.post("/login", { email, password });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Login failed");
    }
};

export { login };
