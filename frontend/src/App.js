import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'

import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import RegisterUser from './components/RegisterUser'
import RegisterCompany from './components/RegisterCompany'
import Login from './components/Login'

// Components
import PrivateRoutes from './components/PrivateRoutes'

// Pages
import PurchaseInvoicesPage from './pages/PurchaseInvoicesPage'
import SalesInvoicesPage from './pages/SalesInvoicesPage'
import LogoutPage from './pages/LogoutPage'
import HomePage from './pages/HomePage'
import UploadPage from './pages/UploadPage'
import ProfilePage from './pages/ProfilePage'
import CreateInvoicePage from './pages/CreateInvoicePage'
import Analytics from './pages/AnalyticsPage'

function App() {
  return (
    <main className="flex bg-gray-200 dark:text-gray-200 dark:bg-main-dark-bg main-container">
      <Router>
        <Routes>
          {/* protected routes nest here */}
          <Route path="/*" element={<PrivateRoutes />}>
            <Route index element={<HomePage />} />
            <Route path="sales-invoices" element={<SalesInvoicesPage />} />
            <Route
              path="purchase-invoices"
              element={<PurchaseInvoicesPage />}
            />
            <Route path="new-invoice" element={<CreateInvoicePage />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="upload" element={<UploadPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="logout" element={<LogoutPage />} />
          </Route>

          {/* public routes nest here */}
          <Route path="auth/registerUser" element={<RegisterUser />} />
          <Route path="auth/registerCompany" element={<RegisterCompany />} />
          <Route path="auth/login" element={<Login />} />
        </Routes>
      </Router>
    </main>
  )
}

export default App
