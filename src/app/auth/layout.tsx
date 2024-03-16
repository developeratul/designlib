import NavBar from "@/components/layout/landing/NavBar";
import { AppProps } from "@/types";

export default function AuthLayout(props: AppProps) {
  const { children } = props;
  return (
    <div>
      <NavBar />
      <div className="w-full">{children}</div>
    </div>
  );
}
