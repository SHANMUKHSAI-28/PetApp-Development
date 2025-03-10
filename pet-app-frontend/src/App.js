import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import AnimalShopList from "./components/AnimalShop/AnimalShopList";
import AnimalShopDetails from "./components/AnimalShop/AnimalShopDetails";
import ProductList from "./components/Product/ProductList";
import ProductDetails from "./components/Product/ProductDetails";
import ProductCreate from "./components/Product/ProductCreate";
import ProductEdit from "./components/Product/ProductEdit";
import CrossingList from "./components/Crossing/CrossingList";
import CrossingDetails from "./components/Crossing/CrossingDetails";
import CrossingCreate from "./components/Crossing/CrossingCreate";
import CrossingEdit from "./components/Crossing/CrossingEdit";
import AdminDashboard from "./pages/AdminDashboard";
import VendorDashboard from "./pages/VendorDashboard";
import ClientDashboard from "./pages/ClientDashboard";
import DriverDashboard from "./pages/DriverDashboard";
import AddVendor from "./components/Admin/AddVendor";
import ManageUsers from "./components/Admin/ManageUsers";
import AddPet from "./components/Vendor/AddPet";
import ManagePets from "./components/Vendor/ManagePets";
import OrderPets from "./components/Client/OrderPets";
import ViewMatingDetails from "./components/Client/ViewMatingDetails";
import DeliveryList from "./components/Driver/DeliveryList";
import { AuthContext } from "./context/AuthContext";

// Function to create a protected route
const ProtectedRoute = ({ allowedUserTypes, children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
        // Not logged in, redirect to login page
        return <Navigate to="/login" />;
    }

    if (allowedUserTypes && !allowedUserTypes.includes(user.userType)) {
        // Logged in, but not the correct role, redirect to forbidden page or home
        return <Navigate to="/" />; // Or a dedicated "Forbidden" page
    }

    // Authorized, render the children
    return children;
};

function App() {
    return (
        <div>
            <Navbar />
            <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Home />} />

                {/* Admin Routes */}
                <Route path="/admin" element={<ProtectedRoute allowedUserTypes={["Admin"]}><AdminDashboard /></ProtectedRoute>} />
                <Route path="/admin/add-vendor" element={<ProtectedRoute allowedUserTypes={["Admin"]}><AddVendor /></ProtectedRoute>} />
                <Route path="/admin/manage-users" element={<ProtectedRoute allowedUserTypes={["Admin"]}><ManageUsers /></ProtectedRoute>} />

                {/* Vendor Routes */}
                <Route path="/vendor" element={<ProtectedRoute allowedUserTypes={["Vendor"]}><VendorDashboard /></ProtectedRoute>} />
                <Route path="/vendor/add-pet" element={<ProtectedRoute allowedUserTypes={["Vendor"]}><AddPet /></ProtectedRoute>} />
                <Route path="/vendor/manage-pets" element={<ProtectedRoute allowedUserTypes={["Vendor"]}><ManagePets /></ProtectedRoute>} />

                {/* Client Routes */}
                <Route path="/client" element={<ProtectedRoute allowedUserTypes={["Client"]}><ClientDashboard /></ProtectedRoute>} />
                <Route path="/client/order-pets" element={<ProtectedRoute allowedUserTypes={["Client"]}><OrderPets /></ProtectedRoute>} />
                <Route path="/client/view-mating-details" element={<ProtectedRoute allowedUserTypes={["Client"]}><ViewMatingDetails /></ProtectedRoute>} />

                {/* Driver Routes */}
                <Route path="/driver" element={<ProtectedRoute allowedUserTypes={["Driver"]}><DriverDashboard /></ProtectedRoute>} />
                <Route path="/driver/delivery-list" element={<ProtectedRoute allowedUserTypes={["Driver"]}><DeliveryList /></ProtectedRoute>} />

                {/* Animal Shop Routes - These might need role-based protection too */}
                <Route path="/animalshops" element={<AnimalShopList />} />
                <Route path="/animalshops/:id" element={<AnimalShopDetails />} />

                {/* Product Routes */}
                <Route path="/products" element={<ProductList />} />
                <Route path="/products/:id" element={<ProductDetails />} />
                <Route path="/products/create" element={<ProtectedRoute allowedUserTypes={["Vendor", "Admin"]}><ProductCreate /></ProtectedRoute>} />
                <Route path="/products/edit/:id" element={<ProtectedRoute allowedUserTypes={["Vendor", "Admin"]}><ProductEdit /></ProtectedRoute>} />

                {/* Crossing Routes */}
                <Route path="/crossings" element={<CrossingList />} />
                <Route path="/crossings/:id" element={<CrossingDetails />} />
                <Route path="/crossing/create" element={<ProtectedRoute allowedUserTypes={["Vendor", "Admin"]}><CrossingCreate /></ProtectedRoute>} />
                <Route path="/crossing/edit/:id" element={<ProtectedRoute allowedUserTypes={["Vendor", "Admin"]}><CrossingEdit /></ProtectedRoute>} />
            </Routes>
        </div>
    );
}

export default App;