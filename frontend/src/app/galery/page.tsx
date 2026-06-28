import { getImages } from "@/lib/api/images"

export default async function GaleryPage() {
    const images = await getImages();
    return (
        <>
            <div className="pt-24">
                <h1>Galeri foto</h1>
                {images.data.map((image) => (
                    <img key={image.id} src={image.image_url} alt={image.title} />
                ))}
            </div>
        </>
    )
}