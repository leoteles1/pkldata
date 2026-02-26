import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex justify-center items-center py-10">
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
