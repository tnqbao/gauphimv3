"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { categories } from "./category-dropdown"
import { nations } from "./nation-dropdown"
import { Label } from "@/components/ui/label"

export default function FilterSidebar() {
    const [yearRange, setYearRange] = useState([2000, 2023])
    const [ratingRange, setRatingRange] = useState([5, 10])
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [selectedNations, setSelectedNations] = useState<string[]>([])

    const handleCategoryChange = (slug: string, checked: boolean) => {
        if (checked) {
            setSelectedCategories([...selectedCategories, slug])
        } else {
            setSelectedCategories(selectedCategories.filter((cat) => cat !== slug))
        }
    }

    const handleNationChange = (slug: string, checked: boolean) => {
        if (checked) {
            setSelectedNations([...selectedNations, slug])
        } else {
            setSelectedNations(selectedNations.filter((nat) => nat !== slug))
        }
    }

    const resetFilters = () => {
        setYearRange([2000, 2023])
        setRatingRange([5, 10])
        setSelectedCategories([])
        setSelectedNations([])
    }

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium mb-3">Bộ lọc phim</h3>
                <p className="text-sm text-muted-foreground mb-6">
                    Tùy chỉnh tìm kiếm để tìm phim phù hợp với sở thích của bạn
                </p>
            </div>

            <div className="space-y-4">
                <div>
                    <h4 className="font-medium mb-3">Năm phát hành</h4>
                    <div className="px-2">
                        <Slider value={yearRange} min={1970} max={2023} step={1} onValueChange={setYearRange} className="mb-2" />
                        <div className="flex justify-between text-sm text-muted-foreground">
                            <span>{yearRange[0]}</span>
                            <span>{yearRange[1]}</span>
                        </div>
                    </div>
                </div>

                <div>
                    <h4 className="font-medium mb-3">Đánh giá</h4>
                    <div className="px-2">
                        <Slider value={ratingRange} min={0} max={10} step={0.5} onValueChange={setRatingRange} className="mb-2" />
                        <div className="flex justify-between text-sm text-muted-foreground">
                            <span>{ratingRange[0]}</span>
                            <span>{ratingRange[1]}</span>
                        </div>
                    </div>
                </div>

                <div>
                    <h4 className="font-medium mb-3">Thể loại</h4>
                    <div className="space-y-2">
                        {categories.map((category) => (
                            <div key={category.slug} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`category-${category.slug}`}
                                    checked={selectedCategories.includes(category.slug)}
                                    onCheckedChange={(checked) => handleCategoryChange(category.slug, checked as boolean)}
                                />
                                <Label htmlFor={`category-${category.slug}`} className="text-sm cursor-pointer">
                                    {category.name}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h4 className="font-medium mb-3">Quốc gia</h4>
                    <div className="space-y-2">
                        {nations.map((nation) => (
                            <div key={nation.slug} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`nation-${nation.slug}`}
                                    checked={selectedNations.includes(nation.slug)}
                                    onCheckedChange={(checked) => handleNationChange(nation.slug, checked as boolean)}
                                />
                                <Label htmlFor={`nation-${nation.slug}`} className="text-sm cursor-pointer">
                                    <span className="mr-2">{nation.flag}</span>
                                    {nation.name}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="pt-4 space-y-2">
                <Button className="w-full bg-green-600 hover:bg-green-700">Áp dụng bộ lọc</Button>
                <Button variant="outline" className="w-full" onClick={resetFilters}>
                    Đặt lại
                </Button>
            </div>
        </div>
    )
}

