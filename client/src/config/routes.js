// Layout
import LayoutAdmin from "../layouts/LayoutAdmin";
import LayoutBasic from "../layouts/LayoutBasic";
// Admin Pages
import AdminHome from "../pages/admin";
import AdminSingIn from "../pages/admin/SingIn";

import Home from "../pages/Home";
import Contact from "../pages/Contact"; 

import Error404 from "../pages/Error404";

const routesAdmin = [
    {
        path:"/admin",
        layout: LayoutAdmin,
        component: AdminHome
    },
    {
        path:"/admin/login",
        layout: LayoutAdmin,
        component: AdminSingIn
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
        component: Home,
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