import { AdministradorLayout } from "../Layouts";
import { Usuarios } from "../pages";

const routesAdmin = [
  {
    path: "/admin",
    layout: AdministradorLayout,
    component: Usuarios,
    exact: true
  }
];

export default routesAdmin;
