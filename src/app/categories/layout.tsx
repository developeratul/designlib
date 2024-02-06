import { AppProps } from "@/types";

export default function CategoriesLayout(props: AppProps) {
  const { children } = props;
  return <main className="p-12">{children}</main>;
}
