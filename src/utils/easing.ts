export const Easing = {
  easeInQuad: (
    x: number,
    t: number,
    b: number,
    c: number,
    d: number
  ) => {
    return c * (t /= d) * t + b
  },

  easeOutQuad: (
    x: number,
    t: number,
    b: number,
    c: number,
    d: number
  ) => {
    return -c * (t /= d) * (t - 2) + b
  },

  easeInOutQuad: (
    x: number,
    t: number,
    b: number,
    c: number,
    d: number
  ) => {
    if ((t /= d / 2) < 1) {
      return (c / 2) * t * t + b
    }

    return (-c / 2) * (--t * (t - 2) - 1) + b
  },

  easeInCubic: (
    x: number,
    t: number,
    b: number,
    c: number,
    d: number
  ) => {
    return c * (t /= d) * t * t + b
  },

  easeOutCubic: (
    x: number,
    t: number,
    b: number,
    c: number,
    d: number
  ) => {
    return c * ((t = t / d - 1) * t * t + 1) + b
  },

  easeInOutCubic: (
    x: number,
    t: number,
    b: number,
    c: number,
    d: number
  ) => {
    if ((t /= d / 2) < 1) {
      return (c / 2) * t * t * t + b
    }

    return (c / 2) * ((t -= 2) * t * t + 2) + b
  },

  easeInQuart: (
    x: number,
    t: number,
    b: number,
    c: number,
    d: number
  ) => {
    return c * (t /= d) * t * t * t + b
  },

  easeOutQuart: (
    x: number,
    t: number,
    b: number,
    c: number,
    d: number
  ) => {
    return -c * ((t = t / d - 1) * t * t * t - 1) + b
  },

  easeInOutQuart: (
    x: number,
    t: number,
    b: number,
    c: number,
    d: number
  ) => {
    if ((t /= d / 2) < 1) {
      return (c / 2) * t * t * t * t + b
    }

    return (-c / 2) * ((t -= 2) * t * t * t - 2) + b
  },

  easeInQuint: (
    x: number,
    t: number,
    b: number,
    c: number,
    d: number
  ) => {
    return c * (t /= d) * t * t * t * t + b
  },

  easeOutQuint: (
    x: number,
    t: number,
    b: number,
    c: number,
    d: number
  ) => {
    return c * ((t = t / d - 1) * t * t * t * t + 1) + b
  },

  easeInOutQuint: (
    x: number,
    t: number,
    b: number,
    c: number,
    d: number
  ) => {
    if ((t /= d / 2) < 1) {
      return (c / 2) * t * t * t * t * t + b
    }

    return (c / 2) * ((t -= 2) * t * t * t * t + 2) + b
  },

  easeInSine: (
    x: number,
    t: number,
    b: number,
    c: number,
    d: number
  ) => {
    return -c * Math.cos((t / d) * (Math.PI / 2)) + c + b
  },

  easeOutSine: (
    x: number,
    t: number,
    b: number,
    c: number,
    d: number
  ) => {
    return c * Math.sin((t / d) * (Math.PI / 2)) + b
  },

  easeInOutSine: (
    x: number,
    t: number,
    b: number,
    c: number,
    d: number
  ) => {
    return (-c / 2) * (Math.cos((Math.PI * t) / d) - 1) + b
  },

  easeInExpo: (
    x: number,
    t: number,
    b: number,
    c: number,
    d: number
  ) => {
    return t === 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b
  },

  easeOutExpo: (
    x: number,
    t: number,
    b: number,
    c: number,
    d: number
  ) => {
    return t === d ? b + c : c * (-Math.pow(2, (-10 * t) / d) + 1) + b
  },

  easeInOutExpo: (
    x: number,
    t: number,
    b: number,
    c: number,
    d: number
  ) => {
    if (t === 0) {
      return b
    }

    if (t === d) {
      return b + c
    }

    if ((t /= d / 2) < 1) {
      return (c / 2) * Math.pow(2, 10 * (t - 1)) + b
    }

    return (c / 2) * (-Math.pow(2, -10 * --t) + 2) + b
  },

  easeInCirc: (
    x: number,
    t: number,
    b: number,
    c: number,
    d: number
  ) => {
    return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b
  },

  easeOutCirc: (
    x: number,
    t: number,
    b: number,
    c: number,
    d: number
  ) => {
    return c * Math.sqrt(1 - (t = t / d - 1) * t) + b
  },

  easeInOutCirc: (
    x: number,
    t: number,
    b: number,
    c: number,
    d: number
  ) => {
    if ((t /= d / 2) < 1) {
      return (-c / 2) * (Math.sqrt(1 - t * t) - 1) + b
    }

    return (c / 2) * (Math.sqrt(1 - (t -= 2) * t) + 1) + b
  },

  easeInBack: (
    x: number,
    t: number,
    b: number,
    c: number,
    d: number,
    s: number
  ) => {
    if (s === undefined) {
      s = 1.70158
    }

    return c * (t /= d) * t * ((s + 1) * t - s) + b
  },

  easeOutBack: (
    x: number,
    t: number,
    b: number,
    c: number,
    d: number,
    s: number
  ) => {
    if (s === undefined) {
      s = 1.70158
    }

    return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b
  },

  easeInOutBack: (
    x: number,
    t: number,
    b: number,
    c: number,
    d: number,
    s: number
  ) => {
    if (s === undefined) {
      s = 1.70158
    }

    if ((t /= d / 2) < 1) {
      return (c / 2) * (t * t * (((s *= 1.525) + 1) * t - s)) + b
    }

    return (
      (c / 2) * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b
    )
  },

  easeOutBounce: (
    x: number,
    t: number,
    b: number,
    c: number,
    d: number
  ) => {
    if ((t /= d) < 1 / 2.75) {
      return c * (7.5625 * t * t) + b
    } else if (t < 2 / 2.75) {
      return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b
    } else if (t < 2.5 / 2.75) {
      return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b
    } else {
      return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b
    }
  }
}
