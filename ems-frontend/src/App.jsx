import './App.css'
import FooterComponent from './components/FooterComponent.jsx'
import HeaderComponent from './components/HeaderComponent.jsx'
import ListEmployeeComponent from './components/ListEmployeeComponent.jsx'
import EmployeeComponent from './components/EmployeeComponent.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ListDepartmentComponent from './components/ListDepartmentComponent.jsx'
import DepartmentComponent from './components/DepartmentComponent.jsx'

function App() {

  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          {/* //http://localhost:3000 */}
          <Route path='/' element={<ListEmployeeComponent />}> </Route>

          {/* // http://localhost:3000/employees  */}
          <Route path='/employees' element={<ListEmployeeComponent />}> </Route>

          {/* // http://localhost:3000/add-employee  */}
          <Route path='/add-employee' element={<EmployeeComponent />}> </Route>

          {/* // http://localhost:3000/edit-employee/{id}  */}
          <Route path='/edit-employee/:id' element={<EmployeeComponent />}> </Route>

          {/* // http://localhost:3000/departments  */}
          <Route path='/departments' element={<ListDepartmentComponent />}> </Route>

          {/* // http://localhost:3000/add-department  */}
          <Route path='/add-department' element={<DepartmentComponent />}> </Route>

          {/* // http://localhost:3000/edit-department/{id}  */}
          <Route path='/edit-department/:id' element={<DepartmentComponent />}> </Route>
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  )
}

export default App
