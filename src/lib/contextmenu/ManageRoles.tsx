import {observer} from "mobx-react-lite";

import {ContextMenuWithData, MenuItem} from "preact-context-menu";
import {Check} from "@styled-icons/boxicons-regular";
import {Member} from "revolt.js";


export default observer(() => {
    const contextClick = ({member, role}: {member: Member, role: string}) => {
        let roles = member.roles ?? [];

        if (roles.includes(role)) {
            roles = roles.filter(i => i != role);
        } else {
            roles.push(role);
        }

        member.edit({ roles })
    };

    return <ContextMenuWithData id="ManageRoles" onClose={contextClick}>
        {({member}: { member: Member }) => member.server?.orderedRoles.reverse().map(role => (
            <MenuItem key={role.id} data={{member, role: role.id}}>
                <span style={{color: role.colour!}}> {role.name} </span>
                {member.roles?.includes(role.id) && (
                    <div className="tip">
                        <Check style={{color: role.colour!}} size={20} />
                    </div>
                )}
            </MenuItem>
        ))}
    </ContextMenuWithData>
});
