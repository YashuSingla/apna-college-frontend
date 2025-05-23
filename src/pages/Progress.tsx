import { useEffect, useState } from 'react';
import { getChapters, getUserProgress } from '../services/dashboard.service';
import { Chapter } from '../types/chapter';
import { Problem } from '../types/problem';

interface ProgressData {
  [chapterId: string]: {
    progress: {
      [problemId: string]: {
        status: boolean;
      };
    };
  };
}

interface ProgressSummary {
  easy: { total: number; completed: number };
  medium: { total: number; completed: number };
  hard: { total: number; completed: number };
  overall: { total: number; completed: number };
}

export default function ProgressPage() {
  const [progressSummary, setProgressSummary] = useState<ProgressSummary | null>(null);

  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        const chaptersRes = await getChapters(); // { chapters: Chapter[] }
        const progressRes = await getUserProgress(); // { progress: { data: ProgressData } }

        const chapters: Chapter[] = chaptersRes.chapters;
        const progressData: ProgressData = progressRes?.progress?.data || {};

        let easy = { total: 0, completed: 0 };
        let medium = { total: 0, completed: 0 };
        let hard = { total: 0, completed: 0 };
        let overall = { total: 0, completed: 0 };

        chapters.forEach((chapter) => {
          chapter.problems.forEach((prob: Problem) => {
            const level = prob.level.toLowerCase();
            const isCompleted = progressData?.[chapter._id]?.progress?.[prob._id]?.status ?? false;

            if (level === 'easy') easy.total++;
            else if (level === 'medium') medium.total++;
            else if (level === 'hard') hard.total++;

            if (isCompleted) {
              overall.completed++;
              if (level === 'easy') easy.completed++;
              else if (level === 'medium') medium.completed++;
              else if (level === 'hard') hard.completed++;
            }

            overall.total++;
          });
        });

        setProgressSummary({ easy, medium, hard, overall });
      } catch (err) {
        console.error('Error fetching progress data:', err);
      }
    };

    fetchProgressData();
  }, []);

  const getPercentage = (completed: number, total: number) =>
    total === 0 ? 0 : Math.round((completed / total) * 100);

  if (!progressSummary) {
    return (
      <div className="text-center text-gray-600 mt-12">
        Loading progress...
      </div>
    );
  }

  const { easy, medium, hard, overall } = progressSummary;

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md space-y-6">
      <h2 className="text-2xl font-bold text-blue-600 text-center">📈 DSA Progress Summary</h2>

      <div className="space-y-4 text-gray-800 text-base">
        {/* Highlighted Total */}
        <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded shadow-sm">
          <p className="text-lg font-semibold text-blue-700">
            🎯 Total Progress: {overall.completed}/{overall.total} (
            {getPercentage(overall.completed, overall.total)}%)
          </p>
        </div>

        {/* Difficulty Breakdown */}
        <p>
          <strong>🟢 Easy:</strong> {easy.completed}/{easy.total} (
          {getPercentage(easy.completed, easy.total)}%)
        </p>
        <p>
          <strong>🟠 Medium:</strong> {medium.completed}/{medium.total} (
          {getPercentage(medium.completed, medium.total)}%)
        </p>
        <p>
          <strong>🔴 Hard:</strong> {hard.completed}/{hard.total} (
          {getPercentage(hard.completed, hard.total)}%)
        </p>
      </div>
    </div>
  );
}
