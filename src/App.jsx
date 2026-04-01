import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import * as Tools from './pages/tools';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          
          {/* All tool routes */}
          <Route path="tools/invoice-forge" element={<Tools.InvoiceForge />} />
          <Route path="tools/resume-rocket" element={<Tools.ResumeRocket />} />
          <Route path="tools/contract-craft" element={<Tools.ContractCraft />} />
          <Route path="tools/meet-mate" element={<Tools.MeetMate />} />
          <Route path="tools/focus-flow" element={<Tools.FocusFlow />} />
          <Route path="tools/link-vault" element={<Tools.LinkVault />} />
          <Route path="tools/note-nest" element={<Tools.NoteNest />} />
          <Route path="tools/standup-bot" element={<Tools.StandupBot />} />
          <Route path="tools/budget-buddy" element={<Tools.BudgetBuddy />} />
          <Route path="tools/loan-lens" element={<Tools.LoanLens />} />
          <Route path="tools/coin-flip" element={<Tools.CoinFlip />} />
          <Route path="tools/tax-tally" element={<Tools.TaxTally />} />
          <Route path="tools/split-ease" element={<Tools.SplitEase />} />
          <Route path="tools/net-worth-now" element={<Tools.NetWorthNow />} />
          <Route path="tools/freelance-fee" element={<Tools.FreelanceFee />} />
          <Route path="tools/expense-snap" element={<Tools.ExpenseSnap />} />
          <Route path="tools/flash-genius" element={<Tools.FlashGenius />} />
          <Route path="tools/quiz-forge" element={<Tools.QuizForge />} />
          <Route path="tools/grade-grid" element={<Tools.GradeGrid />} />
          <Route path="tools/study-sync" element={<Tools.StudySync />} />
          <Route path="tools/cite-craft" element={<Tools.CiteCraft />} />
          <Route path="tools/typing-trail" element={<Tools.TypingTrail />} />
          <Route path="tools/mind-map-maker" element={<Tools.MindMapMaker />} />
          <Route path="tools/countdown-class" element={<Tools.CountdownClass />} />
          <Route path="tools/body-check" element={<Tools.BodyCheck />} />
          <Route path="tools/meal-map" element={<Tools.MealMap />} />
          <Route path="tools/hydro-track" element={<Tools.HydroTrack />} />
          <Route path="tools/fit-forge" element={<Tools.FitForge />} />
          <Route path="tools/med-minder" element={<Tools.MedMinder />} />
          <Route path="tools/sleep-score" element={<Tools.SleepScore />} />
          <Route path="tools/mood-log" element={<Tools.MoodLog />} />
          <Route path="tools/step-streak" element={<Tools.StepStreak />} />
          <Route path="tools/palette-pickr" element={<Tools.PalettePickr />} />
          <Route path="tools/gradient-guru" element={<Tools.GradientGuru />} />
          <Route path="tools/qr-quick" element={<Tools.QRQuick />} />
          <Route path="tools/shadow-smith" element={<Tools.ShadowSmith />} />
          <Route path="tools/font-fusion" element={<Tools.FontFusion />} />
          <Route path="tools/icon-snap" element={<Tools.IconSnap />} />
          <Route path="tools/contrast-check" element={<Tools.ContrastCheck />} />
          <Route path="tools/screen-sizer" element={<Tools.ScreenSizer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;