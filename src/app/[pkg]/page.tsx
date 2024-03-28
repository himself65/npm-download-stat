import { getPkgInfo } from "@/lib/fetch-npm";
import { CopyImage } from "@/components/copy-image";
import { matchGithubRepo, textAccentMap } from "@/lib/utils";
import type { Metadata } from "next";
import { fetchRepository } from "@/lib/fetch-github";
import type { Icon } from "next/dist/lib/metadata/types/metadata-types";
import { Footer } from "@/components/footer";
import { NpmPackage } from "@/components/npm-package";

type Props = {
  params: {
    pkg: string;
  };
  searchParams: {
    count?: string;
    sort?: string;
  };
};

export const runtime = "edge";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pkg = decodeURIComponent(params.pkg);
  try {
    const info = await getPkgInfo(pkg as string);
    const slug = matchGithubRepo(info);
    const icons: Icon[] = [];
    if (slug) {
      const { avatarUrl } = await fetchRepository(slug);
      icons.push({
        url: avatarUrl,
        sizes: "96x96",
        type: "image/png",
      });
    }

    return {
      title: `${pkg} - ${info.description}`,
      description: info.description,
      icons,
    };
  } catch (e) {
    console.error(e);
    return {
      title: "404 - Package not found",
    };
  }
}

export default async function Page({ params, searchParams }: Props) {
  const pkg = decodeURIComponent(params.pkg);
  let versionRollout = Number(searchParams.count ?? 5);
  if (Number.isNaN(versionRollout) || versionRollout < 5) {
    versionRollout = 5;
  }
  let versionRolloutSort: "count" | "semver" =
    (searchParams.sort as "count" | "semver") ?? "count";
  if (!["count", "semver"].includes(versionRolloutSort)) {
    versionRolloutSort = "count";
  }
  const info = await getPkgInfo(pkg as string);
  const slug = matchGithubRepo(info);
  const matchedAccent = Object.keys(textAccentMap).find(
    (key) =>
      pkg.includes(key) ??
      info.name.includes(key) ??
      info.description.includes(key),
  );
  const accent = matchedAccent
    ? textAccentMap[matchedAccent as keyof typeof textAccentMap]
    : "text-blue-500";
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 dark:bg-gray-900 dark:text-gray-100">
      <NpmPackage
        repo={slug}
        pkg={pkg}
        accent={accent}
        version={info.version}
        versionRollout={versionRollout}
        versionRolloutSort={versionRolloutSort}
      />
      <CopyImage />
      <Footer />
    </div>
  );
}
