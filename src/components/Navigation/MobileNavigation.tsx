// mobile navigation dropmenu
export default function MobileNavigation() {
  return (
    <div className="hidden sm:hidden">
      <div className="px-2 pt-2 pb-3 space-y-1">
        <a
          href="#"
          className="bg-gray-300 text-white block px-3 py-2 rounded-md text-base font-medium"
        >
          Dashboard
        </a>
        <a
          href="#"
          className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
        >
          Team
        </a>
        <a
          href="#"
          className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
        >
          Projects
        </a>
        <a
          href="#"
          className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
        >
          Calendar
        </a>
      </div>
    </div>
  );
}
