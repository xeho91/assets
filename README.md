# xeho91's brand assets

This repository contains my personal brand assets. It includes:

- [avatar](#avatar)
- [logo](#logo)

Both of them are built with **SVG** technology in mind for the best quality at
any image's resolution.\
Firstly it was done in Inkscape graphic editor, then the output (code) was
optimized for my own developing purposes. Such as for my website, meta tags,
profile headers or profile avatars on the platforms.\
During the development, I was experimenting with SVG's native animations
called **[SMIL]**. I have applied it to both assets.

[SMIL]: https://developer.mozilla.org/en-US/docs/Web/SVG/SVG_animation_with_SMIL

## Distributable assets

Below there's a preview for default versions of both assets -
[avatar](#avatar-preview) and [logo](#logo-preview).

For more [possible variants](#possible-variants),
generate them with my CLI or use them directly from the package.
They will be located in `./dist` directory.

### Possible variants

At the moment, these variants are possible:

- default _(without gradient background)_,
- alternative _(uses alternative foreground color)_,
- with a gradient background,
- black & white version,
- without the background for all of the above,
- and with or without the animations.

At the moment, there's a total of 20 possibilities for each asset.

### Avatar preview

![xeho91's avatar](./examples/xeho91-avatar.svg)

### Logo preview

![xeho91's logo](./examples/xeho91-logo.svg)

## Components

The components are written in **[Svelte]**.
It's effortless to work with this framework, as it gives many opportunities to
make these assets more advanced.\
Both of the components for these assets are bundled and be found inside package.

[Svelte]: https://github.com/svelte

## CLI

To speed up distribution, development of the assets, etc. I wrote CLI, which is
coded in **TypeScript** with:

- [yargs]
- [Listr2]

[yargs]: https://github.com/yargs/yargs
[Listr2]: https://github.com/cenk1cenk2/listr2

### CLI Usage

1. Install the package globally with any Node.JS package manager of your
   choice. I use [pnpm](https://github.com/pnpm/pnpm).

   ```sh
   pnpm i -g @xeho91/assets
   ```

2. Call the command to print the help with available commands/flags:

   ```sh
   xeho91 --help
   ```

3. Or if you're lazy, just type command `xeho91`, and it will ask you what do
   you want to do.

#### Available commands

- [x] `generate [asset]` - where the `[asset]` is either `avatar` or `logo`
- [ ] `export` - waiting for `feDropShadow` to be supported by [librsvg], so I
  could use it with [sharp].

[librsvg]: https://gitlab.gnome.org/GNOME/librsvg/-/issueos/743
[sharp]: https://github.com/lovell/sharp

## License

The **code** is licensed under [MIT](./LICENSE).

The **graphical assets** are licensed under [CC BY-SA 4.0](./CC_BY-SA_4.0).
