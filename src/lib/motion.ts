export const ease = [0.22, 1, 0.36, 1] as const

export function splitProjectName(name: string) {
  const [title, ...rest] = name.split(/\s*[|:]\s*/)
  return { title, subtitle: rest.join(' ') }
}
