import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Registro from "./pages/registro";
import Inicio from "./pages/inicio";
import Login from "./pages/Login";
import Servicios from "./pages/servicios";
import Gestionar from "./pages/gestionarservicio";
import Agregar from "./pages/agregarservicio";
import Editar from "./pages/editarservicio";
import Error from "./pages/error";
import Realizados from "./pages/serviciosrealizados";


//requiredRoles 1 es administrador, 0 es mecánico
function App() {
  const router = createBrowserRouter([
    {
      path: "/registro",
      element: <ProtectedRoute element={<Registro />} path="/registro" requiredRoles={[1]} />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: <Inicio />,
    },
    {
      path: "/servicios",
      element: <ProtectedRoute element={<Servicios />} path="/servicios" requiredRoles={[0, 1]} />,
    },
    {
      path: "/gestionar",
      element: <ProtectedRoute element={<Gestionar />} path="/gestionar" requiredRoles={[1]} />,
    },
    {
      path: "/editar",
      element: <ProtectedRoute element={<Editar />} path="/editar" requiredRoles={[1]} />,
    },
    {
      path: "/agregar",
      element: <ProtectedRoute element={<Agregar />} path="/agregar" requiredRoles={[1]} />,
    },
    {
      path: "/realizados",
      element: <ProtectedRoute element={<Realizados />} path="/realizados" requiredRoles={[0, 1]} />,
    },
    {
      path: "/*",
      element: <Error />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
