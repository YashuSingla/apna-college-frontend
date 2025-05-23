import { SetStateAction, useEffect, useState } from "react";
import { Chapter } from "../types/chapter";
import {
  getChapters,
  getUserProgress,
  markProgress,
} from "../services/dashboard.service";

export default function Dashboard() {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [expandedChapterIds, setExpandedChapterIds] = useState<Set<string>>(
    new Set()
  );
  const [progressData, setProgressData] = useState<any>({});

  useEffect(() => {
    loadChapters();
    loadUserProgress();
  }, []);

  const loadChapters = async () => {
    try {
      const chaptersRes = await getChapters();
      setChapters(chaptersRes.chapters);
    } catch (err) {
      console.error("Error loading chapters:", err);
    }
  };

  const loadUserProgress = () => {
    getUserProgress()
      .then((data: any) => {
        if (data.success && data.progress?.data) {
          setProgressData(data.progress.data);
        }
      })
      .catch((err: any) => console.error("Error loading progress:", err));
  };

  const toggleChapter = (id: string) => {
    setExpandedChapterIds((prev) => {
      const updated = new Set(prev);
      updated.has(id) ? updated.delete(id) : updated.add(id);
      return updated;
    });
  };

  const handleCheckboxClick = (
    chapterId: string,
    problemId: string,
    currentStatus: boolean
  ) => {
    const newStatus = !currentStatus;

    // Optimistically update UI
    setProgressData((prev: any) => {
      const updated = { ...prev };
      if (!updated[chapterId]) {
        updated[chapterId] = { progress: {} };
      }
      if (!updated[chapterId].progress) {
        updated[chapterId].progress = {};
      }

      updated[chapterId].progress[problemId] = { status: newStatus };
      return { ...updated };
    });

    const payload = {
      chapterId,
      problemId,
      isCompleted: newStatus,
    };

    markProgress(payload)
      .then((res) => {
        console.log("Progress updated:", res);
        // Optional: confirm from backend and sync again
        loadUserProgress();
      })
      .catch((err) => {
        console.error("Error marking progress:", err);
        // Optional: rollback if error
      });
  };

  const getChapterProgress = (
    chapterId: string,
    problems: Chapter["problems"]
  ) => {
    const total = problems.length;
    const completed = problems.filter(
      (prob) => progressData?.[chapterId]?.progress?.[prob._id]?.status
    ).length;

    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

    return { total, completed, percentage };
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">📘 DSA Sheet</h1>

      {chapters.map((chapter) => {
        const isExpanded = expandedChapterIds.has(chapter._id);
        const { completed, total, percentage } = getChapterProgress(
          chapter._id,
          chapter.problems
        );

        return (
          <div
            key={chapter._id}
            className="mb-4 border rounded-lg p-5 shadow-md"
          >
            <h2
              className={`cursor-pointer transition-all duration-300 ${
                isExpanded ? "text-xl" : "text-2xl"
              } font-semibold text-blue-600`}
              onClick={() => toggleChapter(chapter._id)}
            >
              {chapter.title}
              <span className="text-sm font-normal text-gray-500 ml-2">
              ({completed}/{total} completed · {percentage}%)
              </span>
            </h2>
            <p className="text-sm text-gray-500 mb-4">{chapter.description}</p>

            <div
              className={`transition-all duration-500 ease-in-out overflow-hidden ${
                isExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <ul className="space-y-2 pt-2">
                {chapter.problems.map((prob) => (
                  <li
                    key={prob._id}
                    className="p-3 border rounded-md bg-gray-50 flex justify-between items-start"
                  >
                    <div>
                      <p className="font-medium">
                        {prob.title}{" "}
                        <span className="text-xs px-2 py-0.5 rounded bg-gray-200 text-gray-700">
                          {prob.level}
                        </span>
                      </p>
                      <div className="flex gap-3 text-sm mt-1 text-blue-600">
                        <a
                          href={prob.youtubeLink}
                          target="_blank"
                          rel="noreferrer"
                        >
                          YouTube
                        </a>
                        <a
                          href={prob.leetcodeLink}
                          target="_blank"
                          rel="noreferrer"
                        >
                          LeetCode
                        </a>
                        <a
                          href={prob.articleLink}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Article
                        </a>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      className="mt-1 w-5 h-5"
                      checked={
                        progressData?.[chapter._id]?.progress?.[prob._id]
                          ?.status ?? false
                      }
                      onChange={() =>
                        handleCheckboxClick(
                          chapter._id,
                          prob._id,
                          progressData?.[chapter._id]?.progress?.[prob._id]
                            ?.status ?? false
                        )
                      }
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}
