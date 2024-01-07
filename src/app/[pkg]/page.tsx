import { getPkgInfo } from "@/lib/fetch-npm";
import { NpmPackage } from "@/components/npm-package";

export default async function Page({ params }: { params: { pkg: string } }) {
  const { pkg } = params;
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
  } else {
    throw new Error("No repository found");
  }
}
