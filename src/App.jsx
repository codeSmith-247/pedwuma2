import { Routes, Route, useNavigate } from 'react-router-dom';

import Home from './layouts/Home';
import Auth from './layouts/Auth';
import { General, Admin, Workers, Requester } from './pages';
import { AdminLinks, WorkerLinks, RequesterLinks } from "./config/navLinks";

import { useSelector } from 'react-redux';
import { getAuth } from 'firebase/auth';

function App() {

  const role = useSelector((state) => state.general);
  const user = getAuth();

  const navigate = useNavigate();

  const isLoggedIn = () => {
    if(user.currentUser === null) {
      navigate('/login');
      return false;
    }
    
    return true;
  }

  return (
    <Routes>
      <Route path="/"                     element={<Home />}>      
        <Route index                      element={<General.Home               />} />
        <Route path="workers"             element={<General.Workers            />} />
        <Route path="worker/:id"          element={<General.Worker             />} />
        <Route path="jobs"                element={<General.Jobs               />} />
        <Route path="job/:id"             element={<General.Job                />} />
        <Route path="services"            element={<General.Services           />} />
        <Route path="login"               element={<General.Login              />} />
        <Route path="signup"              element={<General.Signup             />} />
        <Route path="password/reset"      element={<General.ResetPassword      />} />
      </Route>

      {(role.role == "Professional Handyman" && isLoggedIn() ) &&
        <Route path="/admin" element={<Auth links={WorkerLinks} />}>
          <Route index                    element={<Workers.Dashbaord />} />
          <Route path="bookings"          element={<Workers.Bookings />} />
          <Route path="booking/:id"       element={<Workers.Booking  />} />
          <Route path="profiles"          element={<Workers.Profiles />} />
          <Route path="profile/new"       element={<Workers.NewProfile />} />
          <Route path="profile/edit/:id"  element={<Workers.EditProfile />} />
          <Route path="jobs"              element={<Workers.Jobs />} />
          <Route path="job/:id"           element={<Workers.Job />} />
        </Route>
      }

    {(role.role == "Regular Customer" && isLoggedIn() ) &&
        <Route path="/admin" element={<Auth links={RequesterLinks} />}>
          <Route index                    element={<Requester.Dashbaord      />} />
          <Route path="bookings"          element={<Requester.Bookings       />} />
          <Route path="booking/:id"       element={<Requester.Booking        />} />
          <Route path="jobs"              element={<Requester.Jobs           />} />
          <Route path="job/new"           element={<Requester.NewJob         />} />
          <Route path="job/edit/:id"      element={<Requester.EditJob        />} />
          <Route path="applications"      element={<Requester.Applications   />} />
          <Route path="application/:id"   element={<Requester.Application    />} />
        </Route>
      }

      {(role.role == "Admin" && isLoggedIn() ) &&
        <Route path="/admin" element={<Auth links={AdminLinks} />}>
          <Route index                 element={<Admin.Dashbaord     />} />
          <Route path="bookings"       element={<Admin.Bookings      />} />
          <Route path="categories"     element={<Admin.Categories    />} />
          <Route path="category/new"   element={<Admin.NewCategory   />} />
          <Route path="category/:id"   element={<Admin.EditCategory  />} />
          <Route path="plans"          element={<Admin.Plans         />} />
          <Route path="plan/new"       element={<Admin.NewPlan       />} />
          <Route path="plan/edit/:id"  element={<Admin.EditPlan      />} />
          <Route path="users"          element={<Admin.Users         />} />
          <Route path="user/:id"       element={<Admin.EditUser      />} />
        </Route>
      }
    </Routes>
  )
}

export default App
