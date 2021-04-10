import Login from "@pages/login";
import Home from "@pages/home";
export const option = [
  {
    path: "/login",
    component: Login,
    meta: {
      isPublicCom: true,
    },
  },
  {
    path: "/",
    component: Home,
    meta: {},
  },
];
