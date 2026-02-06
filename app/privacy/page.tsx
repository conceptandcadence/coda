import type { Metadata } from 'next'
import { PrivacyContent } from './privacy-content'

export const metadata: Metadata = {
  title: 'Privacy',
  description: 'Privacy information for this site.',
}

export default function PrivacyPage() {
  return <PrivacyContent />
}
