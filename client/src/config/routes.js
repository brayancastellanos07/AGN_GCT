// Layout
import LayoutAdmin from "../layouts/LayoutAdmin";
import LayoutBasic from "../layouts/LayoutBasic";
// Admin Pages

import AdminSingIn from "../pages/admin/SingIn";
import AdminUsers from "../pages/admin/Users";
import AdminRoles from "../pages/admin/Rols"
import AdminCarpetas from"../pages/admin/carpetas"
import Conceptos from "../pages/admin/conceptos";


import Contact from "../pages/Contact"; 
import Error404 from "../pages/Error404";

//Pages Visit
import listConsept from "../pages/users/conceptos"

const routesAdmin = [
    {
        path:"/admin",
        layout: LayoutAdmin,
        component: Conceptos,
     
    },
    {
        path:"/admin/login",
        layout: LayoutAdmin,
        component: AdminSingIn
       
    },
    {
        path:"/admin/list-usuarios",
        layout: LayoutAdmin,
        component: AdminUsers,
        exact: true
    },
    {
        path:"/admin/list-roles",
        layout: LayoutAdmin,
        component: AdminRoles,
        exact: true
    },
    {
        path:"/admin/list-carp",
        layout: LayoutAdmin,
        component: AdminCarpetas,
        exact: true
    },
    {
        path:"*",
        layout:LayoutAdmin,
        component: Error404,
    }
];

const routesClient=[
    {
        path:"/",
        layout: LayoutBasic,
        component: listConsept,
    },
    {
        path:"/contact",
        layout: LayoutBasic,
        component: Contact,
    },
    {
        path:"*",
        layout:LayoutBasic,
        component: Error404,
    }

]

const routes = [...routesAdmin, ...routesClient];

export default routes;