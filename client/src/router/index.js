import { createWebHistory, createRouter } from "vue-router";
import Home from "@/components/Home.vue";
import Regions from "@/components/Regions.vue";
import Tests from "@/components/Tests.vue";
import TestsDetails from "@/components/TestsDetails.vue";

const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/regions",
    name: "Regions",
    component: Regions,
  },
  {
    path: "/tests",
    name: "Test",
    component: Tests,
  },
  {
    path: "/tests/:id",
    name: "Test details",
    component: TestsDetails,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
