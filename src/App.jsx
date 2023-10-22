import { Routes, Route } from 'react-router-dom';

import Home from './layouts/Home';
import Auth from './layouts/Auth';
import { General, Admin, Workers } from './pages';
import { AdminLinks, WorkerLinks } from "./config/navLinks";

import { useSelector } from 'react-redux';

function App() {

  const role = useSelector((state) => state.general);

  console.log(role);

  return (
    <Routes>
      <Route path="/"                     element={<Home />}>      
        <Route index                      element={<General.Home               />} />
        <Route path="workers"             element={<General.Workers            />} />
        <Route path="worker"              element={<General.Worker             />} />
        <Route path="jobs"                element={<General.Jobs               />} />
        <Route path="job"                 element={<General.Job                />} />
        <Route path="services"            element={<General.Services           />} />
        <Route path="login"               element={<General.Login              />} />
        <Route path="signup"              element={<General.Signup             />} />
        <Route path="password/reset"      element={<General.ResetPassword      />} />
      </Route>

      {role.role == "Professional Handyman" && 
        <Route path="/admin" element={<Auth links={WorkerLinks} />}>
          <Route index                 element={<Workers.Dashbaord />} />
          <Route path="bookings"       element={<Admin.Bookings />} />
          <Route path="profiles"       element={<Workers.Profiles />} />
          <Route path="profile/new"    element={<Workers.NewProfile />} />
          <Route path="plans"          element={<Admin.Plans />} />
          <Route path="plan/new"       element={<Admin.NewPlan />} />
          <Route path="plan/edit/:id"  element={<Admin.EditPlan />} />
        </Route>
      }

      {role.role == "Admin" &&
        <Route path="/admin" element={<Auth links={AdminLinks} />}>
          <Route index                 element={<Admin.Dashbaord     />} />
          <Route path="bookings"       element={<Admin.Bookings      />} />
          <Route path="categories"     element={<Admin.Categories    />} />
          <Route path="category/new"   element={<Admin.NewCategory   />} />
          <Route path="plans"          element={<Admin.Plans         />} />
          <Route path="plan/new"       element={<Admin.NewPlan       />} />
          <Route path="plan/edit/:id"  element={<Admin.EditPlan      />} />
        </Route>
      }
    </Routes>
  )
}

export default App
