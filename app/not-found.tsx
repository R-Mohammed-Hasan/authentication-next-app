import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center my-16 gap-8">
      <h2 className="text-2xl">Page Not Found...!</h2>
      <h3 className="text-xl">Could not find requested resource</h3>
      <Button variant={"default"} size={"lg"}>
        {" "}
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}
