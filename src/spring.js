const spring = {
  fadeIn: {
    from: { opacity: 0 },
    opacity: 1
  },
  fromTop: {
    from: { transform: 'translateY(-200%)' },
    to: { transform: 'translateY(0%)' }
  },
  delayFadeIn: {
    from: { opacity: '0' },
    to: { opacity: '1' },
    delay: 300
  }
}

export default spring
