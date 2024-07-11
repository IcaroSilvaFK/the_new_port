import Marquee from 'react-fast-marquee'

import { Card } from './components/Card'
import { Header } from './components/Header'
import MeImage from './assets/Icaro Black Background.png'
import { data } from './data/projects'

import styles from './styles.module.scss'
import { useTranslation } from 'react-i18next'
import { CardTec } from './components/CardTec'

const resources = [
  'https://media.graphassets.com/1IklfdbR9CVkBlw4Lqnr',
  'https://media.graphassets.com/4cOeDZ8QUO5CStpkim26',
  'https://media.graphassets.com/4rStTW9QFGhVIQ3q0hxA',
  'https://media.graphassets.com/cgscjaI9R0iTAdcC0Oge',
  'https://media.graphassets.com/vWIFReYnTDi0GHiKfYJ6',
  'https://media.graphassets.com/MewWroVZSDKc3WMOMr98',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Go_Logo_Blue.svg/520px-Go_Logo_Blue.svg.png',
  'https://camo.githubusercontent.com/794ace8f539408352061bb193fce26a0df05bed29d57d2125968fa99143b67cd/68747470733a2f2f63646e2e6c6162737461636b2e636f6d2f696d616765732f6563686f2d6c6f676f2e737667',
  'https://raw.githubusercontent.com/gin-gonic/logo/master/color.png',
]

export function App() {
  const {
    t,
    i18n: { language },
  } = useTranslation()

  const currentCards = data[language as keyof typeof data]

  return (
    <div className={styles.container}>
      <Header />
      <section className={styles.first__section}>
        <div>
          <h2>{t('title')}</h2>
          <p>{t('description')}</p>
          <div>
            <a href="#services">{t('ourServices')}</a>
            <a href="#contact">{t('contactUs')}</a>
          </div>
        </div>
        <img
          src={MeImage}
          alt="Icaro Vieira"
          className={`${styles.image__section} ${styles.sature}`}
        />
      </section>
      <section className={styles.section__tecnologies}>
        <Marquee>
          {resources.map((res) => (
            <CardTec image={res} />
          ))}
        </Marquee>
      </section>
      <section id="services" className={styles.second__section}>
        <div>
          <header>
            <span className={styles.section__flag}>{t('ourServices')}</span>

            <h2 className={styles.section__title}>{t('expertiseInFullStackTitle')}</h2>
          </header>
          <p className={styles.section__description}>{t('expertiseTextDescription')}</p>
          <div>
            <ul>
              <li>
                <h3>React</h3>
                <span>{t('reactDescription')}</span>
              </li>
              <li>
                <h3>NextJS</h3>
                <span>{t('nextJsDescription')}</span>
              </li>
              <li>
                <h3>NestJS</h3>

                <span>{t('nestJsDescription')}</span>
              </li>
              <li>
                <h3>Gin</h3>
                <span>{t('ginGoLangDescription')}</span>
              </li>
            </ul>

            <img
              src="https://images.unsplash.com/photo-1643409329501-f17776d3823a?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Icaro Vieira"
              className={styles.image__section}
            />
          </div>
        </div>
      </section>

      <section className={styles.three__section} id="portfolio">
        <div>
          <header>
            <span className={styles.section__flag}>{t('ourWork')}</span>
            <h2 className={styles.section__title}>{t('showcasingMyExpertise')}</h2>
          </header>

          <p className={styles.section__description}>{t('webProjects')}</p>

          <ul>
            {currentCards.map((project) => (
              <Card title={project.name} description={project.description} image={project.image} />
            ))}
          </ul>
        </div>
      </section>
      <section id="contact" className={styles.section__form}>
        <header>
          <span className={styles.section__flag}>{t('getInTouch')}</span>
          <h2 className={styles.section__title}>{t('letsDiscussYourProject')}</h2>
        </header>
        <p className={styles.section__description}>{t('fillInTheForm')}</p>

        <form>
          <div>
            <label htmlFor="name">{t('name')}</label>
            <input type="text" name="name" id="name" placeholder={t('typeYourName')} />
          </div>
          <div>
            <label htmlFor="email">{t('email')}</label>
            <input type="email" name="email" id="email" placeholder={t('typeYourEmail')} />
          </div>
          <div>
            <label htmlFor="messsage">{t('message')}</label>
            <textarea name="messsage" id="messsage" placeholder={t('typeYourMessage')}></textarea>
          </div>
          <button>{t('submit')}</button>
        </form>
      </section>

      <footer>
        <span>&copy; Icaro Vieira. All rights reserved.</span>
      </footer>
    </div>
  )
}
