import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, // find this in sanity.json or manage.sanity.io
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2025-11-03', // today's date or latest version
  useCdn: true,
})