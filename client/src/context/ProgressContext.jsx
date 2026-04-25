import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { useAuth } from '../hooks/useAuth.js';
import { api } from '../lib/api.js';
import { getLessonIndexInfo, getLessonIdFromIndex } from '../data/curriculum.js';

export const ProgressContext = createContext(null);

export function ProgressProvider({ children }) {
  const { user } = useAuth();
  const [completed, setCompleted] = useState(() => new Set());

  useEffect(() => {
    if (!user) {
      setCompleted(new Set());
      return;
    }
    
    // Cleanup old localStorage if present
    window.localStorage.removeItem(`curso.progress.${user.id}`);
    
    // Fetch real progress from backend
    api.courses.getAllProgress()
      .then((data) => {
        const nextSet = new Set();
        if (data.progress) {
          for (const row of data.progress) {
            if (row.completed) {
              const lessonId = getLessonIdFromIndex(row.courseId, row.lessonIndex);
              if (lessonId) nextSet.add(lessonId);
            }
          }
        }
        setCompleted(nextSet);
      })
      .catch((err) => {
        console.error('Failed to load progress', err);
      });
  }, [user]);

  const toggle = useCallback(
    (lessonId) => {
      if (!user) return;
      
      const info = getLessonIndexInfo(lessonId);
      if (!info) return;

      setCompleted((prev) => {
        const next = new Set(prev);
        const isNowComplete = !next.has(lessonId);
        
        if (isNowComplete) next.add(lessonId);
        else next.delete(lessonId);
        
        // Post to backend
        api.courses.upsertProgress(info.courseId, info.lessonIndex, isNowComplete)
          .catch((err) => {
             console.error('Failed to save progress', err);
             // Revert optimistic update on failure
             setCompleted((current) => {
               const reverted = new Set(current);
               if (isNowComplete) reverted.delete(lessonId);
               else reverted.add(lessonId);
               return reverted;
             });
          });
          
        return next;
      });
    },
    [user],
  );

  const isComplete = useCallback((lessonId) => completed.has(lessonId), [completed]);

  const value = useMemo(
    () => ({ completed, toggle, isComplete }),
    [completed, toggle, isComplete],
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}
