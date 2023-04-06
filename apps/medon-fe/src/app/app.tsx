import ExamplePage from 'pages/ExamplePage';
import RegistrationPage from 'pages/RegistrationPage';
import { Navigate, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route index path="/" element={<ExamplePage />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="*" element={<Navigate to={'/'} />} />
    </Routes>
  );
}

export default App;
