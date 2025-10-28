import React from 'react';
import GlobalHeader from './GlobalHeader';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="container mx-auto max-w-7xl flex flex-col min-h-screen">
      <GlobalHeader />
      <main className="flex-grow pt-24">{children}</main>
      <footer className="text-center p-8 mt-16 text-on-surface-variant text-sm">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-outline-variant/30 to-transparent mb-8"></div>
        <p className="font-semibold text-lg text-on-surface/80 mb-2">Otokodesu</p>
        <p>&copy; {new Date().getFullYear()}. All rights reserved.</p>
        <p className="mt-2 max-w-2xl mx-auto">This site does not store any files on its server. All contents are provided by non-affiliated third parties.</p>
      </footer>
    </div>
  );
};

export default Layout;