"use client"
import { ChangeEvent, Suspense, useRef } from "react"
import Loading from "./loading"
import { GeneratedImages } from "@/components/GeneratedImages"

type GeneratorHandler = {
    generateImages(prompt: string): void
}

export default async function Home() {
    let prompt = ""

    const generatorRef = useRef({} as GeneratorHandler)

    const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        prompt = e.target?.value
    }

    const onSubmit = async () => {
        const current = generatorRef.current
        if (current) {
            await current.generateImages(prompt)
        }
    }

    return (
        <div className="flex flex-col md:flex-row gap-10 px-5">
            <div className="w-full md:w-2/5">
                <h2 className="text-white text-2xl border-b pb-1 mb-3">Prompt</h2>
                <div>
                    <textarea onChange={onChange} className=" resize-none w-full h-[7.5em] border-white border rounded bg-transparent text-white px-1"></textarea>
                    <button className="text-white mt-4 border border-white w-full py-3 text-lg rounded hover:bg-white hover:text-gray-800 transition-colors font-medium" onClick={onSubmit}>
                        Generate Images
                    </button>
                </div>
                {/* <h2 className="text-white text-2xl border-b pb-1 mb-3">Setting Parameters</h2>
                <div></div> */}
            </div>
            <div className="w-full md:w-3/5">
                <Suspense fallback={<Loading />}>
                    <GeneratedImages ref={generatorRef} />
                </Suspense>
            </div>
        </div>
    )
}
