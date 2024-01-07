"use client";
import Image from "next/image";
import React from "react";

export type GithubAvatarProps = {
  repo: string;
  github: {
    avatarUrl: string;
  };
};

export function GithubAvatar({ github, repo }: GithubAvatarProps) {
  return (
    <Image
      width={24}
      height={24}
      src={github.avatarUrl}
      alt={`Avatar for GitHub account ${repo.split("/")[0]}`}
      className="mr-2 rounded-full"
    />
  );
}
