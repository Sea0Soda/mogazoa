'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/lib/stores/authStore';

import logoSvg from '@/assets/icons/logo.svg';
import menuSvg from '@/assets/icons/menu.svg';
import searchSvg from '@/assets/icons/search.svg';

// --- 스타일 정의 (cva) ---
const headerVariants = cva('w-full relative transition-all duration-300 ease-in-out', {
  variants: {
    variant: {
      home: 'bg-transparent',
      default: 'bg-gray-800',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const headerContentVariants = cva('flex items-center max-w-screen-xl mx-auto px-6 h-[80px]', {
  variants: {
    variant: {
      home: 'flex-row justify-between',
      default: 'flex-row justify-between',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface HeaderProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof headerVariants> {}

const Header = ({ className, ...props }: HeaderProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn, login, logout } = useAuthStore();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const variant = pathname === '/' ? 'home' : 'default';

  const handleSearch = () => {
    if (searchValue.trim().length > 0) {
      router.push(`/?keyword=${encodeURIComponent(searchValue.trim())}`);
      setSearchValue('');
      setIsSearchOpen(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const AuthMenu = () =>
    isLoggedIn ? (
      <>
        <Link href='/compare' className='hover:text-white'>
          비교하기
        </Link>
        <Link href='/mypage' className='hover:text-white'>
          내 프로필
        </Link>
      </>
    ) : (
      <>
        <Link href='/signup' className='hover:text-white'>
          회원가입
        </Link>
        <Link href='/signin' className='hover:text-white'>
          로그인
        </Link>
      </>
    );

  const handleDevLogin = () => {
    if (isLoggedIn) {
      logout();
    } else {
      login({
        id: 'dev-user-123',
        email: 'dev@mogazoa.com',
        nickname: '개발용유저',
      });
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <header className={cn(headerVariants({ variant }), className)} {...props}>
      <div className={cn(headerContentVariants({ variant }))}>
        {/* --- 모바일 뷰 --- */}
        <div className='flex w-full items-center justify-between md:hidden'>
          {isSearchOpen ? (
            <div className='flex w-full items-center gap-4'>
              <button onClick={() => setIsSearchOpen(false)}>
                <Image src={menuSvg} alt='메뉴 닫기' width={24} height={24} />
              </button>
              <div className='relative flex-1'>
                <input
                  type='text'
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder='상품 이름을 검색해 보세요'
                  autoFocus
                  className='w-full h-11 rounded-full bg-[#2E2E3A] pl-4 pr-10 text-sm text-white'
                />
                <button
                  onClick={handleSearch}
                  className='absolute right-3 top-1/2 -translate-y-1/2'
                >
                  <Image src={searchSvg} alt='검색' width={20} height={20} />
                </button>
              </div>
            </div>
          ) : (
            <>
              <button>
                <Image src={menuSvg} alt='메뉴 열기' width={24} height={24} />
              </button>
              <Link href='/'>
                <Image src={logoSvg} alt='Mogazoa Logo' width={112} height={28} priority />
              </Link>
              <button onClick={() => setIsSearchOpen(true)}>
                <Image src={searchSvg} alt='검색 열기' width={24} height={24} />
              </button>
            </>
          )}
        </div>

        {/* --- 데스크탑 뷰 --- */}
        <div className='hidden w-full items-center justify-between md:flex'>
          <div className='flex-shrink-0'>
            <Link href='/'>
              <Image src={logoSvg} alt='Mogazoa Logo' width={128} height={32} priority />
            </Link>
          </div>
          <div className='flex items-center gap-6'>
            <div className='relative w-full max-w-md'>
              <input
                type='text'
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder='상품 이름을 검색해 보세요'
                className='w-full h-11 rounded-full bg-[#2E2E3A] border border-[#3A3A4A] pl-5 pr-12 text-sm text-white'
              />
              <button onClick={handleSearch} className='absolute right-4 top-1/2 -translate-y-1/2'>
                <Image src={searchSvg} alt='검색' width={20} height={20} />
              </button>
            </div>
            <nav className='flex-shrink-0 flex items-center gap-6 text-sm text-gray-300'>
              <AuthMenu />
            </nav>
          </div>
        </div>
      </div>
      {/* 개발용 로그인/로그아웃 토글 버튼 (임시) */}
      <div className='absolute top-2 right-4'>
        <button
          onClick={handleDevLogin}
          className='text-xs text-yellow-300 bg-black/50 px-2 py-1 rounded'
        >
          {isLoggedIn ? 'Logout' : 'Login'} (Dev)
        </button>
      </div>
    </header>
  );
};

export default Header;
