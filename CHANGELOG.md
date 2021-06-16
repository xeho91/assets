# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits] for commit guidelines.\
Additionaly, there are emojis, which are based on [Gitmoji] commit guidelines.

[Conventional Commits]: https://conventionalcommits.org/
[Gitmoji]: https://gitmoji.dev/

## 1.1.1 (2021-06-16)

### Bug Fixes

* **components:** 🐛  Fix importing `colors.json` ([51bc4aa](https://github.com/xeho91/assets/commit/51bc4aa2b9f4c34a057ed7d7d77cc462dc16dafd))

## 1.1.0 (2021-06-16)

### Features

- Is now possible to import the asset Svelte components with:

  ```js
  import { Avatar, Logo } from "@xeho91/assets";
  ```

- Thanks to the switch Rollup, the package weights much less and the CLI works
  faster.

## 1.0.0 (2021-06-15)

### Features

- **asset:** ✨ New component - `Avatar.svelte` ([ab81453](https://github.com/xeho91/assets/commit/ab81453a2f0d97b8b793f470d4e5913d09d0fb16))
- **asset:** ✨ New component - `Logo.svelte` ([93b7cc7](https://github.com/xeho91/assets/commit/93b7cc741b3d347a0b4052380de160b68225b4da))
- **command:** ✨ Added `generate` new with tasks ([5726fa8](https://github.com/xeho91/assets/commit/5726fa8968f56926d4fbd1143c61bf2839a7a1b8))
- **command**: ✨ Added `default` if nothing provided ([12c8cf5](https://github.com/xeho91/assets/commit/12c8cf54991302ecaca86f8c7867a9bbe1c1196b))
