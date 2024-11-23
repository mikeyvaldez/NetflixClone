import { RootState } from "../app/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useAuth from "../hooks/useAuth";

const tabs = [
  "Home",
  "Series",
  "Films",
  "New & Popular",
  "My List",
  "Browse by Languages",
];

export default function NavBar() {
  const { user, isLoading } = useSelector(
    (state: RootState) => state.user.value
  );

  const { logout } = useAuth()

  const [showBackground, setShowBackground] = useState(false);

  // when scrolling down make navbar turn black and opaic
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    });
  }, []);

  return (
    <nav className="w-full fixed z-40">
      <div
        className={`px-16 py-6 flex items-center ${
          showBackground ? "bg-black bg-opacity-90" : null
        }`}
      >
        <img
          className="h-16"
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fassets.stickpng.com%2Fimages%2F580b57fcd9996e24bc43c529.png&f=1&nofb=1&ipt=5a57e6f95affd6c6ff40e7a1db2400223a8f4edc8ef2054243701ddccec2b3bf&ipo=images"
          alt="logo"
        />
        <div className="flex gap-7 ml-8 mr-auto">
          {tabs.map((tab) => (
            <div
              key={tab}
              className="text-white hover:text-gray-300 cursor-pointer"
            >
              <p>{tab}</p>
            </div>
          ))}
        </div>
        {user && !isLoading && (
          <div>
            <div className="text-white hover:text-gray-300 cursor-pointer ml-auto">
              <p onClick={logout}>Logout</p>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
