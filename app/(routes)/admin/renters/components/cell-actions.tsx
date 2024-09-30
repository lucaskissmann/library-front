import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "@/config";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import AlertModal from "@/components/modals/alert-modal";
import UpdateModal from "@/components/modals/update-modal";
import BookUiForm from "@/components/book-ui-form";
import { Renter } from "@/types/Renter";
import RenterForm from "@/components/renter-form";

interface CellActionProps {
	data: Renter;
}

const CellAction: React.FC<CellActionProps> = ({ data }) => {
	const router = useRouter()

	const [isUpdateOpen, setIsUpdateOpen] = useState(false);
	const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

	const onDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(`${API_BASE_URL}/renters/${data.id}`)
      router.refresh()
      toast.success('Locatário removido com sucesso')
    } catch (error) {
      toast.error('Não foi possível remover o locatário.')
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
        description={`O locatário '${data.name}' será removido`}
      />
			<UpdateModal
        isOpen={isUpdateOpen}
        onClose={() => setIsUpdateOpen(false)}
				title={`Editar Locatário`}
        description={`Você está editando o locatário ${data.name}`}
      >
				<RenterForm initialData={data} onClose={() => setIsUpdateOpen(false)} isEdit={true} />
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