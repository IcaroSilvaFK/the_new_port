import { useEffect, useMemo, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowUp,
  ArrowUpRight,
  Check,
  FileCheck,
  Github,
  Instagram,
  KeyRound,
  LifeBuoy,
  Linkedin,
  Mail,
  MessageCircle,
} from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'

import { RevealText } from '../../components/RevealText'
import { baseApi } from '../../configs/api'
import { error as toastError, success } from '../../externals/toast/toast'
import { PROJECT_TYPE_EVENT, whatsappUrl } from '../../lib/contact'
import { ease } from '../../lib/motion'
import { useLenis } from '../../providers/SmoothScroll'
import styles from './styles.module.scss'

const PROJECT_TYPES = ['Site', 'System', 'App', 'Ai', 'Unsure'] as const
const GUARANTEES = [KeyRound, FileCheck, LifeBuoy]

const CONFETTI_COLORS = ['#2f4fe0', '#8fa2ff', '#ffffff', '#1f9d6b', '#c9d2ff']

function Confetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 48 }, (_, i) => ({
        x: (Math.random() - 0.5) * 420,
        rise: -(90 + Math.random() * 160),
        rotate: Math.random() * 720 - 360,
        duration: 1.1 + Math.random() * 0.8,
        delay: Math.random() * 0.12,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        round: i % 3 === 0,
      })),
    []
  )

  return (
    <div className={styles.confetti} aria-hidden>
      {pieces.map((p, i) => (
        <motion.span
          key={i}
          style={{ background: p.color, borderRadius: p.round ? '50%' : '2px' }}
          initial={{ opacity: 1, x: 0, y: 0 }}
          animate={{
            x: [0, p.x],
            y: [0, p.rise, p.rise + 320],
            opacity: [1, 1, 0],
            rotate: [0, p.rotate],
          }}
          transition={{ duration: p.duration, ease: 'easeOut', times: [0, 0.35, 1], delay: p.delay }}
        />
      ))}
    </div>
  )
}

