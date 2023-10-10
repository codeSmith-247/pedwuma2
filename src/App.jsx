import { Routes, Route } from 'react-router-dom';

import Home from './layouts/Home';
import Auth from './layouts/Auth';
import { General, Admin } from './pages';
import { AdminLinks } from "./config/navLinks";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<General.Home />} />
      </Route>

      <Route path="/admin" element={<Auth links={AdminLinks} />}>
        <Route index element={<Admin.Dashbaord />} />
      </Route>
    </Routes>
  )
}

export default App
