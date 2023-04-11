import ExamplePage from 'pages/ExamplePage';
import ProfilePage from 'pages/ProfilePage';
import { Navigate, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route index path="/" element={<ExamplePage />} />
      <Route path="*" element={<Navigate to={'/'} />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
}

export default App;
