import { SearchBar } from "@/section/search-bar";
import { Footer } from "@/components/footer";

export default async function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 dark:bg-gray-900">
      <SearchBar />
      <p className="text-gray-500 text-center p-2">
        available search params: <code>?count=number</code>,{" "}
        <code>?sort=semver</code>
      </p>
      <Footer />
    </div>
  );
}
