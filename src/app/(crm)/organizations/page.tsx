import {getAllOrganizationsFn} from "@/features/organizations/api/actions";
import Pre from "@/components/ui/Pre";

type Props = {};
const Page = async (props: Props) => {
    const orgs = await getAllOrganizationsFn()
    return (
        <div>
            <Pre object={orgs.data}/>
        </div>
    );
};
export default Page;
