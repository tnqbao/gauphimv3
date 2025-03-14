import { User } from "lucide-react"

interface MovieActorsProps {
    actors: string[]
}

export default function MovieActors({ actors }: MovieActorsProps) {
    return (
        <div className="mb-6">
            <h3
                className="text-lg md:text-xl font-bold mb-3 flex items-center md:text-yellow-200 text-black"
                style={{
                    textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
                }}
            >
                <User className="mr-2 h-5 w-5 text-green-600" /> Diễn viên
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {actors.map((actor, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                        <div className="overflow-hidden">
                            <p
                                className="font-medium text-sm truncate text-green-800"
                                style={{
                                    textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
                                    WebkitTextStroke: "0.5px black",
                                }}
                            >
                                {actor}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

