import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("stacked-scroll", "routes/stacked-scroll.tsx"),
    route("logo-3d", "routes/logo-3d.tsx"),
    route("sword-vert-scroll", "routes/sword-vert-scroll.tsx")
] satisfies RouteConfig;
