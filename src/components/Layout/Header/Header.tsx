import Link from 'next/link';
import { Logo } from '../../../../public/images/images';
import Image from 'next/image';
import UserDialog from './components/UserDialog/UserDialog';
import SearchForm from './components/SearchForm/SearchForm';
import CustomizedMenu from './components/Menu/Menu';

const Header = () => {
  return (
    <header className={`bg-main sticky top-0 z-50 text-gray-400`}>
      <div className="flex h-[56px] items-center justify-between px-2 lg:hidden lg:px-5">
        <CustomizedMenu />
        <Link href="/">
          <Image
            src={Logo}
            className="md:w-32 sm:w-28 w-24 max-[200px]:px-2 object-contain aspect-[2/1]"
            alt="logo"
          />
        </Link>
        <UserDialog />
      </div>
      <nav className="container m-auto flex h-[56px] items-center gap-8 px-2 lg:px-5 sm:static relative">
        <ul className="flex w-full items-center justify-between gap-4 text-sm sm:gap-8">
          <li className="hidden lg:block">
            <Link href="/">
              <Image src={Logo} width={131} height={19} alt="logo" />
            </Link>
          </li>
          <li>
            <Link href="/" className="hover:text-gray-200">
              Home
            </Link>
          </li>
          <li>
            <Link href="/movies" className="hover:text-gray-200">
              Movies
            </Link>
          </li>
          <li className="hidden lg:block">
            <Link href="/watchlist" className="hover:text-gray-200">
              Lists
            </Link>
          </li>
          <li className="flex-grow">
            <SearchForm />
          </li>
          <li className="hidden items-center lg:flex gap-2">
            <UserDialog />
            <CustomizedMenu />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
