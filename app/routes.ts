import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("contact", "routes/contact.tsx"),
  route("portfolio", "routes/portfolio.tsx"),
  route("portfolio/:slug", "routes/portfolio.$slug.tsx"),
] satisfies RouteConfig;
