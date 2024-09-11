"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import axios from "axios";
import { API_BASE_URL } from "@/config";

const SearchBook = () => {
  const [searchBook, setSearchBook] = useState("");

  const handleSearchBook = (event: any) => {
    setSearchBook(event.target.value);
  };

  const handleSearch = () => {
    if (searchBook) {
      axios
        .get(`${API_BASE_URL}/books?title=${searchBook}`)
        .then((data) => {
          console.log("Dados retornados:", data.data);
        })
        .catch((error) => {
          console.error("Erro ao realizar a busca:", error);
        });
    }
  };

  return (
    <div className="flex items-center border border-white rounded-md w-full">
      <Input
        type="search"
        placeholder="Pesquisar livros..."
        className="bg-transparent border-none text-zinc-400"
        value={searchBook}
        onChange={handleSearchBook}
      />
      <Button
        className="border-none bg-transparent hover:bg-[#31388a]"
        variant={"outline"}
        onClick={handleSearch}
      >
        <Search className="bg-transparent" color="white" width={15} height={15} />
      </Button>
    </div>
  );
};

export default SearchBook;
