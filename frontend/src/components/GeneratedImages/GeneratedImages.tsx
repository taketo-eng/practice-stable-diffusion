import { forwardRef, useImperativeHandle, useState } from "react"
import { LoadingUI } from "../LoadingUI"

async function getData(prompt: string) {
    const res = await fetch("http://localhost:8000", {
        cache: "no-store",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
    })
    if (!res.ok) {
        throw new Error("Failed to fetch data")
    }
    const data = await res.json()
    return data["images"]
}

export const GeneratedImages = forwardRef(async (_, ref) => {
    const [images, setImages] = useState<string[]>([])
    const [isGenerating, setIsGenerating] = useState<boolean>(false)
    const [fileName, setFileName] = useState<string>("")

    useImperativeHandle(ref, () => ({
        async generateImages(prompt: string) {
            setImages([])
            setIsGenerating(true)
            setFileName(prompt)
            setImages(await getData(prompt))
            setIsGenerating(false)
        },
    }))

    return (
        <div>
            <h2 className="text-white text-2xl border-b pb-1 mb-3">Generated Images</h2>
            {images.length ? (
                <ul className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    {images.map((base64Data: string, i: number) => (
                        <li key={base64Data + i} className="relative shadow-md shadow-gray-100/30 rounded-lg overflow-hidden border-2 border-white">
                            <img key={base64Data} src={"data:image/png;base64," + base64Data} alt="" />
                            <a
                                className="absolute left-2 top-2 bg-indigo-900 p-2 rounded text-white hover:opacity-80 transition-opacity font-medium"
                                href={"data:image/png;base64," + base64Data}
                                download={`${fileName}_${i}`}
                            >
                                Download
                            </a>
                        </li>
                    ))}
                </ul>
            ) : isGenerating ? (
                <LoadingUI />
            ) : (
                <p className="text-white">Please enter prompt and generate...</p>
            )}
        </div>
    )
})
GeneratedImages.displayName = "GeneratedImages"
