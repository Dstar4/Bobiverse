import styled from '@emotion/styled'
import PageLayout from '../../components/Layout'
import {getPostBySlug} from '../../lib/api'
import markdownToHtml from '../../lib/markdownToHtml'
import type {NextApiRequest} from 'next'

function Lessons({lesson}: {lesson: any}) {
  const {title, author, content} = lesson
  console.log('LESSON', lesson)
  return (
    <PageLayout>
      <section>
        <h2>{title}</h2>
        <h4>Author: {author}</h4>
        <div dangerouslySetInnerHTML={{__html: content}} />
      </section>
    </PageLayout>
  )
}

export default Lessons

export async function getServerSideProps({
  params,
  req,
}: {
  params: any
  req: NextApiRequest
}) {
  const lesson: any = getPostBySlug('lesson1', [
    'title',
    'date',
    'slug',
    'author',
    'content',
  ])
  const content = await markdownToHtml(lesson.content || '')
  return {
    props: {
      lesson: {
        ...lesson,
        content,
      },
    },
  }
}
