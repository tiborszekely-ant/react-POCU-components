import { Routes, Route } from 'react-router-dom';
import { NotFound, HomePage, Login, SignUp } from '../';

export function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
