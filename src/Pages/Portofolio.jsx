import React, { useEffect, useState, useCallback } from "react";
import { db, collection } from "../firebase";
import { getDocs } from "firebase/firestore";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardProject from "../components/CardProject";
import TechStackIcon from "../components/TechStackIcon";
import AOS from "aos";
import "aos/dist/aos.css";
import Certificate from "../components/Certificate";
import { Code, Award, Boxes } from "lucide-react";

/* ---------- Toggle Button ---------- */
const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="
      px-3 py-1.5 text-slate-300 hover:text-white text-sm font-medium
      transition-all duration-300 ease-in-out flex items-center gap-2
      bg-white/5 hover:bg-white/10 rounded-md border border-white/10
      hover:border-white/20 backdrop-blur-sm group relative overflow-hidden
    "
  >
    <span className="relative z-10 flex items-center gap-2">
      {isShowingMore ? "See Less" : "See More"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-transform duration-300 ${
          isShowingMore
            ? "group-hover:-translate-y-0.5"
            : "group-hover:translate-y-0.5"
        }`}
      >
        <polyline
          points={isShowingMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}
        />
      </svg>
    </span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500/50 transition-all duration-300 group-hover:w-full" />
  </button>
);

/* ---------- TabPanel ---------- */
function TabPanel({ children, value, index }) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 3 } }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const a11yProps = (index) => ({
  id: `full-width-tab-${index}`,
  "aria-controls": `full-width-tabpanel-${index}`,
});

/* ---------- Tech Stack Data ---------- */
const techStacks = [
  { icon: "html.svg", language: "HTML" },
  { icon: "css.svg", language: "CSS" },
  { icon: "javascript.svg", language: "JavaScript" },
  { icon: "tailwind.svg", language: "Tailwind CSS" },
  { icon: "reactjs.svg", language: "ReactJS" },
  { icon: "vite.svg", language: "Vite" },
  { icon: "nodejs.svg", language: "Node JS" },
  { icon: "bootstrap.svg", language: "Bootstrap" },
  { icon: "firebase.svg", language: "Firebase" },
  { icon: "MUI.svg", language: "Material UI" },
  { icon: "vercel.svg", language: "Vercel" },
  { icon: "SweetAlert.svg", language: "SweetAlert2" },
];

/* ---------- Main Component ---------- */
export default function Portofolio() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);

  const isMobile = window.innerWidth < 768;
  const initialItems = isMobile ? 4 : 6;

  useEffect(() => {
    AOS.init({ once: false });
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const [projectSnap, certSnap] = await Promise.all([
        getDocs(collection(db, "projects")),
        getDocs(collection(db, "certificates")),
      ]);

      const projectData = projectSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        TechStack: doc.data().TechStack || [],
      }));

      const certificateData = certSnap.docs.map((doc) => doc.data());

      setProjects(projectData);
      setCertificates(certificateData);
    } catch (err) {
      console.error("Firestore error:", err);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const toggleShowMore = (type) => {
    if (type === "projects") setShowAllProjects((p) => !p);
    else setShowAllCertificates((p) => !p);
  };

  const displayedProjects = showAllProjects
    ? projects
    : projects.slice(0, initialItems);

  const displayedCertificates = showAllCertificates
    ? certificates
    : certificates.slice(0, initialItems);

  return (
    <div
      className="md:px-[10%] px-[5%] w-full mt-[3rem] bg-[#030014] overflow-hidden"
      id="Portofolio"
    >
      {/* ---------- Header ---------- */}
      <div className="text-center pb-10" data-aos="fade-up">
        <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
          Portfolio Showcase
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto mt-2">
          Explore my journey through projects, certifications, and technical
          expertise.
        </p>
      </div>

      {/* ---------- Tabs ---------- */}
      <Box sx={{ width: "100%" }}>
        <AppBar position="static" elevation={0} sx={{ bgcolor: "transparent" }}>
          <Tabs
            value={value}
            onChange={(_, v) => setValue(v)}
            variant="fullWidth"
            textColor="secondary"
            indicatorColor="secondary"
          >
            <Tab icon={<Code />} label="Projects" {...a11yProps(0)} />
            <Tab icon={<Award />} label="Certificates" {...a11yProps(1)} />
            <Tab icon={<Boxes />} label="Tech Stack" {...a11yProps(2)} />
          </Tabs>
        </AppBar>

        {/* ---------- Panels ---------- */}
        <TabPanel value={value} index={0}>
          <div className="grid md:grid-cols-2 2xl:grid-cols-3 gap-5">
            {displayedProjects.map((p, i) => (
              <CardProject key={p.id || i} {...p} />
            ))}
          </div>
          {projects.length > initialItems && (
            <div className="mt-6">
              <ToggleButton
                onClick={() => toggleShowMore("projects")}
                isShowingMore={showAllProjects}
              />
            </div>
          )}
        </TabPanel>

        <TabPanel value={value} index={1}>
          <div className="grid md:grid-cols-3 gap-5">
            {displayedCertificates.map((c, i) => (
              <Certificate key={i} ImgSertif={c.Img} />
            ))}
          </div>
          {certificates.length > initialItems && (
            <div className="mt-6">
              <ToggleButton
                onClick={() => toggleShowMore("certificates")}
                isShowingMore={showAllCertificates}
              />
            </div>
          )}
        </TabPanel>

        <TabPanel value={value} index={2}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {techStacks.map((t, i) => (
              <TechStackIcon
                key={i}
                TechStackIcon={t.icon}
                Language={t.language}
              />
            ))}
          </div>
        </TabPanel>
      </Box>
    </div>
  );
}
