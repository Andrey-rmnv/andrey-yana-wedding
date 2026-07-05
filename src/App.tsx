import { useEffect, useRef, useState, type ReactNode } from 'react'
import {
  AnimatePresence,
  motion,
  useAnimationControls,
  useMotionValue,
  useScroll,
  useTransform,
} from 'framer-motion'
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  Gift,
  Heart,
  Hourglass,
  Leaf,
  MapPin,
  Music2,
  Sparkles,
} from 'lucide-react'
import heroPhoto from './my_assets/hero4.jpg'
import openingPhoto from './my_assets/photo_2026-07-04_18-56-40.jpg'
import venuePhoto from './my_assets/Screenshot 2026-07-04 at 18.38.56.png'
import './App.css'

const WEDDING_DATE = new Date(2026, 8, 24, 16, 0, 0)

type TimeLeft = {
  days: number
  hours: number
  minutes: number
  seconds: number
  isPast: boolean
}

function getTimeLeft(): TimeLeft {
  const diff = WEDDING_DATE.getTime() - Date.now()

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true }
  }

  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1_000) % 60),
    isPast: false,
  }
}

const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: 'blur(10px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

const timeline = [
  {
    time: '16:00',
    title: 'Сбор гостей',
    text: 'Встречаемся, обнимаемся и настраиваемся на красивый вечер.',
  },
  {
    time: '17:00',
    title: 'Церемония',
    text: 'Главные слова дня, кольца и момент, ради которого все собрались.',
  },
  {
    time: '18:00',
    title: 'Ужин и тосты',
    text: 'Неспешный праздник с музыкой, свечами и самыми близкими людьми.',
  },
  {
    time: '23:00',
    title: 'Торт',
    text: 'Сладкий символ нашей новой счастливой жизни.',
  },
]

const calendarDays = [
  '',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
  '29',
  '30',
]

const palette = [
  'color-maroon',
  'color-brick',
  'color-mustard',
  'color-dusty-rose',
  'color-sand',
  'color-olive',
  'color-forest',
]

