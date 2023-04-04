import ExamplePage from 'pages/ExamplePage';
import ResetPassword from 'pages/ResetPassword';
import { Navigate, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route index path="/" element={<ExamplePage />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="*" element={<Navigate to={'/'} />} />
    </Routes>
  );
}

export default App;
