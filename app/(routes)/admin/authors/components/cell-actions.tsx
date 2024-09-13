import { Button } from "@/components/ui/button";
import { AuthorColumns } from "./columns";

interface CellActionProps {
	data: AuthorColumns;
}

const CellAction: React.FC<CellActionProps> = ({ data }) => {
	return (
		<div className="flex">
			<Button 
				variant="ghost"
				className="text-[#2196F3] hover:text-[#21a6f3]"
				onClick={() => console.log(data.name)}
			>
				EDITAR
			</Button>
			<Button variant="ghost" className="text-[#2196F3] hover:text-[#21a6f3]">
				EXCLUIR
			</Button>
		</div>
	);
}

export default CellAction;