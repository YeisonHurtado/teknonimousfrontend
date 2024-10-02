import axios from "axios";

let isInterceptorConfigured = false;

const setupAxiosInterceptors = () => {
    if (isInterceptorConfigured) return;

    axios.interceptors.response.use(
        response => response,
        error => {
            if (error.response && error.response.data && error.response.data.status === 401) {
                localStorage.removeItem("token");
                alert("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
                window.location.href = '/login';
            }
            return Promise.reject(error);
        }
    );

    isInterceptorConfigured = true;
};

export default setupAxiosInterceptors;
