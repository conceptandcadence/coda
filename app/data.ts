type Project = {
  name: string
  description: string
  link: string
  video: string | string[]
  id: string
  image?: string | string[]
}

type WorkExperience = {
  company: string
  title: string
  start: string
  end: string
  link: string
  id: string
}

type BlogPost = {
  title: string
  description: string
  link: string
  uid: string
}

type SocialLink = {
  label: string
  link: string
}

export const ABOUT = {
  name: 'Concept & Cadence',
  email: 'hello@conceptandcadence.com',
  contact: 'Contact',
  content: `
<p class="not-prose mb-4">For several years, we have designed and built digital products with brands, founders, and small teams. The work has been collaborative and deliberate, shaped by people who cared about how things were made, and approached with empathy, restraint, and attention to detail.</p>
<p class="not-prose mb-4">We are currently focused on a long-term internal project and are no longer taking on new client work.</p>
<p class="not-prose mb-4">We’re grateful to the people who trusted us and made the work possible—for us.</p>`,
}

export const PROJECTS: Project[] = [
  {
    name: 'Alex Crane',
    description: '',
    link: 'https://alexcrane.co',
		video: [
			'/media/alex-crane-01.mp4',
			'/media/alex-crane-04.mp4',
			'/media/alex-crane-05.mp4'
		],
		image: [
			'/media/alex-crane-01.jpg',
			'/media/alex-crane-02.jpg',
			'/media/alex-crane-04.jpg',
			'/media/alex-crane-05.webp',
			'/media/alex-crane-06.jpg'
		],
    id: 'alex-crane',
  },
  {
    name: 'Ayond',
    description: '',
    link: 'https://ayond.us',
		video: [
			'/media/ayond-01.mp4',
			'/media/ayond-02.mp4',
			'/media/ayond-03.mp4'
		],
		image: [
			'/media/ayond-01.jpg',
			'/media/ayond-03.jpg'
		],
    id: 'ayond',
  },
	{
    name: 'Beauty Independent',
    description: '',
    link: 'https://beautyindependent.com',
		video: [],
		image: [
			'/media/beautyindependent-01.png'
		],
    id: 'beauty-independent',
  },
	{
    name: 'Caroline Z Hurley',
    description: '',
    link: 'https://carolinezhurley.com',
		video: [
			'/media/caroline-hurley-01.mp4'
		],
		image: [
			'/media/caroline-hurley-01.jpg',
			'/media/caroline-hurley-02.jpg',
			'/media/caroline-hurley-03.webp'
		],
    id: 'caroline-hurley',
  },
	{
    name: 'Coil + Drift',
    description: '',
    link: 'https://coilanddrift.com',
		video: [
			'/media/coil-drift-01.mp4',
			'/media/coil-drift-02.mp4',
			'/media/coil-drift-03.mp4'
		],
		image: [
			'/media/coil-drift-01.webp',
			'/media/coil-drift-02.jpg',
			'/media/coil-drift-03.webp'
		],
    id: 'coil-drift',
  },
	{
    name: 'Counsel Club',
    description: '',
    link: 'https://counselclub.ai',
		video: [],
		image: [
			'/media/counsel-club-01.jpg'
		],
    id: 'counsel-club',
  },
	{
    name: 'Digdeep',
    description: '',
    link: 'https://digdeep.org',
		video: [],
		image: [
			'/media/digdeep-01.gif',
			'/media/digdeep-02.gif',
			'/media/dig-deep-03.jpeg',
			'/media/dig-deep-04.jpg'
		],
    id: 'digdeep',
  },
	{
    name: 'DIO',
    description: '',
    link: 'https://drinkdio.com',
		video: [
			'/media/dio-01.mp4',
			'/media/dio-02.mp4',
		],
		image: [],
    id: 'dio',
  },
	{
    name: 'DOK',
    description: '',
    link: 'https://dokinflatables.com',
		video: [
			'/media/dok-01.mp4',
			'/media/dok-02.mp4',
		],
		image: [
			'/media/dok-01.webp'
		],
    id: 'dok',
  },
	{
    name: 'Doré',
    description: '',
    link: 'https://wearedore.com',
		video: [],
		image: [
			'/media/dore-01.webp',
			'/media/dore-02.webp',
			'/media/dore-03.jpg',
			'/media/dore-04.jpg',
			'/media/dore-05.webp',
		],
    id: 'dore',
  },
	{
    name: 'First Droplets',
    description: '',
    link: 'https://firstdroplets.com',
		video: [],
		image: [
			'/media/first-droplets-01.jpg',
			'/media/first-droplets-02.jpg',
			'/media/first-droplets-03.jpg',
			'/media/first-droplets-05.jpg'
		],
    id: 'first-droplets',
  },
	{
    name: 'Light + Ladder',
    description: '',
    link: 'https://lightandladder.com',
		video: [
			'/media/light-ladder-01.mp4',
			'/media/light-ladder-02.mp4',
			'/media/light-ladder-03.mp4',
		],
		image: [],
    id: 'light-and-ladder',
  },
	{
    name: 'maude',
    description: '',
    link: 'https://lightandladder.com',
		video: [
			'/media/maude-01.mp4',
			'/media/maude-02.mp4',
			'/media/maude-03.mp4',
			'/media/maude-04.mp4',
		],
		image: [
			'/media/maude-01.webp',
			'/media/maude-02.webp',
			'/media/maude-03.webp',
			'/media/maude-06.jpg',
		],
    id: 'maude',
  },
	{
    name: 'Paire',
    description: '',
    link: 'https://pairela.com',
		video: [],
		image: [
			'/media/paire-01.jpg',
			'/media/paire-02.jpg',
			'/media/paire-03.jpg'
		],
    id: 'paire',
  },
	{
    name: 'Peet Rivko',
    description: '',
    link: 'https://peetrivko.com',
		video: [],
		image: [
			'/media/peet-rivko-01.jpg',
			'/media/peet-rivko-02.jpg',
			'/media/peet-rivko-03.webp',
			'/media/peet-rivko-04.webp',
		],
    id: 'peet-rivko',
  },
	{
    name: 'Tinker Watches',
    description: '',
    link: 'https://tinkerwatches.com',
		video: [
			'/media/tinker-01.mp4',
			'/media/tinker-02.mp4',
		],
		image: [
			'/media/tinker-03.webp'
		],
    id: 'tinker-watches',
  },
	{
    name: 'TRNK',
    description: '',
    link: 'https://trnk-nyc.com',
		video: [],
		image: [
			'/media/trnk-01.webp',
			'/media/trnk-02.webp',
		],
    id: 'trnk',
  },
]





