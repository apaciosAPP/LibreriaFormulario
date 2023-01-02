import routesAdmin from "./Admin";
import routesClient from "./Client";
import { Error404 } from "../pages/Error404";
import { BasicLayout } from "../Layouts";

const routes = [
  ...routesAdmin,
  ...routesClient,
  {
    layout: BasicLayout,
    component: Error404
  }
];

export default routes;
