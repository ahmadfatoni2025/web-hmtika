import { getNews } from "@/lib/api/news"

export default async function Dashboard() {
  let news: { data: { id: number; judul: string; ringkasan: string }[] } = { data: [] }

  try {
    news = await getNews()
  } catch {
    // API unavailable during build or runtime
  }

  return (
    <div>
      {news.data.length === 0 ? (
        <p className="text-zinc-500 text-sm p-4">Tidak ada berita</p>
      ) : (
        news.data.map((item) => (
          <div key={item.id}>
            <h1>{item.judul}</h1>
            <p>{item.ringkasan}</p>
          </div>
        ))
      )}
    </div>
  )
}
