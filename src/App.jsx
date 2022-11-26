import Header from "./components/Header";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import PrivateRoutes from "./routes/PrivateRoutes";
import PublicRoutes from "./routes/PublicRoutes";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Loading from "./components/Loading";
const App = () => {
  const [user, loading] = useAuthState(auth);

  if (loading) return <Loading />;

  return (
    <Router>
      <Header />
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />}></Route>
        </Route>
        <Route element={<PublicRoutes />}>
          <Route path="auth/signin" element={<Login />}></Route>
        </Route>
      </Routes>
    </Router>
  );
};
export default App;
