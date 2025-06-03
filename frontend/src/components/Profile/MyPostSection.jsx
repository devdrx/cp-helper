import { useCodeforces } from "../../context/CodeforcesContext";
import { useEffect, useState } from "react";
import React from "react";
import { Link } from "react-router-dom";

export default function MyPostSection({ user, section }) {
  const [problems, setProblems] = useState([]);
  const [loadingProblems, setLoadingProblems] = useState(true);

  // console.log(user);
  useEffect(() => {
    // Don't fetch if handle is not available yet
    if (!user || !user.codeforcesHandle) return;

    const fetchProblems = async () => {
      try {
        setLoadingProblems(true);
        const response = await fetch(
          `https://codeforces.com/api/user.status?handle=${user.codeforcesHandle}&from=1&count=1000`
        );
        const data = await response.json();
        if (data.status === "OK") {
          const acceptedProblems = data.result.filter(
            (submission) => submission.verdict === "OK"
          );
          setProblems(acceptedProblems);
        } else {
          console.error("Failed to fetch problems:", data.comment);
        }
      } catch (error) {
        console.error("Error fetching problems:", error);
      } finally {
        setLoadingProblems(false); // End loading
      }
    };

    fetchProblems();
  }, [user?.codeforcesHandle]);

  const { contests, loading, error } = useCodeforces();
  const [upcomingIndex, setUpcomingIndex] = useState(0);
  const [finishedIndex, setFinishedIndex] = useState(0);

  const [startIndex, setStartIndex] = useState(0);
  const ITEMS_PER_PAGE = 10;
  const PROBLEMS_PER_PAGE = 5;

  const upcomingContests = contests
    .filter((c) => c.phase === "BEFORE")
    .sort((a, b) => b.startTimeSeconds - a.startTimeSeconds);

  const finishedContests = contests
    .filter((c) => c.phase === "FINISHED")
    .sort((a, b) => b.startTimeSeconds - a.startTimeSeconds);

  const visibleUpcoming = upcomingContests.slice(
    upcomingIndex,
    upcomingIndex + PROBLEMS_PER_PAGE
  );

  const visibleFinished = finishedContests.slice(
    finishedIndex,
    finishedIndex + ITEMS_PER_PAGE
  );

  const visibleProblems = problems.slice(
    startIndex,
    startIndex + PROBLEMS_PER_PAGE
  );

  const handleNext = () => {
    if (startIndex + ITEMS_PER_PAGE < contests.length) {
      setStartIndex(startIndex + ITEMS_PER_PAGE);
    }
  };

  const handlePrevious = () => {
    if (startIndex >= ITEMS_PER_PAGE) {
      setStartIndex(startIndex - ITEMS_PER_PAGE);
    }
  };

  if (loading) return <p>Loading contests...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      {section === "contests" ? (
        <div className="w-full max-w-full mx-auto p-4">
          <h2 className="text-2xl font-bold text-center mb-6">
            Codeforces Contests
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-32">
            {/* Upcoming Contests */}
            <div className="h-fit bg-white dark:bg-gray-200 rounded-lg shadow p-4 w-[500px]">
              <h3 className="text-lg font-semibold mb-4 text-center">
                Upcoming Contests
              </h3>
              <ul className="divide-y divide-gray-300 dark:divide-gray-500">
                {visibleUpcoming.map((contest) => (
                  <li
                    key={contest.id}
                    className="py-3 px-2 hover:bg-gray-100 dark:hover:bg-gray-400 transition rounded cursor-pointer"
                  >
                    <div className="font-medium text-gray-900 dark:text-black">
                      {contest.name}
                    </div>
                    <div className="text-sm text-gray-500">
                     <span className="text-sm text-gray-900"> Start Time:{" "}</span>
                      {new Date(contest.startTimeSeconds * 1000).toLocaleString(
                        "en-GB",
                        {
                          hour12: false,
                          hour: "2-digit",
                          minute: "2-digit",
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() =>
                    setUpcomingIndex(upcomingIndex - ITEMS_PER_PAGE)
                  }
                  disabled={upcomingIndex === 0}
                  className="px-4 py-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 disabled:bg-blue-300"
                >
                  Previous
                </button>
                <button
                  onClick={() =>
                    setUpcomingIndex(upcomingIndex + ITEMS_PER_PAGE)
                  }
                  disabled={
                    upcomingIndex + ITEMS_PER_PAGE >= upcomingContests.length
                  }
                  className="px-4 py-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 disabled:bg-blue-300"
                >
                  Next
                </button>
              </div>
            </div>

            {/* Finished Contests */}
            <div className="bg-white dark:bg-gray-200 rounded-lg shadow p-4 w-[500px] h-fit">
              <h3 className="text-lg font-semibold mb-4 text-center">
                Finished Contests
              </h3>
              <ul className="divide-y divide-gray-300 dark:divide-gray-500">
                {visibleFinished.map((contest) => (
                  <li
                    key={contest.id}
                    className="py-3 px-2 hover:bg-gray-100 dark:hover:bg-gray-400 transition rounded cursor-pointer"
                  >
                    <Link to={`/submit-blog/contest/${contest.id}`} state={{ contest }}>
                      <div className="font-medium text-gray-900 dark:text-black">
                        {contest.name}
                      </div>
                      <div className="text-sm text-gray-500">
                     <span className="text-sm text-gray-900"> Start Time:{" "}</span>
                      {new Date(contest.startTimeSeconds * 1000).toLocaleString(
                        "en-GB",
                        {
                          hour12: false,
                          hour: "2-digit",
                          minute: "2-digit",
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </div>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() =>
                    setFinishedIndex(finishedIndex - ITEMS_PER_PAGE)
                  }
                  disabled={finishedIndex === 0}
                  className="px-4 py-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 disabled:bg-blue-300"
                >
                  Previous
                </button>
                <button
                  onClick={() =>
                    setFinishedIndex(finishedIndex + ITEMS_PER_PAGE)
                  }
                  disabled={
                    finishedIndex + ITEMS_PER_PAGE >= finishedContests.length
                  }
                  className="px-4 py-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 disabled:bg-blue-300"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-full mx-auto p-4">
          <h2 className="text-2xl font-bold text-center mb-6">
            Your Recent Submissions
          </h2>

          <div className="flex justify-center">
            <div className="h-fit bg-white dark:bg-gray-200 rounded-lg shadow p-4 w-[500px]">
              {loadingProblems ? (
                <p className="text-center font-semibold">Loading problems...</p>
              ) : (
                <ul className="divide-y divide-gray-300 dark:divide-gray-500">
                  {visibleProblems.map((problem) => {
                    const date = new Date(problem.creationTimeSeconds * 1000);
                    const formattedDate = date.toLocaleString();
                    const tags = problem.problem.tags.join(", ");
                    return (
                      <li
                        key={problem.id + "-" + problem.creationTimeSeconds}
                        className="py-3 px-2 hover:bg-gray-100 dark:hover:bg-gray-400 transition rounded cursor-pointer"
                      >
                        <Link
                          to={`/submit-blog/problem/${problem.id}`}
                          state={{ problem }}
                        >
                          <div className=" font-bold text-gray-900 dark:text-black">
                            {problem.problem.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            <span className="font-semibold text-black">
                              Rating:
                            </span>{" "}
                            {problem.problem.rating || "No rating available"}
                          </div>
                          <div className="text-sm text-gray-500">
                            <span className="font-semibold text-black">
                              Submission Time:
                            </span>{" "}
                            {formattedDate}
                          </div>
                          <div className="text-sm text-gray-500">
                            <span className="font-semibold text-black">
                              Tags:
                            </span>{" "}
                            {tags || "No tags available"}
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}

              <div className="flex justify-between mt-4">
                <button
                  onClick={handlePrevious}
                  disabled={startIndex === 0}
                  className="px-4 py-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 disabled:bg-blue-300"
                >
                  Previous
                </button>
                <button
                  onClick={handleNext}
                  disabled={startIndex + ITEMS_PER_PAGE >= problems.length}
                  className="px-4 py-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 disabled:bg-blue-300"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
