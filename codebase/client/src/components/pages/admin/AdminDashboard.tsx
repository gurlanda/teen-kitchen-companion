import { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { paths } from 'src';

const AdminDashboard = (): JSX.Element => {
  const navigate = useNavigate();
  useEffect(() => {
    const currentUrl = new URL(document.location.href);
    if (currentUrl.pathname === paths.admin.index) {
      navigate(paths.admin.default);
    }
  }, []);

  return (
    <div className="h-full font-body text-lg flex">
      <div className="h-full border-r-2 border-gray-300 px-10 w-[min(25%,350px)] flex flex-col gap-4">
        <h1 className="font-heading font-bold text-5xl">Admin Dashboard</h1>
        <div className="flex flex-col gap-1">
          <AdminNavLink to={paths.admin.editMenus}>Edit menus</AdminNavLink>
          <AdminNavLink to={paths.admin.addAdmin}>Add a new admin</AdminNavLink>
        </div>
      </div>
      <div className="h-full grow pt-5">
        <Outlet />
      </div>
    </div>
  );
};

const AdminNavLink = ({
  to,
  children,
}: {
  to: string;
  children: string;
}): JSX.Element => {
  const className = 'px-4 py-1 border border-transparent';
  const inactive = {
    className: 'hover:border-gray-200 hover:bg-gray-200 hover:rounded-md',
  };
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? `bg-brand-teal text-white border rounded-md ${className}`
          : `${className} ${inactive.className}`
      }
    >
      {children}
    </NavLink>
  );
};

export default AdminDashboard;
