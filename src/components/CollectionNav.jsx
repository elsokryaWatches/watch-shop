import { Link, useLocation } from "react-router-dom";

export default function CollectionNav() {
  const location = useLocation();

  const buttons = [
    { path: "/gmt", text: "gmt" },
    { path: "/aquanaut", text: "aquanaut" },
    { path: "/daytona", text: "daytona" },
    { path: "/datejust", text: "datejust" },
    { path: "/nautilus", text: "nautilus" },
  ];

  return (
    <div className="navModels col-12">
      {buttons.map((button) => (
        <button
          key={button.path}
          className={`navBtn ${
            location.pathname === button.path ? "selected" : ""
          }`}
        >
          <Link to={button.path}>{button.text}</Link>
        </button>
      ))}
    </div>
  );
}
