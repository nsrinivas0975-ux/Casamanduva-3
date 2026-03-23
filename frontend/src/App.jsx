import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ErrorBoundary from "./components/ErrorBoundary";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import NotificationBanner from "./components/NotificationBanner";
import ExitIntentPopup from "./components/ExitIntentPopup";
import StickyActionBar from "./components/StickyActionBar";
import LiveActivityFeed from "./components/LiveActivityFeed";
import OfferBanner from "./components/OfferBanner";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import Estimator from "./pages/Estimator";
import NotFound from "./pages/NotFound";

import "./App.css";

function App() {
  // Visitor tracking is now handled by Google Analytics (gtag).
  // No API call needed here.

  return (
    <ErrorBoundary>
      <Router>
        <div className="app">
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: { background: "#2C2C2C", color: "#fff" },
              success: {
                iconTheme: { primary: "#C9A96E", secondary: "#fff" },
              },
            }}
          />

          <OfferBanner />
          <NotificationBanner />
          <Header />

          <main className="main-content">
            <Routes>
              <Route path="/"          element={<Home />} />
              <Route path="/about"     element={<About />} />
              <Route path="/services"  element={<Services />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/contact"   element={<Contact />} />
              <Route path="/estimator" element={<Estimator />} />
              <Route path="*"          element={<NotFound />} />
            </Routes>
          </main>

          <Footer />
          <WhatsAppButton />
          <ExitIntentPopup />
          <StickyActionBar />
          <LiveActivityFeed />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
