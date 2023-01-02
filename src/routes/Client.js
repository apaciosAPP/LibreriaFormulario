import { BasicLayout } from "../Layouts";
import { LoginAdmin } from "../pages/LoginAdmin";

const routesClient = [
  {
    path: "/",
    layout: BasicLayout,
    component: LoginAdmin,
    exact: true
  }
];

export default routesClient;
