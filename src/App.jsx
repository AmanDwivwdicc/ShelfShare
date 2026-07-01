import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { BooksProvider } from "./context/BooksContext";

import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import AddBookPage from "./pages/AddBookPage";
import BookDetailsPage from "./pages/BookDetailsPage";
import MyListingsPage from "./pages/MyListingsPage";
import NotificationsPage from "./pages/NotificationsPage";

export default function App() {

  return (
    <AuthProvider>

      <BooksProvider>

        <BrowserRouter>

          <Routes>

            {/* Public Routes */}

            <Route 
              path="/" 
              element={<LandingPage />} 
            />

            <Route 
              path="/login" 
              element={<LoginPage />} 
            />

            <Route 
              path="/signup" 
              element={<SignupPage />} 
            />


            {/* Protected Routes */}

            <Route element={<ProtectedRoute />}>

              <Route element={<Layout />}>

                <Route 
                  path="/dashboard" 
                  element={<DashboardPage />} 
                />

                <Route 
                  path="/add-book" 
                  element={<AddBookPage />} 
                />

                <Route 
                  path="/book/:id" 
                  element={<BookDetailsPage />} 
                />
                <Route 
  path="/my-listings" 
  element={<MyListingsPage />} 
/>
<Route
 path="/notifications"
 element={<NotificationsPage />}
/>

              </Route>

            </Route>


          </Routes>

        </BrowserRouter>

      </BooksProvider>

    </AuthProvider>
  );
}