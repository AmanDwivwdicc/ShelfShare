import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { BooksProvider } from "./context/BooksContext";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import AddBookPage from "./pages/AddBookPage";
import BookDetailsPage from "./pages/BookDetailsPage";

export default function App() {
  return (
    <AuthProvider>
      <BooksProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/add-book" element={<AddBookPage />} />
              <Route path="/book/:id" element={<BookDetailsPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </BooksProvider>
    </AuthProvider>
  );
}
