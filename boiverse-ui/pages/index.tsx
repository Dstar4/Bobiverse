import PageLayout from '../components/Layout'
import styled from '@emotion/styled'

export default function Home() {
  return (
    <PageLayout>
      <SiteContent>Content</SiteContent>
    </PageLayout>
  )
}

const SiteContent = styled.div`
  min-height: 80vh;
  padding: 24px;
  background: #fff;
`
