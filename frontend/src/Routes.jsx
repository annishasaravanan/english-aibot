import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import Header from "components/ui/Header";
import Sidebar from "components/ui/Sidebar";

// Page imports
import AuthenticationLoginRegister from "pages/authentication-login-register";
import PersonalizedDashboard from "pages/personalized-dashboard";
import AiChatInterface from "pages/ai-chat-interface";
import VocabularyLearningHub from "pages/vocabulary-learning-hub";
import GrammarCorrectionTool from "pages/grammar-correction-tool";
import UserProfileSettings from "pages/user-profile-settings";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <div className="min-h-screen bg-background">
          <Header />
          <Sidebar />
          <RouterRoutes>
            <Route path="/" element={<AuthenticationLoginRegister />} />
            <Route path="/authentication-login-register" element={<AuthenticationLoginRegister />} />
            <Route path="/personalized-dashboard" element={<PersonalizedDashboard />} />
            <Route path="/ai-chat-interface" element={<AiChatInterface />} />
            <Route path="/vocabulary-learning-hub" element={<VocabularyLearningHub />} />
            <Route path="/grammar-correction-tool" element={<GrammarCorrectionTool />} />
            <Route path="/user-profile-settings" element={<UserProfileSettings />} />
          </RouterRoutes>
        </div>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;