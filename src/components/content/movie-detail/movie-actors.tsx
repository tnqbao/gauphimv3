import { User } from "lucide-react"

interface MovieActorsProps {
    actors: string[]
}

export default function MovieActors({ actors }: MovieActorsProps) {
    return (
        <div className="mb-6">
            <h3
                className="text-lg md:text-xl font-bold mb-3 flex items-center text-black md:text-white dark:text-white"
            >
                <User className="mr-2 h-5 w-5 text-black md:text-white dark:text-white" /> Diễn viên
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 ">
                {actors.map((actor, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                        <div className="overflow-hidden ">
                            <p
                                className="font-medium text-sm truncate text-black dark:text-white"
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

