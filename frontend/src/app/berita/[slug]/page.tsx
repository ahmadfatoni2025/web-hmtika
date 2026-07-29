import { getNews } from "@/lib/api/news"
import NewsDetail from "../NewsDetail"

export async function generateStaticParams() {
  try {
    const res = await getNews(1, 100)
    return res.data.map((item) => ({ slug: item.slug }))
  } catch {
    return []
  }
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <NewsDetail slug={slug} />
}
