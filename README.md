# xeho91's brand assets

> **Warning**:
> A new version of this project is continued at https://github.com/xeho91/brand

This repository contains my personal brand assets. It includes:

- [**avatar**](#avatar-preview)
- [**logo**](#logo-preview)

Both of them are built with **SVG** technology in mind for the best quality at
any image's resolution.\
Firstly it was done in Inkscape graphic editor, then the output (code) was
optimized for my own developing purposes. Such as for my website, meta tags,
profile headers or profile avatars on the platforms.\
During the development, I was experimenting with SVG's native animations
called **[SMIL]**. I have applied it to both assets.

[SMIL]: https://developer.mozilla.org/en-US/docs/Web/SVG/SVG_animation_with_SMIL

## Avatar preview

![xeho91's avatar](./examples/xeho91-avatar.svg)

## Logo preview

![xeho91's logo](./examples/xeho91-logo.svg)

## Components

The components are written in **[Svelte]**.
It's effortless to work with this framework, as it gives many opportunities to
make these assets more advanced.\
Both of the components for these assets are bundled and be found inside
package. Below there's an example usage:

```svelte
<script>
  import Avatar from "@xeho91/assets/components/Avatar.svelte";
  import Logo from "@xeho91/assets/components/Logo.svelte";
</script>

<Avatar color="black" background="none" />
<Logo color="default" background="gradient" animations={{ duration: 3000 }} />
```

[Svelte]: https://github.com/sveltejs/svelte
[TypeScript]: https://github.com/microsoft/typescript

## License

The **code** is licensed under [MIT](./LICENSE).

The **graphical assets** are licensed under [CC BY-SA 4.0](./CC_BY-SA_4.0).
