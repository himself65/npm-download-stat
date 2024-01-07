import { NpmPackage } from "@/components/npm-package";
import { SearchBar } from "@/section/search-bar";
import { getPkgInfo } from "@/lib/fetch-npm";

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const pkg = searchParams?.pkg;
  if (typeof pkg !== "string") {
    return <SearchBar />;
  }
  const info = await getPkgInfo(pkg as string);
  if (info.repository?.url) {
    const regex = /git\+https:\/\/github\.com\/(.*)\.git/;
    const match = info.repository.url.match(regex);
    if (match) {
      const repo = match[1];
      return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 dark:bg-gray-900 dark:text-gray-100">
          <NpmPackage repo={repo} pkg={pkg} />
        </div>
      );
    }
  }
  return <SearchBar />;
}
