"use client";

import { ChevLeftIcon, ChevRightIcon } from "@/components/Icon";
import useEmblaCarousel from "embla-carousel-react";
import Image, { type StaticImageData } from "next/image";

interface Props {
    title: string;
    description: string;
    disabled?: boolean;
    data: {
        id: number;
        src: StaticImageData;
    }[];
}

export default function CenterContentsBanner({
    title,
    description,
    data,
    disabled = false,
}: Props) {
    const [emblaRef, emblaAPI] = useEmblaCarousel({ active: !disabled });

    return (
        <div className="relative h-[calc(80dvh-100px)] w-full overflow-hidden lg:h-[calc(100dvh-120px)]">
            <div className="absolute left-0 top-0 z-[9] h-full w-full bg-black/30" />

            <div className="z-[1] h-full" ref={emblaRef}>
                <div className="flex h-full">
                    {data.map((image) => (
                        <div
                            key={`carousel-image-${image.id}`}
                            className="flex-shrink-0 flex-grow-0 basis-full"
                        >
                            <div className="h-full w-full">
                                <Image
                                    src={image.src}
                                    alt="works-banner"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {!disabled && (
                <button
                    type="button"
                    className="absolute left-2 top-1/2 z-10 -translate-y-1/2 md:left-[2%]"
                    onClick={() => {
                        if (emblaAPI) emblaAPI.scrollPrev();
                    }}
                >
                    <ChevLeftIcon width={38} height={38} className="stroke-white" />
                </button>
            )}

            <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
                <div className="flex flex-col items-center justify-center space-y-3">
                    <h2 className="text-center text-4xl font-semibold text-white md:text-5xl lg:text-6xl">
                        Our <br />
                        {title}
                    </h2>
                    <p className="text-center text-lg font-medium text-white lg:text-xl">
                        {description}
                    </p>
                </div>
            </div>

            {!disabled && (
                <button
                    type="button"
                    className="absolute right-2 top-1/2 z-10 -translate-y-1/2 md:right-[2%]"
                    onClick={() => {
                        if (emblaAPI) emblaAPI.scrollNext();
                    }}
                >
                    <ChevRightIcon width={38} height={38} className="stroke-white" />
                </button>
            )}
        </div>
    );
}
