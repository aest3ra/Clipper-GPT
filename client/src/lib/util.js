import { useNavigate } from "react-router-dom";

export function useHandleRoute() {
  const navigate = useNavigate();

  const handleRoute = (path) => {
    navigate(path);
  };

  return { handleRoute };
}