import Link from "next/link";

interface CardAdminProps {
	label: string;
	href: string;
	icon?: React.ReactNode;
}

const CardAdmin:React.FC<CardAdminProps> = ({
	label,
	href,
  icon,
}) => {
	return (
		<Link 
			key={label}
			href={href}
			className="flex border-2 border-solid border-[#0B78D0] rounded-sm px-5 py-8 items-center justify-center mt-10 gap-2"
		>
			{icon && <span className="text-[#0B78D0]">{icon}</span>}
			<h2 className="font-bold text-[#0B78D0]">
				{label}
			</h2>
		</Link>
	);
}

export default CardAdmin;