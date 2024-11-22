import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Page from '../../layouts/Page';
import { fetchPage } from '../../redux/slices/pageSlice';
import Loading from '../Loading';
import MobileBios from './MobileBios';
import { RootState, AppDispatch } from '../../redux/store';

export default function Bios() {
  const dispatch = useDispatch<AppDispatch>();
  const { data: page, meta: pageMeta } = useSelector(
    (state: RootState) => state.page
  );

  useEffect(() => {
    if (pageMeta.status === 'idle') {
      dispatch(fetchPage('bios'));
    }
  }, [dispatch, pageMeta.status]);

  if (pageMeta.status === 'loading') {
    return <Loading />;
  }

  if (!page) {
    return <Loading />;
  }

  const { options, $pageName, ...headerBanner } = page;

  return (
    <Page headerBanner={headerBanner}>
      <MobileBios />
    </Page>
  );
}
