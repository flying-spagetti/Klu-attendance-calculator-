"use client"
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Loader2, Calculator, User, Book, Calendar, AlertTriangle, Clock, Users, Star,
  GithubIcon, TwitterIcon, LinkedinIcon, Moon, Sun, Bookmark, School
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

const NavBar: React.FC<{ darkMode: boolean; toggleDarkMode: () => void }> = ({ darkMode, toggleDarkMode }) => (
  <nav className={`${darkMode ? 'bg-gray-900' : 'bg-[#A41D24]'} p-4 transition-colors duration-300`}>
    <div className="container mx-auto flex justify-between items-center">
      <h1 className="text-white text-2xl font-bold flex items-center">
        <School className="mr-2" /> KL Attendance Calculator
      </h1>
      <div className="flex items-center space-x-4">
        <a href="/" className="text-white hover:text-gray-200">Home</a>
        <a href="/about" className="text-white hover:text-gray-200">About</a>
        <a href="#contact" className="text-white hover:text-gray-200" onClick={() => {
          const contactElement = document.getElementById('contact');
          if (contactElement) {
            window.scrollTo({ top: contactElement.offsetTop, behavior: 'smooth' });
          }
        }}>Contact</a>
        <Switch
          checked={darkMode}
          onCheckedChange={toggleDarkMode}
          className="ml-4"
        />
        {darkMode ? <Moon className="text-white ml-2" /> : <Sun className="text-white ml-2" />}
      </div>
    </div>
  </nav>
);

