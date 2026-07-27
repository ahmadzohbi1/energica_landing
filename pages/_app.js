import "../styles/globals.css";
import { useRouter } from "next/router";
import Tweaks from "../components/Tweaks";

const PAGE_ID_BY_ROUTE = {
  "/": "holding",
  "/power-solutions": "power",
  "/steel": "steel",
  "/power-generations": "gen",
  "/constructions": "constr",
  "/facilities": "fac",
  "/store": "store",
};

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const pageId = PAGE_ID_BY_ROUTE[router.pathname] || "holding";
  return (
    <>
      <Component {...pageProps} />
      <Tweaks pageId={pageId} />
    </>
  );
}