export function Contact() {
  const { t } = useTranslation()
  const lenis = useLenis()
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [projectType, setProjectType] = useState<(typeof PROJECT_TYPES)[number] | null>(null)

  // the services picker pre-selects the project type before scrolling here
  useEffect(() => {
    const onPick = (e: Event) => {
      const type = (e as CustomEvent<string>).detail
      if ((PROJECT_TYPES as readonly string[]).includes(type)) {
        setProjectType(type as (typeof PROJECT_TYPES)[number])
      }
    }
    window.addEventListener(PROJECT_TYPE_EVENT, onPick)
    return () => window.removeEventListener(PROJECT_TYPE_EVENT, onPick)
  }, [])

  const schema = useMemo(
    () =>
      z.object({
        name: z.string().trim().min(1, t('fieldRequired')),
        email: z.string().trim().min(1, t('fieldRequired')).email(t('emailInvalid')),
        message: z.string().trim().min(5, t('messageTooShort')),
      }),
    [t]
  )
  type FormType = z.infer<typeof schema>

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({ resolver: zodResolver(schema) })

  const onSubmit = async (values: FormType) => {
    try {
      setIsLoading(true)
      // The API only knows name/email/message, so the project type travels in the message.
      const message = projectType
        ? `[${t('projectTypePrefix')}: ${t(`projectType${projectType}`)}]\n\n${values.message}`
        : values.message
      await baseApi.post('/contacts', { ...values, message })
      reset()
      setProjectType(null)
      success(t('emailSentedSuccess'))
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3400)
    } catch (err) {
      console.error(err)
      toastError(t('emailSendError'))
    } finally {
      setIsLoading(false)
    }
  }

  const backToTop = () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.6 })
    else window.scrollTo({ top: 0 })
  }

  const fields = [
    { id: 'name', type: 'text', autoComplete: 'name' },
    { id: 'email', type: 'email', autoComplete: 'email' },
  ] as const

  const placeholders = { name: t('typeYourName'), email: t('typeYourEmail') }

  const channels = [
    {
      label: 'WhatsApp',
      value: '(62) 99835-8542',
      href: whatsappUrl(t('whatsappMessage')),
      icon: MessageCircle,
    },
    {
      label: 'E-mail',
      value: 'icarovsilva1@gmail.com',
      href: `mailto:icarovsilva1@gmail.com?subject=${encodeURIComponent(t('emailSubject'))}`,
      icon: Mail,
    },
    {
      label: 'LinkedIn',
      value: 'in/icarovieira',
      href: 'https://www.linkedin.com/in/icarovieira',
      icon: Linkedin,
    },
    {
      label: 'Instagram',
      value: '@whyy.go',
      href: 'https://www.instagram.com/whyy.go',
      icon: Instagram,
    },
    {
      label: 'GitHub',
      value: 'IcaroSilvaFK',
      href: 'https://github.com/IcaroSilvaFK',
      icon: Github,
    },
  ]

  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.inner}>
        <div className={styles.aside}>
          <RevealText className={styles.title} text={t('contactTitle')} />
          <p className={styles.lead}>{t('fillInTheForm')}</p>

          <div className={styles.channels}>
            <p>{t('contactDirect')}</p>
            <ul>
              {channels.map(({ label, value, href, icon: Icon }) => (
                <li key={label}>
                  <a href={href} target={href.startsWith('mailto') ? undefined : '_blank'} rel="noreferrer">
                    <span className={styles.channelIcon} aria-hidden>
                      <Icon size={18} strokeWidth={1.7} />
                    </span>
                    <span className={styles.channelLabel}>{label}</span>
                    <span className={styles.channelValue}>{value}</span>
                    <ArrowUpRight className={styles.channelArrow} size={18} aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <motion.form
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease, delay: 0.15 }}
        >
          <fieldset className={styles.types}>
            <legend>{t('projectType')}</legend>
            <div>
              {PROJECT_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  aria-pressed={projectType === type}
                  className={projectType === type ? styles.typeActive : undefined}
                  onClick={() => setProjectType(projectType === type ? null : type)}
                >
                  {t(`projectType${type}`)}
                </button>
              ))}
            </div>
          </fieldset>

          {fields.map((f) => (
            <div key={f.id} className={styles.field}>
              <label htmlFor={f.id}>{t(f.id)}</label>
              <input
                id={f.id}
                type={f.type}
                autoComplete={f.autoComplete}
                placeholder={placeholders[f.id]}
                aria-invalid={!!errors[f.id]}
                aria-describedby={errors[f.id] ? `${f.id}-error` : undefined}
                {...register(f.id)}
              />
              {errors[f.id] && (
                <span id={`${f.id}-error`} className={styles.error}>
                  {errors[f.id]?.message}
                </span>
              )}
            </div>
          ))}

          <div className={styles.field}>
            <label htmlFor="message">{t('message')}</label>
            <textarea
              id="message"
              rows={5}
              placeholder={t('typeYourMessage')}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'message-error' : undefined}
              data-lenis-prevent
              {...register('message')}
            />
            {errors.message && (
              <span id="message-error" className={styles.error}>
                {errors.message.message}
              </span>
            )}
          </div>

          <div className={styles.submitWrap}>
            <button
              type="submit"
              disabled={isLoading || showSuccess}
              className={`${styles.submit} ${showSuccess ? styles.done : ''}`}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={showSuccess ? 'sent' : isLoading ? 'sending' : 'idle'}
                  initial={{ y: 14, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -14, opacity: 0 }}
                  transition={{ duration: 0.35, ease }}
                >
                  {showSuccess ? (
                    <>
                      <Check size={18} strokeWidth={2.5} aria-hidden />
                      {t('sent')}
                    </>
                  ) : isLoading ? (
                    t('sending')
                  ) : (
                    t('submit')
                  )}
                </motion.span>
              </AnimatePresence>
            </button>
            <AnimatePresence>{showSuccess && <Confetti />}</AnimatePresence>
          </div>
        </motion.form>

        <ul className={styles.guarantees}>
          {GUARANTEES.map((Icon, i) => (
            <li key={i}>
              <Icon size={20} strokeWidth={1.6} aria-hidden />
              <div>
                <strong>{t(`guarantee${i + 1}Title`)}</strong>
                <span>{t(`guarantee${i + 1}Body`)}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <footer className={styles.footer}>
        <span>
          &copy; {new Date().getFullYear()} Icaro Vieira. {t('copy')}
        </span>
        <button type="button" onClick={backToTop} className={styles.top}>
          {t('backToTop')}
          <ArrowUp size={16} aria-hidden />
        </button>
      </footer>
    </section>
  )
}
