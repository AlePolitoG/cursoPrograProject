import { useMemo } from 'react';
import { findTrack } from '../data/curriculum.js';
import { useProgress } from './useProgress.js';

export function useTrackProgress(trackId) {
  const { completed } = useProgress();
  return useMemo(() => {
    const track = findTrack(trackId);
    if (!track) return null;
    const lessons = track.sections.flatMap((s) => s.lessons);
    const total = lessons.length;
    const done = lessons.reduce((n, l) => n + (completed.has(l.id) ? 1 : 0), 0);
    const totalMinutes = lessons.reduce((n, l) => n + l.minutes, 0);
    const doneMinutes = lessons.reduce((n, l) => n + (completed.has(l.id) ? l.minutes : 0), 0);
    return {
      track,
      total,
      done,
      percent: total === 0 ? 0 : Math.round((done / total) * 100),
      totalMinutes,
      doneMinutes,
    };
  }, [trackId, completed]);
}
