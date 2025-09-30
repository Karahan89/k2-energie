import { notFound } from "next/navigation";

export const metadata = {
  title: "Blog entfernt",
  robots: {
    index: false,
    follow: false,
  },
};

export default function BlogIndexPage() {
  notFound();
}
