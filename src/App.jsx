import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  ABOUT,
  BIOS,
  CLASSES,
  CONTACT,
  DIANE,
  DONATIONS,
  ERROR,
  EVENTS,
  LANDING,
  MEDIA,
  PAST_EVENTS,
  PRESS,
  INTENSIVE,
} from "./constants";
import MainLayout from "./layouts/MainLayout";
import Error404 from "./pages/404";
import About from "./pages/About";
import Bios from "./pages/Bios";
import Classes from "./pages/Classes";
import Contact from "./pages/Contact";
import DianeSharp from "./pages/DianeSharp";
import Donations from "./pages/Donations";
import Events from "./pages/Events";
import Home from "./pages/Home";
import Media from "./pages/Media";
import Press from "./pages/Press";
// import Intensive from "./pages/Intensive";
import { Header, ScrollToTop, ScrollToTopButton } from "./styledGuide";

function withMainLayout(Component) {
  return (
    <MainLayout>
      <Component />
    </MainLayout>
  );
}

function App() {
  return (
    <>
      <Header />
      <ScrollToTop />
      <ScrollToTopButton />
      <Routes>
        <Route path={ABOUT} element={withMainLayout(About)} />
        <Route path={BIOS} element={withMainLayout(Bios)} />
        <Route path={CLASSES} element={withMainLayout(Classes)} />
        <Route path={CONTACT} element={withMainLayout(Contact)} />
        <Route path={DIANE} element={withMainLayout(DianeSharp)} />
        <Route path={DONATIONS} element={withMainLayout(Donations)} />
        <Route path={EVENTS} element={withMainLayout(Events)} />
        <Route path={PAST_EVENTS} element={withMainLayout(Events)} />
        <Route path={LANDING} element={withMainLayout(Home)} />
        <Route path="/" element={withMainLayout(Home)} />
        <Route
          path={`${MEDIA}/:performanceTitle`}
          element={withMainLayout(Media)}
        />
        <Route path={MEDIA} element={withMainLayout(Media)} />
        <Route path={PRESS} element={withMainLayout(Press)} />
        {/* <Route path={INTENSIVE} element={withMainLayout(Intensive)} /> */}
        <Route path={ERROR} element={withMainLayout(Error404)} />
        <Route element={withMainLayout(Error404)} />
      </Routes>
    </>
  );
}

export default App;
