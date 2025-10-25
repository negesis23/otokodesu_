
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="container mx-auto max-w-7xl flex flex-col min-h-screen">
      <main className="flex-grow">{children}</main>
      <footer className="text-center p-6 text-text/50 text-sm">
        <p>Otokodesu &copy; {new Date().getFullYear()}. All rights reserved.</p>
        <p className="mt-1">This site does not store any files on its server. All contents are provided by non-affiliated third parties.</p>
      </footer>
    </div>
  );
};

export default Layout;