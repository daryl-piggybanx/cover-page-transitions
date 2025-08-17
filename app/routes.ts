import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("stacked-scroll", "routes/stacked-scroll.tsx")
] satisfies RouteConfig;
