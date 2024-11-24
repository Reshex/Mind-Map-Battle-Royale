import { Dispatch, SetStateAction, useState } from 'react';
import { CircleX, Ellipsis, Pencil } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '../ui/dropdown-menu';

interface CollapsibleMenuProps {
    label: string;
    editAction: (label: string) => Promise<void> | void;
    deleteAction: () => Promise<void> | void;
    EditComponent: React.FC<{ setIsEditDialogOpen: Dispatch<SetStateAction<boolean>>; editAction: (label: string) => Promise<void> | void }>;
}

function CollapsibleMenu({ label, editAction, deleteAction, EditComponent }: CollapsibleMenuProps) {
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger><Ellipsis className='size-fit hover:text-secondary' /></DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>{label} Settings</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
                        <Pencil className="w-3 h-3 hover:text-secondary" /> Edit {label}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={deleteAction}><CircleX />Delete {label}</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {isEditDialogOpen && (
                <EditComponent
                    editAction={editAction}
                    setIsEditDialogOpen={setIsEditDialogOpen}
                />
            )}
        </>
    );
}

export default CollapsibleMenu;
