export const mediaMin = (minSize: number) => `@media (min-width: ${minSize}px)`

export const breakpoints = {
  mobile: 320,
  tablet: 768,
  desktop: 1024,
  desktopLarge: 1440,
}

export const media = {
  mobile: mediaMin(breakpoints.mobile),
  tablet: mediaMin(breakpoints.tablet),
  desktop: mediaMin(breakpoints.desktop),
  desktopLarge: mediaMin(breakpoints.desktopLarge),
}
