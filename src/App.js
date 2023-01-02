import { Navigation } from "./routes/Navigation";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context";
import "react-toastify/dist/ReactToastify.css";
import "./scss/main.scss";
export default function App() {
  return (
    <AuthProvider>
      <Navigation />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
    </AuthProvider>
  );
}
