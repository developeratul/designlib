import { AppProps } from "@/types";

export default function ResourcesLayout(props: AppProps) {
  const { children } = props;
  return <main className="py-12 lg:px-12">{children}</main>;
}
