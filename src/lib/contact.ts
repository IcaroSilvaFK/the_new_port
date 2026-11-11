export const WHATSAPP_NUMBER = '5562998358542'

export const whatsappUrl = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

/** Fired by the services picker so the contact form pre-selects a project type. */
export const PROJECT_TYPE_EVENT = 'portfolio:project-type'
