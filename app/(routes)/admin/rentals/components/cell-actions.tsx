import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "@/config";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import AlertModal from "@/components/modals/alert-modal";
import { Rental } from "@/types/Rental";
import { BookState } from "@/types/Book";

interface CellActionProps {
	data: Rental;
}

const CellAction: React.FC<CellActionProps> = ({ data }) => {
	const router = useRouter()

	const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

	const apiData = {
		bookIds: data.books
			.filter((book) => book.state === BookState.UNAVAILABLE) 
			.map((book) => book.id),
		title: data.books
			.filter((book) => book.state === BookState.UNAVAILABLE) 
			.map((book) => book.title),
	}

	const onDelete = async () => {
    try {
      setLoading(true)
      await axios.put(`${API_BASE_URL}/rentals/${data.id}/returns`, apiData)
      router.refresh()
      toast.success('Aluguel devolvido com sucesso')
    } catch (error) {
      toast.error('Não foi possível devolver o aluguel')
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
        description={
					apiData.bookIds.length === 1
						? `Você está prestes a registrar a devolução do livro: "${apiData.title[0]}". O livro associado a este aluguel estará novamente disponível para outros locatários. Deseja continuar?`
						: `Você está prestes a registrar a devolução dos livros: ${data.books.filter((book) => book.state === BookState.UNAVAILABLE).map(book => `"${book.title}"`).join(', ')}. Os livros associados a este aluguel estarão novamente disponíveis para outros locatários. Deseja continuar?`
				}
      />
			<div className="flex">
				<Button 
					variant="ghost"
					className="text-[#2196F3] hover:text-[#21a6f3]"
					onClick={() => router.push(`/admin/rentals/details/${data.id}`)}
				>
					Detalhes
				</Button>
				<Button 
					disabled={data.isReturned}
					variant="ghost"
					className="text-[#2196F3] hover:text-[#21a6f3]"
					onClick={() => setOpen(true)}
				>
					Registrar devolução
				</Button>
			</div>
		</>

	);
}

export default CellAction;