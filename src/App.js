import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";

//pages
import ActivityFeed from "./pages/ActivityFeed/ActivityFeed";
import ActivityDetails from "./pages/ActivityDetails/ActivityDetails";
import Archive from "./pages/Archive/Archive";

const App = () => {
  return (
    <div className="container">
      <Header />
      <Routes>
        <Route path="/activities" element={<ActivityFeed />} />
        <Route path="/activities/:id" element={<ActivityDetails />} />
        <Route path="/archive" element={<Archive />} />
      </Routes>
    </div>
  );
};

export default App;
