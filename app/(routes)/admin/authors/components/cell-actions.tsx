import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import UpdateDialog from "@/components/update-dialog";
import { useState } from "react";
import { Author } from "@/types/Author";

interface CellActionProps {
	data: Author;
}

const CellAction: React.FC<CellActionProps> = ({ data }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	function handleOpenModal() {
		setIsModalOpen(true);
	}

	function handleCloseModal() {
		setIsModalOpen(false);
	}

	return (
		<div className="flex">
			<Button 
				variant="ghost"
				className="text-[#2196F3] hover:text-[#21a6f3]"
				onClick={handleOpenModal}
			>
				EDITAR
			</Button>
			<Button variant="ghost" className="text-[#2196F3] hover:text-[#21a6f3]">
				EXCLUIR
			</Button>

			{isModalOpen && (
				<UpdateDialog data={data} onClose={handleCloseModal} />
			)}

		</div>
	);
}

export default CellAction;