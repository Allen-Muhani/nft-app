import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route(
    "certificate-details/:certificate-id",
    "./routes/certificate.details.tsx"
  ),
  route("mint-certificate", "./routes/mint.nft.page.tsx"),
] satisfies RouteConfig;
