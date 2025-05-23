// src/App.tsx
import { Suspense } from 'react';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <AppRoutes />
    </Suspense>
  );
}

export default App;
