

const tabs = ["Home", "Series", "Films", "New & Popular", "My List", "Browse by Languages"]

export default function NavBar() {
  return (
    <nav className="w-full fixed z-40">
      <div className="px-16 py-6 flex items-center">
        <img
          className="h-16"
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fassets.stickpng.com%2Fimages%2F580b57fcd9996e24bc43c529.png&f=1&nofb=1&ipt=5a57e6f95affd6c6ff40e7a1db2400223a8f4edc8ef2054243701ddccec2b3bf&ipo=images"
          alt="logo"
        />
        <div className="flex gap-7 ml-8">
            {tabs.map(tab => (
                <div key={tab} className="text-white hover:text-gray-300 cursor-pointer">
                    <p>{tab}</p>
                </div>
            ))}
        </div>
      </div>
    </nav>
  );
}
