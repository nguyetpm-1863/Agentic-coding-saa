"use client";

import { useState, useRef, useEffect, useCallback } from "react";

type DropdownRole = "listbox" | "menu";

interface UseDropdownConfig {
	itemCount: number;
	onSelect: (index: number) => void;
	onClose?: () => void;
	role?: DropdownRole;
}

interface TriggerProps {
	"aria-expanded": boolean;
	"aria-haspopup": "listbox" | "menu";
	role?: "combobox";
	"aria-controls"?: string;
	onClick: () => void;
	onKeyDown: (e: React.KeyboardEvent) => void;
}

interface ListProps {
	role: "listbox" | "menu";
}

interface ItemProps {
	role: "option" | "menuitem";
	"aria-selected"?: boolean;
	tabIndex: number;
	onClick: () => void;
	onMouseEnter: () => void;
	onKeyDown: (e: React.KeyboardEvent) => void;
}

const CLOSE_ANIMATION_MS = 100;

export function useDropdown({
	itemCount,
	onSelect,
	onClose,
	role = "listbox",
}: UseDropdownConfig) {
	const [isOpen, setIsOpen] = useState(false);
	const [isClosing, setIsClosing] = useState(false);
	const [activeIndex, setActiveIndex] = useState(-1);
	const containerRef = useRef<HTMLDivElement>(null);
	const closingTimerRef = useRef<ReturnType<typeof setTimeout>>(null);

	const close = useCallback(() => {
		setIsClosing(true);
		closingTimerRef.current = setTimeout(() => {
			setIsOpen(false);
			setIsClosing(false);
			setActiveIndex(-1);
			onClose?.();
		}, CLOSE_ANIMATION_MS);
	}, [onClose]);

	const open = useCallback(() => {
		setIsOpen(true);
		setIsClosing(false);
		setActiveIndex(0);
	}, []);

	const toggle = useCallback(() => {
		if (isOpen && !isClosing) {
			close();
		} else if (!isOpen) {
			open();
		}
	}, [isOpen, isClosing, close, open]);

	// Cleanup timer on unmount
	useEffect(() => {
		return () => {
			if (closingTimerRef.current) clearTimeout(closingTimerRef.current);
		};
	}, []);

	// Outside click detection
	useEffect(() => {
		if (!isOpen) return;
		function handleClickOutside(e: MouseEvent) {
			if (
				containerRef.current &&
				!containerRef.current.contains(e.target as Node)
			) {
				close();
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [isOpen, close]);

	// Scroll active item into view
	useEffect(() => {
		if (!isOpen || activeIndex < 0 || !containerRef.current) return;
		const selector =
			role === "listbox" ? '[role="option"]' : '[role="menuitem"]';
		const items = containerRef.current.querySelectorAll(selector);
		const item = items[activeIndex] as HTMLElement | undefined;
		item?.scrollIntoView({ block: "nearest", behavior: "smooth" });
	}, [activeIndex, isOpen, role]);

	const navigateItems = useCallback(
		(direction: 1 | -1) => {
			if (itemCount === 0) return;
			setActiveIndex((prev) => {
				if (prev < 0) return 0;
				const next = prev + direction;
				if (next < 0) return itemCount - 1;
				if (next >= itemCount) return 0;
				return next;
			});
		},
		[itemCount]
	);

	const handleTriggerKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			switch (e.key) {
				case "Enter":
				case " ":
					e.preventDefault();
					toggle();
					break;
				case "ArrowDown":
					e.preventDefault();
					if (!isOpen) {
						open();
					} else {
						navigateItems(1);
					}
					break;
				case "ArrowUp":
					e.preventDefault();
					if (isOpen) {
						navigateItems(-1);
					}
					break;
				case "Escape":
					if (isOpen) {
						e.preventDefault();
						close();
					}
					break;
			}
		},
		[isOpen, toggle, open, close, navigateItems]
	);

	const handleItemKeyDown = useCallback(
		(e: React.KeyboardEvent, index: number) => {
			switch (e.key) {
				case "Enter":
				case " ":
					e.preventDefault();
					onSelect(index);
					break;
				case "ArrowDown":
					e.preventDefault();
					navigateItems(1);
					break;
				case "ArrowUp":
					e.preventDefault();
					navigateItems(-1);
					break;
				case "Escape":
					e.preventDefault();
					close();
					break;
			}
		},
		[onSelect, navigateItems, close]
	);

	const triggerProps: TriggerProps = {
		"aria-expanded": isOpen,
		"aria-haspopup": role === "listbox" ? "listbox" : "menu",
		...(role === "listbox" ? { role: "combobox" as const } : {}),
		onClick: toggle,
		onKeyDown: handleTriggerKeyDown,
	};

	const listProps: ListProps = {
		role: role === "listbox" ? "listbox" : "menu",
	};

	const getItemProps = (
		index: number,
		options?: { selected?: boolean }
	): ItemProps => ({
		role: role === "listbox" ? "option" : "menuitem",
		...(role === "listbox" ? { "aria-selected": options?.selected } : {}),
		tabIndex: index === activeIndex ? 0 : -1,
		onClick: () => onSelect(index),
		onMouseEnter: () => setActiveIndex(index),
		onKeyDown: (e: React.KeyboardEvent) => handleItemKeyDown(e, index),
	});

	return {
		isOpen,
		isClosing,
		activeIndex,
		containerRef,
		triggerProps,
		listProps,
		getItemProps,
		open,
		close,
		toggle,
		setActiveIndex,
	};
}
