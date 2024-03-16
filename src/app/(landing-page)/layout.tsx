import LandingFooter from "@/components/layout/landing/Footer";
import NavBar from "@/components/layout/landing/NavBar";
import { AppProps } from "@/types";

export default function LandingPageLayout(props: AppProps) {
  const { children } = props;
  return (
    <div>
      <NavBar />
      {children}
      <LandingFooter />
    </div>
  );
}
