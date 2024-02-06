import { Loader2 } from "lucide-react";

export default function LoadingScreen() {
  return (
    <div className="w-full py-48 h-full flex justify-center items-center">
      <Loader2 className="text-primary animate-spin w-8 h-8" />
    </div>
  );
}
