import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import AdminSingIn from "../pages/admin/SingIn";
import LayoutAdmin from "../layouts/LayoutAdmin";
import { useAuth } from "../hooks";
import CarpconceptosAdmin from "../pages/admin/Carpconceptos";
import AdminRoles from "../pages/admin/Rols";
import AdminUsers from "../pages/admin/Users";
import AdminCarpetas from "../pages/admin/carpetas";
import ConceptosAdmin from "../pages/admin/conceptos";
import Error404 from "../pages/Error404";

export function AdminRouter() {
  const { user, isLoading } = useAuth();
  const [isadmin, setisadmin] = useState(false);
  useEffect(() => {
    if (user === null) {
      setisadmin(false);
    } else {
      const rol = user.rol;
      if (rol === 1) {
        setisadmin(true);
      } else {
        setisadmin(false);
      }
    }
  }, [user]);
  console.log(isadmin);

  const loadLayout = (Layout, Page) => {
    return (
      <Layout>
        <Page />
      </Layout>
    );
  };

  return (
    <Routes>
      {!user && !isLoading ? (
        // Ruta para el login si el usuario no esta logueado
        <Route path="/admin/*" element={loadLayout(LayoutAdmin, AdminSingIn)} />
      ) : isadmin ? (
        // Ruta para listar las carpetas en las Card del lobby
        <>
          <Route
            path="/admin/carpetaslobby"
            element={loadLayout(LayoutAdmin, CarpconceptosAdmin)}
          />

          {/* Ruta para listar los usuarios  */}
          <Route
            path="/admin/list-usuarios"
            element={loadLayout(LayoutAdmin, AdminUsers)}
          />

          {/* Ruta para listar los roles */}
          <Route
            path="/admin/list-roles"
            element={loadLayout(LayoutAdmin, AdminRoles)}
          />

          {/* Ruta para listar las carpetas */}
          <Route
            path="/admin/list-carp"
            element={loadLayout(LayoutAdmin, AdminCarpetas)}
          />

          {/* Ruta para listar los conceptos segun el año */}
          <Route
            path="/admin/list-conceptos/:nombre"
            element={loadLayout(LayoutAdmin, ConceptosAdmin)}
          />

          {/* Ruta de error  */}
          <Route path="*" element={loadLayout(LayoutAdmin, Error404)} />
        </>
      ) : (
        // Ruta para listar las carpetas en las Card del lobbyo
        <>
          <Route
            path="/admin/carpetaslobby"
            element={loadLayout(LayoutAdmin, CarpconceptosAdmin)}
          />
          {/*  Ruta para listar las carpetas  */}
          <Route
            path="/admin/list-carp"
            element={loadLayout(LayoutAdmin, AdminCarpetas)}
          />

          {/* Ruta para listar los conceptos segun el año */}
          <Route
            path="/admin/list-conceptos/:nombre"
            element={loadLayout(LayoutAdmin, ConceptosAdmin)}
          />

          {/* Ruta de error  */}
          <Route path="*" element={loadLayout(LayoutAdmin, Error404)} />
        </>
      )}
    </Routes>
  );
}
