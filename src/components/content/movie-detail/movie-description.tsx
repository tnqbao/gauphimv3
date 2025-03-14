interface MovieDescriptionProps {
    description: string
}

export default function MovieDescription({ description }: MovieDescriptionProps) {
    return (
        <div className="mb-6">
            <h3
                className="text-lg font-medium mb-2 md:text-white text-black"
                style={{ textShadow: "3px 3px 6px rgba(0, 0, 0, 0.8)", WebkitTextStroke: "0.1px black" }}
            >
                Nội dung phim
            </h3>
            <p
                className="text-emerald-50 text-md bg-black/30 bg-opacity-50 p-4 rounded-md"
                style={{
                    textShadow: "1px 1px 3px rgba(0, 0, 0, 0.8)",
                }}
                dangerouslySetInnerHTML={{ __html: description }}
            />
        </div>
    )
}
