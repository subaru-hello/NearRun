import { useEffect } from 'react';
import type { FC } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import AllTracks from 'components/ecosystems/AllTracks';
import TrackListByPrefecture from 'components/ecosystems/TrackListByPrefecture';
import TracksFrame from 'components/templates/TracksFrame';
import TrackCommentNew from 'components/organisms/TrackCommentNew';
import TrackMockEco from 'components/ecosystems/TrackMockEco';
import Home from 'components/templates/Home';

import TrackMockAddEco from 'components/ecosystems/TrackMockAddEco';
import TrackMockFrame from 'components/templates/TrackMockFrame';

const IndexRoutes: FC = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [hash, pathname]);

  return (
    <Routes>
      <Route path="mock" element={<TrackMockFrame />}>
        <Route path="" element={<TrackMockEco />} />
        <Route path="new" element={<TrackMockAddEco />} />
      </Route>
      <Route path="tracks" element={<TracksFrame />}>
        <Route path="" element={<AllTracks my={12} />} />
        <Route
          path=":prefectureID"
          element={<TrackListByPrefecture my={12} />}
        />
        <Route path="new" element={<TrackCommentNew />} />
      </Route>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default IndexRoutes;
