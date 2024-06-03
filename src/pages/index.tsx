// src/pages/index.tsx
import React from 'react';

import Layout from '../app/components/layouts'; // Adjust the import path according to your project structure

const HomePage = () => {
  return (
    <Layout showSidebar={true}>
      <h1 className='text-2xl font-bold text-center p-4'></h1>
    </Layout>
  );
};

export default HomePage;