export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    company: 'Reglazed Studio',
    title: 'CEO',
    start: '2024',
    end: 'Present',
    link: 'https://ibelick.com',
    id: 'work1',
  },
  {
    company: 'Freelance',
    title: 'Design Engineer',
    start: '2022',
    end: '2024',
    link: 'https://ibelick.com',
    id: 'work2',
  },
  {
    company: 'Freelance',
    title: 'Front-end Developer',
    start: '2017',
    end: 'Present',
    link: 'https://ibelick.com',
    id: 'work3',
  },
]

export const BLOG_POSTS: BlogPost[] = [
  {
    title: 'Exploring the Intersection of Design, AI, and Design Engineering',
    description: 'How AI is changing the way we design',
    link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
    uid: 'blog-1',
  },
  {
    title: 'Why I left my job to start my own company',
    description:
      'A deep dive into my decision to leave my job and start my own company',
    link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
    uid: 'blog-2',
  },
  {
    title: 'What I learned from my first year of freelancing',
    description:
      'A look back at my first year of freelancing and what I learned',
    link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
    uid: 'blog-3',
  },
  {
    title: 'How to Export Metadata from MDX for Next.js SEO',
    description: 'A guide on exporting metadata from MDX files to leverage Next.js SEO features.',
    link: '/blog/example-mdx-metadata',
    uid: 'blog-4',
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Github',
    link: 'https://github.com/conceptandcadence',
  },
  {
    label: 'Twitter',
    link: 'https://twitter.com/conceptandcadence',
  },
  {
    label: 'LinkedIn',
    link: 'https://www.linkedin.com/in/conceptandcadence',
  },
  {
    label: 'Instagram',
    link: 'https://www.instagram.com/conceptandcadence',
  },
]

export const EMAIL = 'hello@conceptandcadence.com'
