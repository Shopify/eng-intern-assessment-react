export interface TimeFormat {
	hours?: string;
	minutes?: string;
	seconds?: string;
	centiseconds?: string;
}

export interface ShortcutsDialogProps {
	open: boolean;
	onClose: (value: string) => void;
}
