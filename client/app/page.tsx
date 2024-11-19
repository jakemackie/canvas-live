import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen w-full flex flex-col gap-12 items-center justify-center">
      <div className="flex">
        <h1 className="text-6xl font-bold">
          Canvas, but live.
        </h1>
      </div>
      <Link 
        href={`${process.env.CANONICAL_URL}/draw`}
        className="rounded-xl py-2 px-5 bg-blue-100 border-2 border-blue-300 text-blue-400"
      >
        Join drawing room
      </Link>

      <Link 
        href="https://github.com/jakemackie/hiyield-gamejam"
        className="text-sm block absolute bottom-5 hover:underline"
      >
        Made by Jake Mackie
      </Link>
    </div>
  );
}