function App() {
  const [isInvitationOpen, setIsInvitationOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const heroDecorY = useTransform(scrollYProgress, [0, 0.45], [0, -90])
  const pageDecorY = useTransform(scrollYProgress, [0, 1], [0, 180])

  return (
    <AnimatePresence mode="wait">
      {!isInvitationOpen ? (
        <OpeningScreen key="opening" onOpen={() => setIsInvitationOpen(true)} />
      ) : (
        <motion.main
          className="invitation"
          key="invitation"
          initial={{ opacity: 0, scale: 0.94, filter: 'blur(18px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
        >
      <motion.div className="page-flower page-flower-left" style={{ y: pageDecorY }} />
      <motion.div className="page-flower page-flower-right" style={{ y: heroDecorY }} />

      <section className="hero-section" id="top">
        <motion.div
          className="hero-card"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            className="hero-bg-photo"
            src={heroPhoto}
            alt=""
            aria-hidden="true"
          />
          <div className="hero-overlay" aria-hidden="true" />
          <div className="hero-content">
            <h1>
              Андрей
              <span>&</span>
              Яна
            </h1>
            <div className="hero-date" aria-label="24 сентября 2026">
              <span>24</span>
              <span className="hero-date-sep">/</span>
              <span>09</span>
              <span className="hero-date-sep">/</span>
              <span>2026</span>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="intro-section">
        <Reveal className="section-card centered">
          <Sparkles className="section-icon" size={26} />
          <p className="eyebrow"></p>
          <h2>Дорогие Родные и Друзья</h2>
          <p>
            Наша история любви приводит нас к самому прекрасному моменту - созданию семьи. И мы мечтаем начать новую главу рядом с теми, кто нам особенно дорог.
          </p>
        </Reveal>
      </section>

      <section className="calendar-section" id="details">
        <Reveal className="section-card calendar-card">
          <div className="section-kicker">
            <CalendarDays size={22} />
            <span>Дата</span>
          </div>
          <h2>Сентябрь 2026</h2>
          <div className="calendar-grid" aria-label="Календарь на сентябрь 2026">
            {['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'].map((day) => (
              <span className="calendar-weekday" key={day}>
                {day}
              </span>
            ))}
            {calendarDays.map((day, index) => (
              <span
                className={day === '24' ? 'calendar-day active' : 'calendar-day'}
                key={`${day}-${index}`}
              >
                {day}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="location-section">
        <Reveal className="section-card location-card">
          <div className="location-copy">
            <div className="section-kicker">
              <MapPin size={22} />
              <span>Место</span>
            </div>
            <h2>Времена Года</h2>
            <p>
              Праздник пройдет в уютной загородной локации среди деревьев,
              теплого дерева и осеннего света.
            </p>
            <a
              className="secondary-link"
              href="https://go.2gis.com/80E5o"
              target="_blank"
              rel="noreferrer"
            >
              Как добраться
            </a>
          </div>
          <div className="location-frame">
            <img src={venuePhoto} alt="Времена Года" />
            <span>Времена Года</span>
          </div>
        </Reveal>
      </section>

      <section className="timeline-section">
        <Reveal className="section-title">
          <Clock3 size={24} />
          <p className="eyebrow">Программа</p>
          <h2>План дня</h2>
        </Reveal>
        <div className="timeline">
          {timeline.map((event, index) => (
            <Reveal className="timeline-item" delay={index * 0.067} key={event.time}>
              <span className="timeline-time">{event.time}</span>
              <div>
                <h3>{event.title}</h3>
                <p>{event.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mood-section">
        <Reveal className="mood-card">
          <div className="section-kicker">
            <Leaf size={22} />
            <span>Дресс-код</span>
          </div>
          <h2>Для нас главное - ваше присутствие</h2>
          <p>
            но мы будем рады, если вы придержитесь дресс-кода свадьбы в природных осенних оттенках.
          </p>
          <div className="palette-dots" aria-label="Цветовая палитра">
            {palette.map((className) => (
              <span className={`palette-dot ${className}`} key={className} />
            ))}
          </div>
        </Reveal>
      </section>

      <section className="wishes-section">
        <Reveal className="section-card wishes-card centered">
          <div className="section-kicker">
            <Gift size={22} />
            <span>Пожелания</span>
          </div>
          <p>
            Если хотите подарить нам ценный и нужный подарок, мы будем очень
            благодарны за вклад в бюджет нашей молодой семьи.
          </p>
          <p>
            Просим не обременять себя выбором цветов, ваше присутствие скрасит
            этот день ярче любых букетов!
          </p>
        </Reveal>
      </section>

      <section className="rsvp-section">
        <Reveal className="rsvp-card">
          <Heart className="heart-icon" size={32} />
          <p className="eyebrow"></p>
          <h2>Подтвердите присутствие</h2>
          <p>
            Заполните пожалуйста форму ниже. Мы будем благодарны, если вы подтвердите свое присутствие до 16 августа.
          </p>
          <a
            className="rsvp-link"
            href="https://docs.google.com/forms/d/e/1FAIpQLSfwZvwJEmNgqXq96QaS9_OLiAfdLO5Rr9nNouiKs5f8vLpUow/viewform"
            target="_blank"
            rel="noreferrer"
          >
            Ответить на приглашение
          </a>
        </Reveal>
      </section>

      <CountdownSection />

      <footer>
        <Music2 size={18} />
        <span>С любовью, Андрей и Яна</span>
      </footer>
        </motion.main>
      )}
    </AnimatePresence>
  )
}

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
}

function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-120px' }}
      variants={fadeUp}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft(getTimeLeft())
    }, 1000)

    return () => window.clearInterval(timer)
  }, [])

  const units = [
    { value: timeLeft.days, label: 'дней', pad: false },
    { value: timeLeft.hours, label: 'часов', pad: true },
    { value: timeLeft.minutes, label: 'минут', pad: true },
    { value: timeLeft.seconds, label: 'секунд', pad: true },
  ]

  return (
    <section className="countdown-section">
      <Reveal className="section-card countdown-card centered">
        <div className="section-kicker">
          <Hourglass size={22} />
          <span>До свадьбы</span>
        </div>
        <p className="countdown-date">24 сентября 2026</p>
        {timeLeft.isPast ? (
          <p className="countdown-done">Сегодня наш день!</p>
        ) : (
          <div className="countdown-grid" aria-live="polite">
            {units.map((unit) => (
              <div className="countdown-unit" key={unit.label}>
                <span className="countdown-value">
                  {unit.pad ? String(unit.value).padStart(2, '0') : unit.value}
                </span>
                <span className="countdown-label">{unit.label}</span>
              </div>
            ))}
          </div>
        )}
      </Reveal>
    </section>
  )
}

type OpeningScreenProps = {
  onOpen: () => void
}

function OpeningScreen({ onOpen }: OpeningScreenProps) {
  const sliderRef = useRef<HTMLDivElement>(null)
  const [maxDrag, setMaxDrag] = useState(226)
  const x = useMotionValue(0)
  const controls = useAnimationControls()

  useEffect(() => {
    const updateMaxDrag = () => {
      const slider = sliderRef.current

      if (!slider) {
        return
      }

      setMaxDrag(Math.max(slider.clientWidth - 80, 140))
    }

    updateMaxDrag()
    window.addEventListener('resize', updateMaxDrag)

    return () => window.removeEventListener('resize', updateMaxDrag)
  }, [])

  const handleDragEnd = async () => {
    if (x.get() > maxDrag * 0.78) {
      await controls.start({
        x: maxDrag,
        transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
      })
      onOpen()
      return
    }

    controls.start({
      x: 0,
      transition: { type: 'spring', stiffness: 420, damping: 34 },
    })
  }

  return (
    <motion.main
      className="opening-screen"
      aria-label="Открытие приглашения"
      exit={{
        opacity: 0,
        scale: 1.12,
        filter: 'blur(18px)',
        transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      <div className="opening-bg" aria-hidden="true">
        <img src={openingPhoto} alt="" />
      </div>
      <motion.section
        className="opening-card"
        initial={{ opacity: 0, y: 28, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="opening-script">Приглашение!</p>
        <h1>Ждем вас на нашей свадьбе</h1>
        <div
          className="open-slider"
          ref={sliderRef}
          aria-label="Проведите стрелку вправо, чтобы открыть"
        >
          <span>Открыть приглашение</span>
          <motion.button
            type="button"
            className="open-slider-thumb"
            aria-label="Открыть приглашение"
            style={{ x }}
            animate={controls}
            drag="x"
            dragConstraints={{ left: 0, right: maxDrag }}
            dragElastic={0.04}
            whileTap={{ scale: 0.96 }}
            onDragEnd={handleDragEnd}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                onOpen()
              }
            }}
          >
            <ArrowRight size={26} />
          </motion.button>
        </div>
      </motion.section>
    </motion.main>
  )
}

export default App
