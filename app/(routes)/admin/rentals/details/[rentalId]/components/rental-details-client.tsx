"use client";

import { Button } from "@/components/ui/button";
import DetailsTable from "./details-table";
import { columns } from "./columns";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "@/config";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface RentalDetailsClientProps {
  tableData: any[];
  rentalId: string;
}

const RentalDetailsClient: React.FC<RentalDetailsClientProps> = ({ tableData, rentalId }) => {
  const [selectedBooks, setSelectedBooks] = useState<any[]>([]);
  const [updatedTableData, setUpdatedTableData] = useState<any[]>(tableData); 
  const router = useRouter();

  const handleSelectionChange = (selectedBooks: any[]) => {
    setSelectedBooks(selectedBooks);
  };

  const fetchUpdatedTableData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/rentals/${rentalId}`);
      setUpdatedTableData(response.data); 
    } catch (error) {
      console.error("Erro ao atualizar dados da tabela:", error);
      toast.error("Erro ao atualizar os dados da tabela. Tente novamente.");
    }
  };

  const handleReturnBooks = async () => {
		const apiData = {
			bookIds: selectedBooks.map((register) => register.id),
		}

		console.log(apiData);
    try {
      const response = await axios.put(`${API_BASE_URL}/rentals/${rentalId}/returns`, apiData);
      console.log("Livros devolvidos com sucesso:", response.data);
      toast.success(`${
        selectedBooks.length === 1
         ? "Livro devolvido com sucesso"
          : `${selectedBooks.length} livros devolvidos com sucesso`
      }`)
      
      setSelectedBooks([]);
      await fetchUpdatedTableData();
      router.refresh();
    } catch (error) {
      console.error("Erro ao devolver livros:", error);
    }
  };

  useEffect(() => {
    setUpdatedTableData(tableData);
  }, [tableData]);

  return (
    <div>
      <div className="flex justify-end m-4 py-4 px-2">
        <Button
          variant="confirm"
          onClick={handleReturnBooks}
          disabled={selectedBooks.length === 0}
        >
          Devolver livros selecionados
        </Button>
      </div>
      <DetailsTable columns={columns} data={tableData} selectedBooks={selectedBooks} onSelectionChange={handleSelectionChange} />
    </div>
  );
};

export default RentalDetailsClient;
