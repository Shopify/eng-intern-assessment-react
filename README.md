# Shopify Frontend Engineering Intern Challenge - Summer 2024

<h1 align="center">
  <a href=""><img src="public/images/sonic/sonic-stand.gif" width="250"/></a>
  <br>
  <i>Sonicify</i>
</h1>

<blockquote align="center">
  Hey!👋 This is my submission for Shopify's Frontend Engineering Challenge - Summer 2024!
</blockquote><br>

## Project Overview

Sonicify is a stopwatch app with a spin by integrating elements from the Sonic the Hedgehog series/old retro games. This interactive timer not only functions as a precise time-tracking tool but also provides a nostalgic pixel-art animation of Sonic running as the timer progresses.

The game tracks lap times, distance, and workout level (used for sonic speed, animation, and background scrolling speed). When lap is clicked, the lap number, time, and distance are added to the record board.

The app has keyboard support and ARIA attributes to ensure that it is accessible and usable by people with disabilities. The app is also responsive and can be used on mobile devices.

## Usage

You can view my submission at [sonicify.daner.dev](https://sonicify.daner.dev/)

## Project Setup

To get started, follow these steps:

```bash
git clone https://github.com/danerkestey/eng-intern-assessment-react.git
cd eng-intern-assessment-react
npm install
npm start
```

This will clone the repo, install the dependencies, and start the app on your local port.

## Project Goals

The goals of this project were to:

- Provide a precise and easy to use stopwatch that can start, stop, display laps, and reset.
- Provide a fun and interacive twist on the challenge by using these elements in an side-scrolling track and field minigame thats inspired by retro games.
- Have clean, well-structured and maintainable code that is easy to understand and build upon.
- Provide accessibility features, keyboard support, and a responsive design.
- Use testing to ensure stopwatch functionality.

## Future Improvements

There was a lot of room for improvements in this project that would have fell out of scope of the challenge. Some of these improvements include:

- Having a more robust testing suite.
- When stopwatch buttons are clicked, a text and sound effect pop up that is reminiscent of retro Sonic and Mario games.
- Having multiple sprites to choose from.
- Add current m/s displayed as well as a high score displaying the fastest m/s ran.
- Shadow under sprite

## Technologies

- HTML & CSS
- React (TypeScript)
- Google Fonts API
- Google Firebase
- React Testing Library w/ Jest
- Webpack
- Babel

### Tools

- Figma
- Spotify (of course)

## Links

- [LinkedIn](https://www.linkedin.com/in/daneryasin/)<br>
- [GitHub](https://github.com/danerkestey)<br>
- [Figma Design Doc](https://www.figma.com/file/PsojNo5TVfEL6g26fn6YGH/Shopify-Frontend-Challenge-2024?type=design&node-id=0%3A1&mode=design&t=QM8DU9IEd6vWTkx3-1)<br>

## Credits & Inspirations

There were a lot of great places I used and was inspired by when designing the UI to be reminiscent of retro games, here were some of my favorites:

- [Press Start 2P Google Font](https://fonts.google.com/specimen/Press+Start+2P)
- [Retro Nintendo Option Selectors](https://gamefaqs.gamespot.com/a/review/96/173196-5.jpg)
- [Sonic and Mario at the Olympics (Scrolling background design) that was used to create a custom 2048-wide background](https://assets.nintendo.com/image/upload/ar_16:9,b_auto:border,c_lpad/b_white/f_auto/q_auto/dpr_2.0/c_scale,w_400/ncom/software/switch/70010000019616/56af2256a5a590c5407036d134e37e97ae73796221f580d514534a2d87ba93f7)
- [The Human Abstract - Crossing the Rubicon 8-bit version (Music used in game)](https://www.youtube.com/watch?v=0ezmcPkdxPU)

Sonic Sprites:

- [Standing Gif](https://www.andersonkenya1.net/files/file/709-16-bit-sonic/)
- [Slow Run Gif](https://wifflegif.com/gifs/706468-pixel-art-hedgehog-gif)
- [Med Run Gif](https://tenor.com/9LAN.gif)
- [Fast Run Gif](https://tenor.com/bcncp.gif)
