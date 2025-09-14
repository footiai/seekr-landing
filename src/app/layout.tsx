'use client';

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { Toaster } from 'sonner';
import LoginScreen from "@/components/LoginScreen";
import RegisterScreen from "@/components/RegisterScreen";
import { useEffect } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// This is a new component to handle the auth modals
function AuthModals() {
  const { authModal, hideAuthModals, showLogin, showRegister, isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      hideAuthModals();
    }
  }, [isLoggedIn, hideAuthModals]);

  if (authModal === 'none') {
    return null;
  }

  if (authModal === 'login') {
    return <LoginScreen onClose={hideAuthModals} onShowRegister={showRegister} />;
  }

  if (authModal === 'register') {
    return <RegisterScreen onClose={hideAuthModals} onShowLogin={showLogin} />;
  }

  return null;
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <AuthProvider>
          {children}
          <Toaster theme="dark" />
          <AuthModals />
        </AuthProvider>
      </body>
    </html>
  );
}
