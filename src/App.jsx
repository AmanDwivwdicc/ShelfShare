import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

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
import ChatPage from "./pages/ChatPage";
import ChatsPage from "./pages/ChatsPage";

import { useAuth } from "./context/AuthContext";

function HomeRedirect() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null;

  return isAuthenticated ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <LandingPage />
  );
}

export default function App() {

  return (
    <AuthProvider>

      <BooksProvider>

        <BrowserRouter>

          <Routes>

            {/* Public Routes */}

            <Route
  path="/"
  element={<HomeRedirect />}
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
<Route
 path="/chat/:id"
 element={<ChatPage/>}
/>
<Route
path="/chats"
element={<ChatsPage/>}
/>

              </Route>

            </Route>


          </Routes>

        </BrowserRouter>

      </BooksProvider>

    </AuthProvider>
  );
}