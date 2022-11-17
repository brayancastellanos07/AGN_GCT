import React from "react";
import { Routes, Route } from "react-router-dom";
import ListCarp from "../pages/users/carpetas";
import LayoutBasic from "../layouts/LayoutBasic";
import ConceptLis from "../pages/users/conceptos";


export function WebRouter() {
  const loadLayout = (Layout, Page) => {
    return (
      <Layout>
        <Page />
      </Layout>
    );
  };

  return (
    <Routes>
      {/* Ruta para listar las carpetas en Card */}
      <>
        <Route path="/" element={loadLayout(LayoutBasic, ListCarp)} />
        <Route
          path="/list-conceptos/:nombre"
          element={loadLayout(LayoutBasic, ConceptLis)}
        />
      </>
    </Routes>
  );
}
