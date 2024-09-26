export const mapGender = (gender: string | undefined): "masculino" | "feminino" | "outros" => {
  if (!gender) return "outros"; 
  const normalizedGender = gender.toLowerCase();
  if (["masculino", "feminino", "outros"].includes(normalizedGender)) {
    return normalizedGender as "masculino" | "feminino" | "outros";
  }
  return "outros"; 
};