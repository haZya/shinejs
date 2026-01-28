import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-12 p-24">
      <h1 className="title text-center text-5xl font-extrabold dark:invert">Shine.js React Demos</h1>
      <nav>
        <ul className="space-y-4 text-2xl">
          <li>
            <Link href="/auto-pilot" className="text-blue-400 hover:text-blue-600">
              Auto-Pilot Demo (Text)
            </Link>
          </li>
          <li>
            <Link href="/auto-pilot-children" className="text-blue-400 hover:text-blue-600">
              Auto-Pilot Demo (Children - Box Shadow)
            </Link>
          </li>
          <li>
            <Link href="/mouse-follow" className="text-blue-400 hover:text-blue-600">
              Mouse-Follow Demo
            </Link>
          </li>
          <li>
            <Link href="/change-text" className="text-blue-400 hover:text-blue-600">
              Change Text Demo
            </Link>
          </li>
          <li>
            <Link href="/dynamic-demo" className="text-blue-400 hover:text-blue-600">
              Dynamic Properties Demo
            </Link>
          </li>
          <li>
            <Link href="/class-demo" className="text-blue-400 hover:text-blue-600">
              Direct Class Usage Demo
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
