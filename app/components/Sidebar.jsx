"use client";
import { logoutUser } from "../../utils/api";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { TbLogout2 } from "react-icons/tb";
import { TbLayoutDashboard } from "react-icons/tb";
import {
  MdOutlinePayments,
  MdHistory,
  MdOutlineSwitchAccount,
} from "react-icons/md";

const navLinks = [
  {
    label: "Dashboard",
    href: "/pages/user/dashboard",
    icon: <TbLayoutDashboard className="text-2xl" />,
  },
  {
    label: "Start Donation",
    href: "/pages/user/start-donation",
    icon: <MdOutlinePayments className="text-2xl" />,
  },
  {
    label: "Donation History",
    href: "/pages/user/donation-history",
    icon: <MdHistory className="text-2xl" />,
  },
  {
    label: "My Profile",
    href: "/pages/user/profile",
    icon: <MdOutlineSwitchAccount className="text-2xl" />,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const isActive = (href) => pathname == href;
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const res = await logoutUser();
      if (res.success) {
        router.push("/");
      } else if (res.error) {
        notify(res.message);
      }
    } catch (err) {
      Error("Logout error:", err);
    }
  };

  return (
    <aside className="w-64 bg-blue-950 text-white p-6 space-y-8">
      <div className="text-3xl text-purple-100 font-bold">DaanMitra</div>
      <div className="flex flex-col flex-wrap gap-80">
        <nav className="flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2 rounded-lg flex flex-row items-center justify-between transition-colors ${
                isActive(link.href)
                  ? "bg-purple-100 text-purple-950 font-semibold "
                  : "hover:bg-blue-900"
              }`}
            >
              {link.label}
              {link.icon}
            </Link>
          ))}
        </nav>
        <div className="flex mt-2">
          <button
            onClick={handleLogout}
            className="flex flex-row flex-wrap justify-center items-center font-semibold bg-indigo-700 hover:bg-indigo-600 text-purple-100 hover:text-purple-100 px-16 py-2 rounded-xl transition-all duration-900 "
          >
            <TbLogout2 className="text-xl mr-2" /> Logout
          </button>
        </div>
      </div>
    </aside>
  );
}
