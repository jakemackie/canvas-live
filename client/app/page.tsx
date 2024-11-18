import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <Link 
        href={`${process.env.CANONICAL_URL}/draw`}
        className="text-xl hover:underline"
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
