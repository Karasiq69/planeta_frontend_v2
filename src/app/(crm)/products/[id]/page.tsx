import React from "react";

type Props = {
    params: {
        id: string
    }
};
const Page = async ({params}: Props) => {
    return (
        <>
            <section>
                <div className={'space-y-5'}>
                    <h3>Товар</h3>
                </div>
            </section>

        </>
);
};
export default Page;
