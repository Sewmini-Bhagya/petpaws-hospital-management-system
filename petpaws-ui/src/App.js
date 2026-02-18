import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

/* Pages */
import Home from "./Home";
import Login from "./Login";
import CreateAccount from "./CreateAccount";
import PetPawsContact from "./ContactAndHelp";

/* Dashboards */
import ClientDashboard from "./pages/ClientDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import VetDashboard from "./pages/VetDashboard";
import ReceptionistDashboard from "./pages/ReceptionistDashboard";

/* Client Features */
import BookAppointment from "./BookAppointment";
import MyAppointments from "./pages/MyAppointments";
import EditProfile from "./pages/EditProfile";
import AddPet from "./pages/AddPet";


/* Other */
import Reports from "./Reports";
import PetPawsBilling from "./PetPawsBilling";

/* Auth */
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/contact-help" element={<PetPawsContact />} />

        {/* CLIENT */}
        <Route
          path="/client"
          element={
            <ProtectedRoute allowedRoles={["client"]}>
              <ClientDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/client/book-appointment"
          element={
            <ProtectedRoute allowedRoles={["client"]}>
              <BookAppointment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/client/appointments"
          element={
            <ProtectedRoute allowedRoles={["client"]}>
              <MyAppointments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <ProtectedRoute allowedRoles={["client"]}>
              <EditProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/client/add-pet"
          element={
            <ProtectedRoute allowedRoles={["client"]}>
              <AddPet />
            </ProtectedRoute>
          }
        />


        {/* ADMIN */}
        <Route
  path="/admindashboard"
  element={
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>


        {/* VET */}
        <Route
          path="/vet"
          element={
            <ProtectedRoute allowedRoles={["veterinarian"]}>
              <VetDashboard />
            </ProtectedRoute>
          }
        />

        {/* RECEPTIONIST */}
        <Route
          path="/receptionist"
          element={
            <ProtectedRoute allowedRoles={["receptionist"]}>
              <ReceptionistDashboard />
            </ProtectedRoute>
          }
        />

        {/* MANAGEMENT */}
        <Route
          path="/billing"
          element={
            <ProtectedRoute allowedRoles={["admin", "receptionist"]}>
              <PetPawsBilling />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Reports />
            </ProtectedRoute>
          }
        />

        {/* FALLBACK */}
        <Route
          path="*"
          element={
            <div className="min-h-screen flex flex-col items-center justify-center">
              <h1 className="text-3xl font-bold text-teal-700">
                404 – Page Not Found
              </h1>
              <Link to="/" className="text-teal-600 underline mt-4">
                Go back Home
              </Link>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}
