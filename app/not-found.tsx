import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl">Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
