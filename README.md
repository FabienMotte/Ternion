# Ternion (ˈtɜːnɪən)

![Ternion](http://i.imgur.com/vhIj9en.png)

A simple **starter kit** to **prototype** quickly your ideas with Three.js.

## Features

- **Three.js** with **Wagner** for post processing
- [**budō**](https://github.com/mattdesl/budo) (with **LiveReload**) for a fast development server
- ES2015 transpiling with **Babel 6** (*stage 0* enabled)
- Development and production (with **UglifyJS** transform) builds
- **Glslify** transform (vert/frag shaders)
- Some useful **basic functions** and **helpers**

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

It starts a [budō](https://github.com/mattdesl/budo) server with LiveReload and open http://localhost:9966/ for you.

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

## License

MIT, see [LICENSE.md](LICENSE.md) for details.