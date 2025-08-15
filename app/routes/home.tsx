import type { Route } from "./+types/home";
import { CoverPage } from "../cover-page/cover-page";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Cover Page Transitions" },
    { name: "description", content: "Cover Page Transitions" },
  ];
}

export default function Home() {
  return <CoverPage />;
}
