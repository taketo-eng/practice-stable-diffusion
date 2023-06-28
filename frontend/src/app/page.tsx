async function getData() {
    const res = await fetch("http://localhost:8000", { cache: "no-store" })
    if (!res.ok) {
        throw new Error("Failed to fetch data")
    }
    const data = await res.json()
    return data["images"]
}

export default async function Home() {
    const images = await getData()

    return (
        <main className="">
            {images.map((base64Data: any) => (
                <img key={base64Data} src={"data:image/png;base64," + base64Data} alt="" />
            ))}
        </main>
    )
}
