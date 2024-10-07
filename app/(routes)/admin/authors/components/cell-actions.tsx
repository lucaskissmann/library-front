import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Author } from "@/types/Author";
import axios from "axios";
import { API_BASE_URL } from "@/config";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import AlertModal from "@/components/modals/alert-modal";
import UpdateModal from "@/components/modals/update-modal";
import AuthorForm from "@/components/authors/author-form";

interface CellActionProps {
	data: Author;
}

const CellAction: React.FC<CellActionProps> = ({ data }) => {
	const router = useRouter()

	const [isUpdateOpen, setIsUpdateOpen] = useState(false);
	const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

	const onDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(`${API_BASE_URL}/authors/${data.id}`)
      router.refresh()
      toast.success('Autor removido com sucesso')
    } catch (error) {
      toast.error('Não foi possível remover o autor.')
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

	return (
		<>
			<AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
        description={`O autor ${data.name} será removido`}
      />
			<UpdateModal
        isOpen={isUpdateOpen}
        onClose={() => setIsUpdateOpen(false)}
				title={`Editar Autor`}
        description={`Você está editando o autor ${data.name}`}
      >
				<AuthorForm initialData={data} onClose={() => setIsUpdateOpen(false)} isEdit={true} />
			</UpdateModal>
			<div className="flex">
				<Button 
					variant="ghost"
					className="text-[#2196F3] hover:text-[#21a6f3]"
					onClick={() => setIsUpdateOpen(true)}
				>
					EDITAR
				</Button>
				<Button 
					variant="ghost"
					className="text-[#2196F3] hover:text-[#21a6f3]"
					onClick={() => setOpen(true)}
				>
					EXCLUIR
				</Button>
			</div>
		</>

	);
}

export default CellAction;