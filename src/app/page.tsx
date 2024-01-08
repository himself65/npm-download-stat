import { SearchBar } from "@/section/search-bar";
import { Footer } from "@/components/footer";

export default async function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 dark:bg-gray-900">
      <SearchBar />
      <Footer />
    </div>
  );
}
