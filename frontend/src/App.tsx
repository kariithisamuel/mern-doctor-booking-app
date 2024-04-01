import { BrowserRouter as Router, Route , Routes, Navigate} from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import { useAppContext } from "./contexts/AppContext";
import MyHospitals from "./pages/MyHospitals";
import EditHospital from "./pages/EditHospital";
import AddHospital from "./pages/AddHospital";
import Search from "./pages/Search";
import Detail from "./pages/Detail";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBooking";
import Home from "./pages/Home";

const App = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              <Search/>
            </Layout>
          }
        />
          <Route
          path="/detail/:hospitalId"
          element={
            <Layout>
              <Detail/>
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Layout>
              <SignIn />
            </Layout>
          }
        />
        
        {isLoggedIn && (
          <>
             <Route
              path="/hospital/:hospitalId/booking"
              element={
                <Layout >
                  <Booking/>
                </Layout>
              }
            />

            <Route
              path="/add-hospital"
              element={
                <Layout >
                  <AddHospital/>
                </Layout>
              }
            />
            <Route
              path="/my-hospitals"
              element={
                <Layout >
                  <MyHospitals/>
                </Layout>
              }
            />
            <Route
              path="/edit-hospital/:hospitalId"
              element={
                <Layout >
                  <EditHospital/>
                </Layout>
              }
            />

            <Route
              path="/my-bookings"
              element={
                <Layout>
                  <MyBookings />
                </Layout>
              }
            />
          </>
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
