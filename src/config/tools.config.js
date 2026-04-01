import { 
  FileText, Zap, Camera, Video, Music, Code, Cloud, Database, 
  Server, Lock, Mail, MessageCircle, Share2, Download, Upload, 
  Edit, Trash2, Search, Settings, HelpCircle, Users, Bell, 
  Calendar, Clock, Link, Image, Film, Mic, Headphones, Book, 
  Star, Heart, Flag, Award, Briefcase, DollarSign, GraduationCap, 
  Activity, Palette, TrendingUp, Timer, Bookmark, BarChart, 
  Receipt, Coins, Landmark, Handshake, CreditCard, Lightbulb, 
  Brain, Layers, Grid, Type, Eye, Droplet, Moon, Smartphone, Monitor
} from 'lucide-react';

// Create FileCheck alias since it's not available
const FileCheck = FileText;

export const toolsConfig = [
  // 💼 Productivity & Business (8 tools)
  { id: 'invoice-forge', path: '/tools/invoice-forge', name: 'Invoice Forge', description: 'Create professional invoices instantly.', icon: FileCheck, category: 'productivity' },
  { id: 'resume-rocket', path: '/tools/resume-rocket', name: 'Resume Rocket', description: 'Build ATS friendly resumes quickly.', icon: FileText, category: 'productivity' },
  { id: 'contract-craft', path: '/tools/contract-craft', name: 'Contract Craft', description: 'Generate legal contracts easily.', icon: FileText, category: 'productivity' },
  { id: 'meet-mate', path: '/tools/meet-mate', name: 'Meet Mate', description: 'Schedule meetings effortlessly.', icon: Calendar, category: 'productivity' },
  { id: 'focus-flow', path: '/tools/focus-flow', name: 'Focus Flow', description: 'Pomodoro timer for productivity.', icon: Timer, category: 'productivity' },
  { id: 'link-vault', path: '/tools/link-vault', name: 'Link Vault', description: 'Save and organize important links.', icon: Link, category: 'productivity' },
  { id: 'note-nest', path: '/tools/note-nest', name: 'Note Nest', description: 'Take notes with rich formatting.', icon: Bookmark, category: 'productivity' },
  { id: 'standup-bot', path: '/tools/standup-bot', name: 'Standup Bot', description: 'Automate team standup meetings.', icon: Users, category: 'productivity' },
  
  // 💰 Finance & Budget (8 tools)
  { id: 'budget-buddy', path: '/tools/budget-buddy', name: 'Budget Buddy', description: 'Track your monthly expenses.', icon: DollarSign, category: 'finance' },
  { id: 'loan-lens', path: '/tools/loan-lens', name: 'Loan Lens', description: 'Calculate loan payments and interest.', icon: Landmark, category: 'finance' },
  { id: 'coin-flip', path: '/tools/coin-flip', name: 'Coin Flip', description: 'Make decisions with coin toss.', icon: Coins, category: 'finance' },
  { id: 'tax-tally', path: '/tools/tax-tally', name: 'Tax Tally', description: 'Calculate your tax returns.', icon: Receipt, category: 'finance' },
  { id: 'split-ease', path: '/tools/split-ease', name: 'Split Ease', description: 'Split bills with friends.', icon: Handshake, category: 'finance' },
  { id: 'net-worth-now', path: '/tools/net-worth-now', name: 'Net Worth Now', description: 'Calculate your net worth.', icon: TrendingUp, category: 'finance' },
  { id: 'freelance-fee', path: '/tools/freelance-fee', name: 'Freelance Fee', description: 'Calculate freelance rates.', icon: CreditCard, category: 'finance' },
  { id: 'expense-snap', path: '/tools/expense-snap', name: 'Expense Snap', description: 'Scan and track receipts.', icon: Camera, category: 'finance' },
  
  // 🎓 Education & Learning (8 tools)
  { id: 'flash-genius', path: '/tools/flash-genius', name: 'Flash Genius', description: 'Create digital flashcards.', icon: Lightbulb, category: 'education' },
  { id: 'quiz-forge', path: '/tools/quiz-forge', name: 'Quiz Forge', description: 'Create interactive quizzes.', icon: Brain, category: 'education' },
  { id: 'grade-grid', path: '/tools/grade-grid', name: 'Grade Grid', description: 'Calculate your GPA.', icon: BarChart, category: 'education' },
  { id: 'study-sync', path: '/tools/study-sync', name: 'Study Sync', description: 'Collaborative study tool.', icon: Users, category: 'education' },
  { id: 'cite-craft', path: '/tools/cite-craft', name: 'Cite Craft', description: 'Generate citations in APA/MLA.', icon: Book, category: 'education' },
  { id: 'typing-trail', path: '/tools/typing-trail', name: 'Typing Trail', description: 'Improve typing speed.', icon: Type, category: 'education' },
  { id: 'mind-map-maker', path: '/tools/mind-map-maker', name: 'Mind Map Maker', description: 'Create visual mind maps.', icon: Grid, category: 'education' },
  { id: 'countdown-class', path: '/tools/countdown-class', name: 'Countdown Class', description: 'Track exam deadlines.', icon: Clock, category: 'education' },
  
  // 🏥 Health & Lifestyle (8 tools)
  { id: 'body-check', path: '/tools/body-check', name: 'Body Check', description: 'BMI and health calculator.', icon: Activity, category: 'health' },
  { id: 'meal-map', path: '/tools/meal-map', name: 'Meal Map', description: 'Plan your weekly meals.', icon: Droplet, category: 'health' },
  { id: 'hydro-track', path: '/tools/hydro-track', name: 'Hydro Track', description: 'Track water intake.', icon: Droplet, category: 'health' },
  { id: 'fit-forge', path: '/tools/fit-forge', name: 'Fit Forge', description: 'Create workout plans.', icon: Activity, category: 'health' },
  { id: 'med-minder', path: '/tools/med-minder', name: 'Med Minder', description: 'Medication reminders.', icon: Bell, category: 'health' },
  { id: 'sleep-score', path: '/tools/sleep-score', name: 'Sleep Score', description: 'Track sleep quality.', icon: Moon, category: 'health' },
  { id: 'mood-log', path: '/tools/mood-log', name: 'Mood Log', description: 'Journal your emotions.', icon: Heart, category: 'health' },
  { id: 'step-streak', path: '/tools/step-streak', name: 'Step Streak', description: 'Track daily steps.', icon: Activity, category: 'health' },
  
  // 🎨 Design & Developer Tools (8 tools)
  { id: 'palette-pickr', path: '/tools/palette-pickr', name: 'Palette Pickr', description: 'Generate color palettes.', icon: Palette, category: 'design' },
  { id: 'gradient-guru', path: '/tools/gradient-guru', name: 'Gradient Guru', description: 'Create beautiful gradients.', icon: Layers, category: 'design' },
  { id: 'qr-quick', path: '/tools/qr-quick', name: 'QR Quick', description: 'Generate QR codes instantly.', icon: Smartphone, category: 'design' },
  { id: 'shadow-smith', path: '/tools/shadow-smith', name: 'Shadow Smith', description: 'Create CSS shadows.', icon: Layers, category: 'design' },
  { id: 'font-fusion', path: '/tools/font-fusion', name: 'Font Fusion', description: 'Combine Google Fonts.', icon: Type, category: 'design' },
  { id: 'icon-snap', path: '/tools/icon-snap', name: 'Icon Snap', description: 'Browse icon collections.', icon: Grid, category: 'design' },
  { id: 'contrast-check', path: '/tools/contrast-check', name: 'Contrast Check', description: 'Check color contrast.', icon: Eye, category: 'design' },
  { id: 'screen-sizer', path: '/tools/screen-sizer', name: 'Screen Sizer', description: 'Test responsive designs.', icon: Monitor, category: 'design' },
];

// Export getIconByName function (returns the icon component directly)
export const getIconByName = (iconName) => {
  // Since we're now storing actual components, this function is simplified
  // But kept for backward compatibility
  const tool = toolsConfig.find(t => t.id === iconName);
  return tool ? tool.icon : Zap;
};