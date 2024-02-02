import LogoSrc from "@/assets/logo.svg";
import { manrope } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { ScrollArea } from "../ui/scroll-area";

export default function SideBar() {
  return (
    <ScrollArea className="w-full max-w-[300px] min-h-full border-r overflow-x-hidden">
      <aside>
        <div className="p-4 border-b">
          <Link href="/" className="flex items-center gap-4">
            <Image src={LogoSrc} width={35} height={35} alt="DesignLib logo" />
            <h4 className={cn("text-lg font-bold tracking-wider", manrope.className)}>DesignLib</h4>
          </Link>
        </div>
      </aside>
    </ScrollArea>
  );
}
