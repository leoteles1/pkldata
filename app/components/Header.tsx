import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex justify-center items-center py-0">
      <Link href="/">
        <Image
          src="/pkldattao.png"
          alt="PKDATA Logo"
          width={400}
          height={80}
          priority
          className="cursor-pointer"
        />
      </Link>
    </header>
  );
}
