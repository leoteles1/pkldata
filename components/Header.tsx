import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex justify-center bg-black items-center py-8">
      <Link href="/">
        <Image
          src="/logo-pkldata.png"
          alt="PKDATA Logo"
          width={350}
          height={80}
          priority
          className="cursor-pointer"
        />
      </Link>
    </header>
  );
}
