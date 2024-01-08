import { getPkgInfo } from '@/lib/fetch-npm'
import { NpmPackage } from '@/components/npm-package'
import React from 'react'
import { Logo } from '@/components/logo'

const textAccentMap = {
  'vue': 'text-green-500',
  'react': 'text-blue-500',
  'angular': 'text-red-500',
  'svelte': 'text-orange-500',
  'ember': 'text-red-500',
  'backbone': 'text-blue-500',
  'jquery': 'text-blue-500',
  'preact': 'text-blue-500',
}

export default async function Page ({ params }: { params: { pkg: string } }) {
  const { pkg } = params
  const info = await getPkgInfo(pkg as string)
  if (info.repository?.url) {
    const regex = /git\+https:\/\/github\.com\/(.*)\.git/
    const match = info.repository.url.match(regex)
    const matchedAccent = Object.keys(textAccentMap).find(key => pkg.includes(key))
    const accent = matchedAccent ? textAccentMap[matchedAccent as keyof typeof textAccentMap] : 'text-blue-500'
    if (match) {
      const repo = match[1]
      return (
        <div
          className="flex flex-col items-center justify-center min-h-screen py-2 dark:bg-gray-900 dark:text-gray-100">
          <NpmPackage repo={repo} pkg={pkg} accent={accent}/>
          <footer
            role="presentation"
            className="absolute bottom-3 left-3 flex h-6 items-center gap-2 text-sm text-gray-500"
          >
            <span>idea inspired by{' '}</span>
            <Logo size={6} background={false}/>
            <span className="text-md font-semibold">47ng</span>
            <span className="text-gray-500/80">•</span>
            <a
              href="https://francoisbest.com/open-source"
              className="text-blue-500 hover:underline"
            >
              francoisbest.com
              <span className="text-gray-500/80">/open-source</span>
            </a>
          </footer>
        </div>
      )
    }
  } else {
    throw new Error('No repository found')
  }
}
