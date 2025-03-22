interface MovieDescriptionProps {
    description: string
}

export default function MovieDescription({ description }: MovieDescriptionProps) {
    return (
        <div className="mb-6">
            <h3
                className="text-lg font-medium mb-2  text-black md:text-white dark:text-white"
            >
                Nội dung phim
            </h3>
            <p
                className="text-black md:text-white dark:text-white  text-md bg-black/30 bg-opacity-50 p-4 rounded-md"
                dangerouslySetInnerHTML={{ __html: description }}
            />
        </div>
    )
}
