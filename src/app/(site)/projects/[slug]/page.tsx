import { getProject, getProjects } from 'lib/projects'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Project } from 'types'
import { SITE_NAME } from 'utils'

interface Props {
  params: Promise<{ slug: string }>
}

// Static export: only the projects in Firestore at build time get a page
export const dynamicParams = false

export const generateStaticParams = async () =>
  Object.values(await getProjects()).map(({ slug }) => ({ slug }))

const DESCRIPTION_LENGTH = 160

// Most projects still have placeholder copy, which would make a poor preview
const getDescription = ({ title, type, copy = '' }: Project) => {
  const text = copy.trim()

  if (!text || /^(copy to come|lorem ipsum)/i.test(text)) {
    return `${title}: a ${type} project by ${SITE_NAME}`
  }

  // Link previews cut off around 160 characters, so end on a whole word
  return text.length > DESCRIPTION_LENGTH
    ? `${text.slice(0, DESCRIPTION_LENGTH).replace(/\s+\S*$/, '')}…`
    : text
}

export const generateMetadata = async ({
  params
}: Props): Promise<Metadata> => {
  const project = await getProject((await params).slug)

  if (!project) return {}

  const description = getDescription(project)
  const images = project.media.slice(0, 1).map(({ src }) => src)

  return {
    title: project.title,
    description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: project.title,
      description,
      url: `/projects/${project.slug}`,
      images
    },
    twitter: { card: 'summary_large_image', images }
  }
}

// The open project is rendered by the shared (site) layout from the URL
const ProjectPage = async ({ params }: Props) => {
  if (!(await getProject((await params).slug))) notFound()

  return null
}

export default ProjectPage
