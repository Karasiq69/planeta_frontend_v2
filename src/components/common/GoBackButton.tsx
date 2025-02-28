'use client'

import {Button} from "@/components/ui/button";
import {ChevronLeft} from "lucide-react";
import React from "react";
import {useRouter} from "next/navigation";

const GoBackButton = () => {
    const router = useRouter()
    return (
        <Button size={'sm'} variant={'outline'} onClick={() => router.back()}>
            <ChevronLeft/>
        </Button>
    );
};
export default GoBackButton;
