import Link from "next/link";

export default function Page() {
  return (
    <div className="mx-auto min-h-screen flex flex-col gap-4 items-center justify-center">
      <div className="flex flex-col gap-4">
        <h1 className="text-6xl font-bold text-center">
          Canvas, but live.
        </h1>
        <p className="max-w-sm text-sm text-gray-700 leading-loose">
          Draw with others in real-time. No accounts, no sign-ups, no hassle. What could go wrong..?
        </p>
      </div>

      <Link 
        href={`${process.env.CANONICAL_URL}/draw`}
        className="mt-4 max-w-xs w-full text-center rounded-xl py-2 px-5 bg-blue-100 border-2 border-blue-300 text-blue-400"
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
