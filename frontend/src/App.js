import {Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public';
import Login from './features/auth/Login';
import NotesList from './features/notes/NoteList';
import UsersList from './features/users/UsersList';
import EditUser from './features/users/EditUser';
import NewUserForm from './features/users/NewUserForm';
import EditNote from './features/notes/EditNote';
import NewNote from './features/notes/NewNote';
import Prefetch from './features/auth/prefetch';
import PersistLogin from './features/auth/PersistLogin';
import RequireAuth from './features/auth/RequireAuth';
import { ROLES } from './config/roles';
import useTitle from './hooks/useTitle';

function App() {
  useTitle('Mern stack project')
  return (
    <Routes> 
      <Route path = "/" element = {<Layout/>}>
        {/* public routes */}
        <Route index element = { <Public/>} />
        <Route path = "login" element = {<Login/>} />

        {/* protected routes */}
        <Route element={<PersistLogin/>}>
        <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]}/>}>


        <Route element={<Prefetch/>}>
        <Route path = "dash" element = {<DashLayout />}>
          
          <Route index element={<Welcome/>} />
         
          <Route element={<RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]}/>}>

          <Route path = "users">
            <Route index element = {<UsersList/>} />
            <Route path=":id" element={<EditUser/>}></Route>
            <Route path="new" element={<NewUserForm/>}></Route>
          </Route>
          </Route>

          <Route path = "notes">
            <Route index element = {<NotesList/>} />
            <Route path=":id" element={<EditNote/>}></Route>
            <Route path="new" element={<NewNote/>}></Route>
          </Route>
        </Route>
        </Route>
        </Route>
        </Route> {/* end protected routes */}
      </Route>
    </Routes>
  );
}

export default App;
