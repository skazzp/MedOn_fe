import { Navigate, Route, Routes } from 'react-router-dom';
import ExamplePage from '../pages/ExamplePage';

function App() {
  return (
    <Routes>
      <Route index path="/" element={<ExamplePage />} />
      <Route path="*" element={<Navigate to={'/'} />} />
    </Routes>
  );
}

export default App;
