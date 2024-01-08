# npm-stat (by versions)

> Get npm download stats by versions

## Introduction

npm package maintainers have the need to know which versions of their npm packages are being used.

## Usage

We use [next.js](https://nextjs.org/) to build this project.

```shell
pnpm install
pnpm run dev
```

### Environment Variables

- `GITHUB_TOKEN`: GitHub personal access token. It's **required** to get the repository information from GitHub API.

## Related Projects

- [npm-stat.com](https://github.com/pvorb/npm-stat.com): npm-stat.com has basic download stats for npm packages. But it doesn't have download stats by versions.
- [francoisbest.com](https://francoisbest.com): This website has download stats by versions with amazing visuals. But it's only using SSG to generate the static blog pages.

## LICENSE

[MIT](LICENSE)
