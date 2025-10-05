const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-6 h-6 bg-primary-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">ES</span>
            </div>
            <span className="text-lg font-semibold">EcoSnap</span>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-gray-300 text-sm">
              © 2025 EcoSnap. Making communities cleaner, one report at a time.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
