'use client';
import Link from 'next/link';
import Branches from './Branches';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from '@/components/ui/navigation-menu';
import { ModeToggle } from './ui/mode-toggle';
import { Menu } from 'lucide-react';
import { X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Function to toggle the menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    console.log(isMenuOpen);
  };
  return (
    <header className="bg-bgN py-[1rem] border-b-[1px] z-50">
      <nav className="flex justify-between items-center  w-[92%] mx-auto">
        <div>
          <Link
            className="text-xl font-extrabold text-title"
            onClick={() => setIsMenuOpen(false)}
            href="/"
          >
            NOTE NESTLE
          </Link>
        </div>
        <div
          className={`md:static absolute bg-bgN md:min-h-fit min-h-[100vh] text-2xl z-10 left-0 ${
            !isMenuOpen ? 'top-[-120%]' : 'top-[4.6rem] '
          } md:w-auto w-full flex justify-center items-center text-center px-[0.3rem]`}
        >
          <ul className="flex  md:flex-row flex-col  md:items-center md:gap-[3vw] gap-8">
            <li>
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger
                      className={`bg-bgN sm:text-2xl  md:text-base font-normal hover:text-zinc-500 duration-200 ${
                        !isMenuOpen ? '' : 'text-2xl'
                      }`}
                    >
                      Branches
                    </NavigationMenuTrigger>
                    <NavigationMenuContent onClick={toggleMenu}>
                      <Branches />
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </li>
            <li>
              <Link
                onClick={toggleMenu}
                className=" hover:text-zinc-500 duration-200 md:text-base"
                href="/faculty"
              >
                Faculty
              </Link>
            </li>
            <li>
              <Link
                onClick={toggleMenu}
                className="hover:text-zinc-500 duration-200  md:text-base"
                href="/admin"
              >
                Admins
              </Link>
            </li>
            <li>
              <Link
                onClick={toggleMenu}
                className="hover:text-zinc-500 duration-200  md:text-base"
                href="/#feedback"
              >
                Feedback
              </Link>
            </li>
            <li>
              <Link
                onClick={toggleMenu}
                className="hover:text-zinc-500 duration-200   md:text-base"
                href="/aboutUs"
              >
                About Us
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-6">
          <div className="bg-bgN">
            <ModeToggle />
          </div>
          {isMenuOpen ? (
            <X
              onClick={toggleMenu}
              className="text-3xl cursor-pointer md:hidden"
            />
          ) : (
            <Menu
              onClick={toggleMenu}
              className="text-3xl cursor-pointer md:hidden"
            />
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
