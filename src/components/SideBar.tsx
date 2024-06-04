import { clear } from "localforage";
import { Link } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

type SideBarItem = {
  id: string;
  path: string;
  title: string;
};

const sidebarItems: Array<SideBarItem> = [
  { id: "home", path: "/", title: "Home" },
  { id: "favorites", path: "favorites", title: "Favorites" },
];

const SideBarItem = ({ item }: { item: SideBarItem }) => {
  return (
    <Link
      id={item.id}
      className="p-2 hover:bg-slate-200 rounded-md"
      to={item.path}
    >
      {item.title}
    </Link>
  );
};

export const SideBar = () => {
  return (
    <div className="lg:block lg:col-span-3 xl:col-span-2">
      <nav
        aria-label="Sidebar"
        className="sticky top-4 divide-y divide-gray-300"
      >
        <div className="pb-8 space-y-2 flex flex-col">
          {sidebarItems.map((item) => (
            <Fragment key={item.id}>
              <SideBarItem item={item} />
            </Fragment>
          ))}
        </div>
        <button onClick={async() => { await clear() }}>clear</button>
      </nav>
    </div>
  );
};

export default SideBar;
