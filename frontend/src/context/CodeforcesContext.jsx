// context/CodeforcesContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

export const CodeforcesContext = createContext();

export function CodeforcesProvider({ children }) {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("CodeforcesProvider mounted"); // Debug log
    const fetchContests = async () => {
      try {
        console.log("Fetching Codeforces contests..."); // Debug log
        const response = await fetch(" https://codeforces.com/api/contest.list?gym=false");
        const data = await response.json();
        if (data.status === "OK") {
          setContests(data.result); // full list of contests
          console.log(data.result);
        } else {
          throw new Error("Failed to fetch Codeforces contests");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContests();
  }, []);

  return (
    <CodeforcesContext.Provider value={{ contests, loading, error }}>
      {children}
    </CodeforcesContext.Provider>
  );
}

export const useCodeforces = () => useContext(CodeforcesContext);
