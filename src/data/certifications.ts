export type Certification = {
  name: string
  /** ISO year-month of issue */
  issued: string
}

export type CertificationGroup = {
  issuer: string
  items: Certification[]
}

// Source: LinkedIn "Licenses & certifications" (most recent first).
export const certifications: CertificationGroup[] = [
  {
    issuer: 'Full Cycle',
    items: [
      { name: 'Clean Architecture', issued: '2025-03' },
      { name: 'Go Expert', issued: '2024-03' },
      { name: 'Arquitetura Hexagonal', issued: '2024-02' },
      { name: 'DDD: Modelagem Tática e Patterns', issued: '2023-12' },
      { name: 'Event Storming na Prática', issued: '2023-11' },
      { name: 'Domain Driven Design', issued: '2023-11' },
      { name: 'Comunicação entre Sistemas', issued: '2023-11' },
      { name: 'Docker', issued: '2023-11' },
      { name: 'Fundamentos da Arquitetura de Software', issued: '2023-10' },
    ],
  },
  {
    issuer: 'Rocketseat',
    items: [
      { name: 'Conceitos Avançados de HTTP Servers', issued: '2025-07' },
      { name: 'Fundamentos em Go', issued: '2025-04' },
      { name: 'Criando uma API REST em Go', issued: '2025-04' },
      { name: 'Conceitos Avançados de Go', issued: '2025-04' },
    ],
  },
  {
    issuer: 'EW Academy',
    items: [{ name: 'JS Expert', issued: '2024-02' }],
  },
]
