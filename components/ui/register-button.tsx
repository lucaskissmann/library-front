"use client";

import { useRouter } from "next/navigation";
import { Button } from "./button";

interface RegisterButtonProps {
	label: string;
	href: string;
}

const RegisterButton: React.FC<RegisterButtonProps> = ({
	label,
  href,
}) => {
	const router = useRouter();

	const handleNavigation = (path: string) => {
		router.push(path);
	};

	return (
		<Button
			variant="confirm"
		 	className="mt-6"
			onClick={() => handleNavigation(href)}
		>
			{label}
		</Button>		
	);
}

export default RegisterButton;