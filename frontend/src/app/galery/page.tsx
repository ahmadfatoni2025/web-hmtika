import { getImages } from "@/lib/api/images"

export default async function GaleryPage() {
    const images = await getImages();
    return (
        <>
            <div className="pt-24 max-w-7xl mx-auto px-4">
                <h1 className="text-center text-2xl py-6 font-black">Dokumentasi kegiatn HMTIKA</h1>
                <div className="grid grid-cols-4 gap-4">
                    {images.data.map((image) => (
                        <div className="flex flex-col" key={image.id}>
                            <img className="w-full h-full object-cover" src={image.image_url} alt={image.title} />
                            <p className="text-center text-sm hidden hover:block absolute">{image.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}