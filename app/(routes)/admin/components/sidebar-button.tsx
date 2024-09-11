"use client";

import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";

interface SideBarButtonProps {
	label: string;
	href: string;
	icon?: React.ReactNode;

}

const SideBarButton: React.FC<SideBarButtonProps> = ({
	label,
	href,
  icon,
}) => {
	const router = useRouter();
	const currentRoute = usePathname();

	const handleNavigation = (path: string) => {
		router.push(path);
	};

	return (
		<Button
		onClick={() => handleNavigation(href)}
		className={`flex justify-start bg-transparent border-none text-black hover:bg-[#0000001F] w-full ${currentRoute === href ? "bg-[#0000001F]" : ""}`}
		>
			{icon && <span className="pr-3">{icon}</span>}
			<span>{label}</span>
		</Button>
	);
}

export default SideBarButton;