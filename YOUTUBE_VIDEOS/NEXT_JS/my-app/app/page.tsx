import Link from "next/link";


export default function HomePage() {
  return (
    <div><h1>Welcome to Home</h1>

      <a href="/about">About</a>
      <br />
      <Link href="/about">About Link</Link>
      <Link href="/services">Services</Link>
<Link href='/services/services-child'>Children</Link>
    </div>

  );
}