const Footer: React.FC<{ darkMode: boolean }> = ({ darkMode }) => (
  <footer id="contact" className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-[#A41D24] text-white'} p-4 mt-8 transition-colors duration-300`}>
    <div className="container mx-auto text-center">
      <p>
        &copy; Developed and Maintained by{" "}
        <a href="https://gnanportfolio.vercel.app" className="text-white hover:text-gray-300" target="_blank" rel="noopener noreferrer">Gnaneswar Lopinti</a>
        <span> 2200031247</span>
      </p>
      <div className="flex justify-center mt-2">
        <a href="https://x.com/ImGnAn_30" className="mr-4" target="_blank" rel="noopener noreferrer">
          <TwitterIcon className="text-white hover:text-gray-300" />
        </a>
        <a href="https://www.linkedin.com/in/gnaneswar-lopinti-5bb480109?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="mr-4" target="_blank" rel="noopener noreferrer">
          <LinkedinIcon className="text-white hover:text-gray-300" />
        </a>
        <a href="https://github.com/flying-spagetti" className="mr-4" target="_blank" rel="noopener noreferrer">
          <GithubIcon className="text-white hover:text-gray-300" />
        </a>
      </div>
    </div>
  </footer>
);

const AttendanceCalculator = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [attendance, setAttendance] = useState({
    lecturesAttended: 0,
    lecturesTotal: 0,
    tutorialsAttended: 0,
    tutorialsTotal: 0,
    practicalsAttended: 0,
    practicalsTotal: 0,
    seminarsAttended: 0,
    seminarsTotal: 0,
  });

  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const calculateAttendance = () => {
    setLoading(true);
    setError(null);

    setTimeout(() => {
      let totalAttended = 0;
      let totalClasses = 0;
      let errorMessage = "";

      Object.entries(attendance).forEach(([key, value]) => {
        if (key.endsWith('Attended')) {
          const totalKey = key.replace('Attended', 'Total');
          if (value > attendance[totalKey as keyof typeof attendance]) {
            errorMessage += `${key} cannot be greater than ${totalKey}. `;
          } else {
            totalAttended += value;
            totalClasses += attendance[totalKey as keyof typeof attendance];
          }
        }
      });

      if (errorMessage) {
        setError(errorMessage);
        setResult(null);
      } else if (totalClasses === 0) {
        setError("Total classes cannot be zero across all components.");
        setResult(null);
      } else {
        const attendancePercentage = (totalAttended / totalClasses) * 100;
        setResult(attendancePercentage);
      }

      setLoading(false);
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const value = Math.max(0, parseInt(e.target.value) || 0);
    setAttendance(prev => ({ ...prev, [field]: value }));
  };

  const renderInputField = (type: string, label: string, icon: JSX.Element) => (
    <div className="flex flex-col space-y-2">
      <label className={`block text-lg font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'} capitalize flex items-center`}>
        {icon}
        <span className="ml-2">{label}</span>
      </label>
      <Input
        type="number"
        value={attendance[type as keyof typeof attendance]} // Ensure 'type' is a key of 'attendance'
        onChange={(e) => handleInputChange(e, type as 'lecturesAttended' | 'lecturesTotal' | 'tutorialsAttended' | 'tutorialsTotal' | 'practicalsAttended' | 'practicalsTotal' | 'seminarsAttended' | 'seminarsTotal')}
        className={`w-full ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}
        placeholder={`Enter ${label.toLowerCase()}`}
        min="0"
      />
    </div>
  );

  return (
<motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} font-helvetica transition-colors duration-300`}
    >
      <NavBar darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />
      <main className="container mx-auto px-4 py-8">
        <Card className={`mb-8 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'} shadow-lg transition-colors duration-300`}>
          <CardHeader>
            <CardTitle className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-[#A41D24]'} flex items-center`}>
              <Calculator className="mr-2" /> Attendance Calculator
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {renderInputField("lecturesAttended", "Lectures Attended", <Book className="w-5 h-5" />)}
              {renderInputField("lecturesTotal", "Total Lectures", <Bookmark className="w-5 h-5" />)}
              {renderInputField("tutorialsAttended", "Tutorials Attended", <Book className="w-5 h-5" />)}
              {renderInputField("tutorialsTotal", "Total Tutorials", <Bookmark className="w-5 h-5" />)}
              {renderInputField("practicalsAttended", "Practicals Attended", <Book className="w-5 h-5" />)}
              {renderInputField("practicalsTotal", "Total Practicals", <Bookmark className="w-5 h-5" />)}
              {renderInputField("seminarsAttended", "Skill Sessions Attended", <Book className="w-5 h-5" />)}
              {renderInputField("seminarsTotal", "Total Skill Sessions", <Bookmark className="w-5 h-5" />)}
            </div>
            <Button
              onClick={calculateAttendance}
              className={`mt-6 w-full ${darkMode ? 'bg-[#A41D24] hover:bg-[#8A1820]' : 'bg-[#A41D24] hover:bg-[#8A1820]'} text-white transition-colors duration-300`}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Calculator className="mr-2 h-4 w-4" />
              )}
              {loading ? "Calculating..." : "Calculate Attendance"}
            </Button>
          </CardContent>
        </Card>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Alert variant="destructive" aria-live="assertive" className={darkMode ? 'bg-gray-700 text-white' : ''}>
              <AlertTitle className="text-2xl font-bold flex items-center">
                <AlertTriangle className="mr-2" />
                Error in Calculation
              </AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </motion.div>
        )}

        {result !== null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Alert variant={result < 85 ? "destructive" : "default"} aria-live="assertive" className={darkMode ? 'bg-gray-700 text-white' : ''}>
              <AlertTitle className="text-2xl font-bold flex items-center">
                {result < 85 ? <AlertTriangle className="mr-2" /> : <User className="mr-2" />}
                Overall Attendance: {result.toFixed(2)}%
              </AlertTitle>
              <AlertDescription>
                {result < 75
                  ? "Warning: Your attendance is below the required threshold of 75%!"
                  : result >= 75 && result < 85
                    ? "You can be permitted on submission of medical certificate."
                    : "Great job maintaining your attendance!"}
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        <Card className={`mt-8 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'} shadow-lg transition-colors duration-300`}>
          <CardHeader>
            <p className="text-2xl font-bold flex items-center">This Calculation component is yet to finalise in the coming two days..</p>
            <CardTitle className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#A41D24]'} flex items-center`}>
              <Book className="mr-2" /> Attendance Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
              <li>The Student must maintain a minimum attendance of 85%.</li>
              <li>Attendance is calculated based on lectures, practicals, tutorials, and skill sessions.</li>
              <li>Ensure you input accurate numbers for calculations to be correct.</li>
              <li>Contact the administration if you have concerns about attendance records.</li>
            </ul>
          </CardContent>

          <CardHeader>
            <CardTitle className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#A41D24]'} flex items-center`}>
              <Calendar className="mr-2 h-6 w-6" />
              Upcoming Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              {[
                { icon: Users, title: "Personalized Attendance Calculation", description: "Tailored attendance calculations for each academic batch (Freshman, Sophomore, Junior, Senior) based on the university's schedule." },
                { icon: Clock, title: "Cluster-Wise Timetable Breakdown", description: "Detailed timetables broken down by year and cluster, enabling precise attendance tracking for each subject you choose." },
                { icon: Calendar, title: "Smart Leave Planner", description: "A calendar feature that recommends the best days to take leave, maximizing your holidays while minimizing class absences." },
                { icon: Star, title: "Advance Event Notifications", description: "Stay informed about major events like hackathons, learnathons, and college fests ahead of time, so you can plan accordingly." }
              ].map(({ icon: Icon, title, description }, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <Icon className={`h-8 w-8 ${darkMode ? 'text-white' : 'text-[#A41D24]'}`} />
                  <div>
                    <h3 className={`font-semibold text-lg ${darkMode ? 'text-white' : 'text-[#A41D24]'}`}>{title}</h3>
                    <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer darkMode={darkMode} />
    </motion.div>
  );
};

export default AttendanceCalculator;
