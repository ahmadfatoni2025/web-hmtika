import { getEvents } from "@/lib/api/events"
import EventDetail from "../EventDetail"

export async function generateStaticParams() {
  try {
    const res = await getEvents(1, 100)
    return res.data.map((item) => ({ slug: item.slug }))
  } catch {
    return []
  }
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <EventDetail slug={slug} />
}
