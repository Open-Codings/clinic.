import { createRouter, createWebHistory } from "vue-router";

import Main from "../layouts/Main.vue";
import Auth from "../layouts/Auth.vue";

import HomeView from "../views/HomeView.vue";
import LoginView from "../views/auth/LoginView.vue";

import MedTableView from "../views/medecines/MedTableView.vue";
import MedAddView from "../views/medecines/MedAddView.vue";
import MedApplicationView from "../views/medecines/MedApplicationView.vue";

import PatAddView from "../views/patients/PatAddView.vue";
import PatPreCheckView from "../views/patients/PatPreCheckView.vue";
import PatTableView from "../views/patients/PatTableView.vue";
import PatConsultationView from "../views/patients/PatConsultationView.vue";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
    beforeEnter: requireAuth,
    children: [
      {
        path: "",
        name: "home",
        component: HomeView,
      },
      {
        path: "/medecine",
        name: "medecine",
        component: MedTableView,
      },
      {
        path: "/medecine/new",
        name: "medecine-create",
        component: MedAddView,
      },
      {
        path: "/medecine/new/edit/:id",
        name: "medecine-edit",
        component: MedAddView,
      },
      {
        path: "/medecine/ask/:id",
        name: "medecine-application",
        component: MedApplicationView,
      },
      {
        path: "/patient",
        name: "patient",
        component: PatTableView,
      },
      {
        path: "/patient/preserve",
        name: "patient-preserve",
        component: PatAddView,
      },
      {
        path: "/patient/:id/precheck",
        name: "patient-precheck",
        component: PatPreCheckView,
      },
      {
        path: "/patient/consultation",
        name: "patient-consultation",
        component: PatConsultationView,
      },
    ],
  },

  {
    path: "/",
    name: "auth",
    component: Auth,
    beforeEnter: preventAuth,
    children: [
      {
        path: "/login",
        name: "login",
        component: LoginView,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

function requireAuth(to, from, next) {
  const token = localStorage.getItem("token");
  if (token) next();
  else next({ name: "login" });
};

function preventAuth (to, from, next) {
  const token = localStorage.getItem("token");
  if (!token) next();
  else next({ name: "home" });
};

export default router;
