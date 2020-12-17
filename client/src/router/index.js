import { createWebHistory, createRouter } from "vue-router";
import Bar from "@/components/Bar.vue";
import Foo from "@/components/Foo.vue";

const routes = [
  {
    path: "/bar",
    name: "Home",
    component: Bar,
  },
  {
    path: "/foo",
    name: "About",
    component: Foo,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
