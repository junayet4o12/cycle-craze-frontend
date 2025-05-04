"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Toggle } from "@/components/ui/toggle"

interface TripleToggleProps {
    className?: string,
    gridNumber: number,
    setGridNumber: React.Dispatch<React.SetStateAction<number>>,
    totalGrid?: number
    increaseBy?: number
}

export function GridToggler({ className, gridNumber, setGridNumber, totalGrid = 3, increaseBy = 2 }: TripleToggleProps) {

    const handleToggle = (index: number) => {
        setGridNumber(index)
    }

    return (
        <div className={cn("flex items-center rounded-md overflow-hidden border border-input", className)}>
            {[...Array(totalGrid)].map((_, i) => i).map((index) => (
                <Toggle
                    // ref={ref}
                    key={index}
                    className={cn(
                        "cursor-pointer flex h-7 !max-w-max items-center justify-center gap-1 rounded-sm bg-background py-2 !px-0 transition-all rounded-none",
                        gridNumber === index + increaseBy && "bg-foreground"
                    )}
                    pressed={gridNumber === index + increaseBy}
                    onPressedChange={() => handleToggle(index + increaseBy)}
                >
                    <div className="flex items-center justify-center gap-1">
                        {[...Array(index + increaseBy)].map((_, i) => (
                            <div key={i} className={cn("h-1 w-1 min-w-1", gridNumber === index + increaseBy ? "bg-foreground" : "bg-foreground/30")} />
                        ))}
                    </div>
                </Toggle>

            ))}
        </div>
    )
}
