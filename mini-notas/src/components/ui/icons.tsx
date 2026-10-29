import React from "react";
import { cn } from "@/lib/cn";

type IconProps = { className?: string };

function base(children: React.ReactNode) {
    return function Icon({ className }: IconProps) {
        return (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={cn("size-4 shrink-0", className)}
                aria-hidden="true"
            >
                {children}
            </svg>
        );
    };
}

export const PlusIcon = base(<path d="M12 5v14M5 12h14" />);
export const SearchIcon = base(<><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>);
export const PinIcon = base(<><path d="M12 17v5" /><path d="M9 3h6l-1 6 4 4v2H6v-2l4-4-1-6Z" /></>);
export const TrashIcon = base(<><path d="M3 6h18" /><path d="M8 6V4h8v2" /><path d="M19 6l-1 14H6L5 6" /></>);
export const DownloadIcon = base(<><path d="M12 3v12" /><path d="m7 10 5 5 5-5" /><path d="M5 21h14" /></>);
export const UploadIcon = base(<><path d="M12 21V9" /><path d="m7 14 5-5 5 5" /><path d="M5 3h14" /></>);
export const ArrowLeftIcon = base(<path d="M19 12H5M12 19l-7-7 7-7" />);
export const RestoreIcon = base(<><path d="M3 12a9 9 0 1 0 3-6.7" /><path d="M3 4v5h5" /></>);
export const HashIcon = base(<path d="M4 9h16M4 15h16M10 3 8 21M16 3l-2 18" />);
export const NoteIcon = base(<><path d="M6 3h9l4 4v14H6Z" /><path d="M14 3v5h5M9 13h6M9 17h4" /></>);
export const XIcon = base(<path d="M18 6 6 18M6 6l12 12" />);

export const BoldIcon = base(<path d="M7 5h6a3.5 3.5 0 0 1 0 7H7Zm0 7h7a3.5 3.5 0 0 1 0 7H7Z" />);
export const ItalicIcon = base(<path d="M14 5h-4M14 19h-4M14 5l-4 14" />);
export const StrikeIcon = base(<><path d="M4 12h16" /><path d="M16 6.5A4 4 0 0 0 12 5c-2.5 0-4 1.3-4 3 0 1.2.7 2.2 2 2.8M8 17.5A4.5 4.5 0 0 0 12 19c2.5 0 4-1.3 4-3.2 0-.7-.2-1.3-.6-1.8" /></>);
export const HeadingIcon = base(<path d="M6 4v16M18 4v16M6 12h12" />);
export const QuoteIcon = base(<path d="M7 7h4v4c0 3-2 5-4 6M14 7h4v4c0 3-2 5-4 6" />);
export const ListIcon = base(<path d="M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01" />);
export const ChecklistIcon = base(<><rect x="3" y="4" width="6" height="6" rx="1" /><path d="m4.5 16 1.5 1.5 3-3M13 7h8M13 16h8" /></>);
export const CodeIcon = base(<path d="m8 7-5 5 5 5M16 7l5 5-5 5" />);
export const LinkIcon = base(<><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" /><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" /></>);
export const EyeIcon = base(<><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></>);
export const MoonIcon = base(<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />);
export const KeyboardIcon = base(<><rect x="2" y="6" width="20" height="12" rx="2" /><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M7 14h10" /></>);
export const ChevronDownIcon = base(<path d="m6 9 6 6 6-6" />);
export const ArrowRightIcon = base(<path d="M5 12h14M13 5l7 7-7 7" />);
export const SaveIcon = base(<><path d="M5 3h11l3 3v15H5Z" /><path d="M8 3v5h7M8 21v-7h8v7" /></>);
