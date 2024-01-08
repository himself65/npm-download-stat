import { getPkgInfo } from '@/lib/fetch-npm'
import { NpmPackage } from '@/components/npm-package'
import React from 'react'
import { Logo } from '@/components/logo'

export default async function Page ({ params }: { params: { pkg: string } }) {
  const { pkg } = params
  const info = await getPkgInfo(pkg as string)
  if (info.repository?.url) {
    const regex = /git\+https:\/\/github\.com\/(.*)\.git/
    const match = info.repository.url.match(regex)
    if (match) {
      const repo = match[1]
      return (
        <div
          className="flex flex-col items-center justify-center min-h-screen py-2 dark:bg-gray-900 dark:text-gray-100">
          <NpmPackage repo={repo} pkg={pkg}/>
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
