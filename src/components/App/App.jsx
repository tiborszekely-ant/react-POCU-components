import { Routes, Route } from 'react-router-dom';
import { NotFound, HomePage, Login, SignUp } from '../';
import './App.css';
import { AuthContextProvider } from '../../features';

export function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthContextProvider>
  )
}
