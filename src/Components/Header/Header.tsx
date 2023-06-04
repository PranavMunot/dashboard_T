import { useLocation } from "react-router-dom";
export default function Header() {
  const loc = useLocation();

  return (
    <header className="w-full bg-sky-900">
      <h1 className="text-xl p-3 text-center text-sky-800 bg-sky-200">
        {loc.pathname.split("/").includes("contact")
          ? "Contact Page"
          : "Charts and Maps"}
      </h1>
    </header>
  );
}
