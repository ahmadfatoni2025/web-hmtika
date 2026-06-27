import { getNews } from "@/lib/api/news"

export default async function Dashboard() {

    const news = await getNews()

    return (
        <div>
            {news.data.map((item) => (
                <div key={item.id}>
                    <h1>{item.judul}</h1>
                    <p>{item.ringkasan}</p>
                </div>
            ))}
        </div>
    )
}