// Joins the truthy class names, e.g. cx(styles.title, isSmall && styles.small)
export const cx = (...classNames: (string | false | null | undefined)[]) =>
  classNames.filter(Boolean).join(' ')
