import { SearchBar } from "@/section/search-bar";
import { Footer } from "@/components/footer";
import Link from "next/link";

export default async function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 dark:bg-gray-900">
      <SearchBar />
      <div className="mt-2 text-sm text-center">
        <p>Search examples:</p>
        <div>
          <Link
            href="/react?count=10"
            className="text-blue-500 hover:text-blue-700"
          >
            /react?count=10
          </Link>
        </div>
        <div>
          <Link
            href="/svelte?sort=semver"
            className="text-blue-500 hover:text-blue-700"
          >
            /svelte?sort=semver
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
