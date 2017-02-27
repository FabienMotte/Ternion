# Ternion (ˈtɜːnɪən)

[![stability][stability-image]][stability-url]
[![js-standard-style][standard-image]][standard-url]

![Ternion](http://i.imgur.com/vhIj9en.png)

A simple and opinionated **starter kit** to **prototype** quickly your ideas with Three.js.

## Features

- **Three.js** and **post processing**
- **dat.GUI**
- Code linted with **Javascript Standard Style**
- [**budō**](https://github.com/mattdesl/budo) (with **LiveReload**) for a fast development server
- ES2015 transpiling with **Babel 6** (*stage 0* enabled)
- Development and production (with **UglifyJS** transform) builds
- **Glslify** transform (vert/frag shaders)
- Some useful **basic functions** and **helpers**
- **Stylus** support for stylesheets

## Install

Clone this repository and install dependencies :

```sh
git clone https://github.com/FabienMotte/Ternion.git
```

```sh
npm install
```

## Usage

A **simple example** (see the picture above) is included as a demonstration.<br />
Now it's time to be creative and imagine something on your own !

### Development

It starts a [budō](https://github.com/mattdesl/budo) server with LiveReload and open [http://localhost:9966/](http://localhost:9966/) for you.

```sh
npm start
```

### Production

It builds with Browserify a bundled file outputted here : `public/build/bundle.js`.

```sh
npm run build
```

## Contribute

This starter kit is opinionated, but feel free to submit issues or pull requests !

## Contributors

- [Patrick Heng](https://github.com/patrickheng)

## License

MIT, see [LICENSE.md](LICENSE.md) for details.

[stability-image]: https://img.shields.io/badge/stability-stable-brightgreen.svg?style=flat-square
[stability-url]: https://nodejs.org/api/documentation.html#documentation_stability_index
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: https://github.com/feross/standard
