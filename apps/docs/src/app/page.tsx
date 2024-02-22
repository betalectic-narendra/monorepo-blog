import Image from "next/image";
import { Card } from "@repo/ui/card";
import {Button} from "@repo/ui/button"

export default function Page(): JSX.Element {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
 <Button appName="web" className={"flex"}>
       Click me now!
      </Button>
    </main>
  );
}
