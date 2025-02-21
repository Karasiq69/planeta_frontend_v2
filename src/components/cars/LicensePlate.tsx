import React from "react";

type Props = {
    licensePlate?: string
};
const LicensePlate = ({licensePlate}: Props) => {
    if (!licensePlate) return '' // TODO change number to cyr??
    return (
        <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
                <div className="flex items-center bg-white border-2 border-black/70 rounded px-1">
                    <span>{licensePlate?.slice(0, 1)}</span>
                    <span className="mx-1 font-mono">{licensePlate?.slice(1, 4)}</span>
                    <span className="mx-1 font-normal">{licensePlate?.slice(4, 6)}</span>
                    <div className="ml-2 flex items-center border-l-2 border-black/70 pl-2">
                        <span className={'font-mono'}>{licensePlate?.slice(6)}</span>
                    </div>
                </div>
            </div>

        </div>
    );
};
export default LicensePlate;
