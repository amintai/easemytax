
'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Menu,
  X,
  ChevronDown,
  FileText,
  Calculator,
  DollarSign,
  Briefcase,
  ScrollText,
  BadgeCheck,
  PiggyBank,
  GraduationCap,
  BarChart,
  FileSpreadsheet
} from 'lucide-react';

// Custom hook to detect if on mobile
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  return isMobile;
};

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const submenuRef = useRef(null);
  const isMobile = useIsMobile();

  const navLinks = [
    {
      label: 'Our Services',
      path: '/our-services',
      hasSubmenu: true,
      submenu: [
        { label: 'Project Reports', path: '/our-services/project-reports', icon: FileText },
        { label: 'Financial Planning', path: '/our-services/financial-planning', icon: Calculator },
        { label: 'Investment Advisory', path: '/our-services/investment-advisory', icon: DollarSign },
        { label: 'Business Setup', path: '/our-services/business-setup', icon: Briefcase },
      ]
    },
    {
      label: 'Tax & Compliance',
      path: '/tax-planning-consultancy',
      hasSubmenu: true,
      submenu: [
        { label: 'Tax Filing', path: '/tax-planning-consultancy/tax-filing', icon: ScrollText },
        { label: 'Compliance Services', path: '/tax-planning-consultancy/compliance', icon: BadgeCheck },
        { label: 'Tax Planning', path: '/tax-planning-consultancy/planning', icon: PiggyBank },
      ]
    },
    { label: 'Pricing', path: '/pricing', hasSubmenu: false },
    {
      label: 'Resources',
      path: '/our-resources',
      hasSubmenu: true,
      submenu: [
        { label: 'Guides', path: '/our-resources/guides', icon: GraduationCap },
        { label: 'Reports', path: '/our-resources/reports', icon: BarChart },
        { label: 'Templates', path: '/our-resources/templates', icon: FileSpreadsheet },
      ]
    },
  ];

  const isActive = (path) => {
    return location.pathname.includes(path);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setActiveSubmenu(null);
  };

  const toggleSubmenu = (path) => {
    if (activeSubmenu === path) {
      setActiveSubmenu(null);
    } else {
      setActiveSubmenu(path);
    }
  };


  // Close submenu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if(!submenuRef.current) {
        setActiveSubmenu(null);
      }
      if (submenuRef.current && !submenuRef.current.contains(event.target)) {
        setActiveSubmenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="container mx-auto px-4 flex justify-between items-center sticky top-0 z-50 bg-white shadow-md h-20">
      {/* Logo */}
      <img
        className="md:hidden lg:inline-flex cursor-pointer"
        src="/images/logo-full.svg"
        alt="Logo"
        width="180"
        onClick={() => navigate('/')}
      />
      <img
        className="hidden md:inline-block lg:hidden cursor-pointer"
        src="/images/logo.svg"
        alt="Logo Icon"
        width="45"
        onClick={() => navigate('/')}
      />

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center space-x-3 lg:space-x-8">
        {navLinks.map((link) => (
          <div key={link.path} className="relative group">
            {link.hasSubmenu ? (
              <button
                onClick={() => toggleSubmenu(link.path)}
                className={`flex items-center gap-1 ${isActive(link.path) ? 'font-bold text-green-600' : ''
                  }`}
                  id={link.path}
              >
                {link.label}
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${activeSubmenu === link.path ? 'rotate-180' : ''}`} />
                {isActive(link.path) && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-green-600"></div>
                )}
              </button>
            ) : (
              <a
                href={link.path}
                className={`relative ${isActive(link.path) ? 'font-bold text-green-600' : ''
                  }`}
              >
                {link.label}
                {isActive(link.path) && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-green-600"></div>
                )}
              </a>
            )}

            {/* Desktop Submenu */}
            {link.hasSubmenu && activeSubmenu === link.path && (
              <div
                ref={submenuRef}
                id={link.path}
                className="absolute left-0 mt-4 w-64 bg-white shadow-lg rounded-md overflow-hidden z-50"
              >
                <div className="p-4 border-b border-gray-100">
                  <h3 className="text-lg font-semibold text-green-600">{link.label}</h3>
                  <p className="text-sm text-gray-500">Select from our range of services</p>
                </div>
                <div className="p-2">
                  {link.submenu.map((item) => (
                    <a
                      key={item.path}
                      href={item.path}
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-md transition-colors"
                      onClick={closeMenu}
                    >
                      <span className="bg-green-100 p-2 rounded-full">
                        <item.icon className="h-5 w-5 text-green-600" />
                      </span>
                      <span className="font-medium">{item.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors">
          +91 8866397377
        </button>
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle Menu">
          {menuOpen ? (
            <X className="w-8 h-8 text-gray-800" />
          ) : (
            <Menu className="w-8 h-8 text-gray-800" />
          )}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-20 left-0 right-0 bg-white shadow-md flex flex-col items-start p-6 space-y-4 z-40 md:hidden">
          {navLinks.map((link) => (
            <div key={link.path} className="w-full">
              {link.hasSubmenu ? (
                <>
                  <button
                    className={`text-gray-800 text-lg font-medium w-full flex justify-between items-center ${isActive(link.path) ? 'text-green-600 font-semibold' : ''
                      }`}
                    onClick={() => toggleSubmenu(link.path)}
                  >
                    {link.label}
                    <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${activeSubmenu === link.path ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Mobile Submenu */}
                  {activeSubmenu === link.path && (
                    <div className="mt-2 ml-4 space-y-2">
                      {link.submenu.map((item) => (
                        <a
                          key={item.path}
                          href={item.path}
                          className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md transition-colors"
                          onClick={closeMenu}
                        >
                          <span className="bg-green-100 p-2 rounded-full">
                            <item.icon className="h-4 w-4 text-green-600" />
                          </span>
                          <span>{item.label}</span>
                        </a>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <a
                  href={link.path}
                  className={`text-gray-800 text-lg font-medium w-full block ${isActive(link.path) ? 'text-green-600 font-semibold' : ''
                    }`}
                  onClick={closeMenu}
                >
                  {link.label}
                </a>
              )}
            </div>
          ))}
          <button
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors w-full"
            onClick={closeMenu}
          >
            +91 8866397377
          </button>
        </div>
      )}
    </header>
  );
}
