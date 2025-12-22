type Project = {
  name: string
  description: string
  link: string
  video: string
  id: string
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
const greetings = {
	en: {
		morning: '🌅 Bom Dia',
		afternoon: '☀️ Boa Tarde',
		evening: '🌆 Boa Tarde',
		night: '🌙 Boa Noite',
	},
	pt: {
		morning: '🌅 Bom Dia',
		afternoon: '☀️ Boa Tarde',
		evening: '🌆 Boa Tarde',
		night: '🌙 Boa Noite',
	},
}

export const ABOUT = {
  name: 'Luke Ragno',
  email: 'hello@lukeragno.com',
  contact: {
    en: 'Contact',
    pt: 'Contacto',
  },
  content: {
    en: `<p>My name is Luke Ragno.</p>
<p class="not-prose mb-4">I’m a designer and developer, originally from the United States, based in Porto, where I’ve lived for several years.</p>
<p class="not-prose mb-4">I’m drawn to work at the intersection of technology, culture, and independent work.</p>
<p class="not-prose mb-4">I’m currently developing a project focused on supporting independent instructors&mdash;helping them organize their work, stay connected with students, and create more day-to-day stability.</p>`,
    pt: `<p>Chamo-me Luke Ragno.</p>
<p class="not-prose mb-4">Sou designer e desenvolvedor, originalmente dos Estados Unidos, baseado no Porto, onde vivo há alguns anos.</p>
<p class="not-prose mb-4">Interessa-me trabalhar na interseção entre tecnologia, cultura e trabalho independente.</p>
<p class="not-prose mb-4">Atualmente estou a desenvolver um projeto focado em apoiar instrutores independentes&mdash;ajudando a organizar o trabalho, manter ligação com os alunos e criar mais estabilidade no dia a dia.</p>`,
  },
}

export const PROJECTS: Project[] = [
  {
    name: 'Motion Primitives Pro',
    description:
      'Advanced components and templates to craft beautiful websites.',
    link: 'https://pro.motion-primitives.com/',
    video:
      'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/newProfileItem/d898be8a-7037-4c71-af0c-8997239b050d.mp4?_a=DATAdtAAZAA0',
    id: 'project1',
  },
  {
    name: 'Motion Primitives',
    description: 'UI kit to make beautiful, animated interfaces.',
    link: 'https://motion-primitives.com/',
    video:
      'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
    id: 'project2',
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
    link: 'https://github.com/lukeragno',
  },
  {
    label: 'Twitter',
    link: 'https://twitter.com/lukeragno',
  },
  {
    label: 'LinkedIn',
    link: 'https://www.linkedin.com/in/ibelick',
  },
  {
    label: 'Instagram',
    link: 'https://www.instagram.com/ibelick',
  },
]

export const EMAIL = 'hello@lukeragno.com'
