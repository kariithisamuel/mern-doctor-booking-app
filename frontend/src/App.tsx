import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import { useAppContext } from "./contexts/AppContext";
import MyHospitals from "./pages/MyHospitals";
import EditHospital from "./pages/EditHospital";
import AddHospital from "./pages/AddHospital";


const App = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><p>Home page</p></Layout>} />
        <Route path="/search" element={<Layout><p>Search Page</p></Layout>} />
        <Route path="/register" element={<Layout><Register /></Layout>} />
        <Route path="/sign-in" element={<Layout><SignIn /></Layout>} />
        
        {isLoggedIn && (
          <>
            <Route path="/add-hospital" element={<Layout><AddHospital /></Layout>} />
            <Route path="/my-hospitals" element={<Layout><MyHospitals /></Layout>} />
            <Route path="/edit-hospital/:hospitalId" element={<Layout><EditHospital /></Layout>} />
          </>
        )}

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
