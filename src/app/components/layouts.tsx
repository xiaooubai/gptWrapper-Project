// components/layouts.tsx
import React from 'react';

import { Sidebar } from './sidebar';
import { TextareaWithButton } from './ui/textArea';
type LayoutProps = {
  children: React.ReactNode;
  showSidebar?: boolean;
};

const Layout: React.FC<LayoutProps> = ({ children, showSidebar = true }) => {
  return (
    <div className='flex h-screen'>
      {showSidebar && (
        <div className='bg-gray-800 w-64 h-full fixed top-0 bottom-0 left-0 p-4 space-y-3'>
          <Sidebar />
        </div>
      )}
      {/* Main content area to the right of the sidebar */}
      <div className={`flex flex-col ${showSidebar ? 'ml-64' : ''} flex-1`}>
        <div className='flex-1 overflow-y-auto p-4'>{children}</div>
        {/* Footer area with textarea, adjust margins to center the text area */}
        <div
          className='w-full px-4 py-2 bg-white shadow'
          style={{ margin: '0 auto', maxWidth: '80%' }}
        >
          <TextareaWithButton />
        </div>
      </div>
    </div>
  );
};

export default Layout;
