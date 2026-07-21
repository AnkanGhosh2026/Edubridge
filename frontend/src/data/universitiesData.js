export const DEFAULT_FALLBACK_IMAGE = "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1000&q=80";

export const UNIVERSITIES = [
  {
    id: "harvard-university",
    name: "Harvard University",
    category: "Ivy League & Elite",
    location: "Cambridge, Massachusetts",
    state: "MA",
    type: "Private Research University",
    established: "1636",
    ranking: "#3 National Universities (US News)",
    globalRank: "#4 QS World Ranking",
    acceptanceRate: "3.4%",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1000&q=80",
    badge: "Ivy League",
    overview: "Harvard University is the oldest institution of higher learning in the United States. Renowned worldwide for academic excellence, cutting-edge research facilities, and an unmatched global alumni network across science, business, law, and medicine.",
    
    courses: [
      { degree: "M.S. Computer Science & Engineering", duration: "2 Years", fee: "$54,768 / year", intake: "Fall" },
      { degree: "Master of Business Administration (MBA)", duration: "2 Years", fee: "$73,440 / year", intake: "Fall" },
      { degree: "M.S. Data Science & Analytics", duration: "1.5 Years", fee: "$52,500 / year", intake: "Fall / Spring" },
      { degree: "Master of Public Health (MPH)", duration: "2 Years", fee: "$48,900 / year", intake: "Fall" },
      { degree: "B.S. Electrical Engineering", duration: "4 Years", fee: "$54,768 / year", intake: "Fall" }
    ],

    fees: {
      tuition: "$54,768 – $73,440 / year",
      livingCost: "$21,000 / year (Housing & Meals)",
      healthInsurance: "$4,120 / year",
      booksAndSupplies: "$1,250 / year",
      totalEstimate: "$81,138 – $99,810 / year",
      scholarships: "Need-blind admission for international undergraduate applicants. Generous graduate research assistantships (RA) and teaching assistantships (TA) with 100% tuition coverage + stipend."
    },

    timeline: [
      { phase: "Fall Priority Application", date: "November 1" },
      { phase: "Regular Decision Deadline", date: "January 1" },
      { phase: "Financial Aid & Scholarship Deadline", date: "February 1" },
      { phase: "Decision Announcement", date: "Late March" },
      { phase: "I-20 & Visa Processing Window", date: "April – June" },
      { phase: "Orientation & Semester Start", date: "Late August" }
    ],

    rules: {
      gpa: "Minimum 3.7 / 4.0 (Competitive average: 3.9+)",
      englishTest: "TOEFL iBT min 100 or IELTS min 7.5 (Duolingo English Test accepted in select departments)",
      standardizedTests: "GRE/GMAT required for select Master's programs (GRE Quant 165+ recommended)",
      workRights: "F-1 On-campus work allowed up to 20 hrs/week during semesters. 3-Year STEM OPT extension available for eligible programs."
    },

    regulations: {
      visaType: "F-1 Student Visa / J-1 Exchange Visitor Visa",
      financialProof: "Must demonstrate proof of liquid funds covering full 1st-year tuition & living expenses ($85,000+).",
      healthReq: "Mandatory Harvard Student Health Insurance Plan (SHIP) & immunization records prior to enrollment.",
      statusMaintenance: "Must maintain full-time enrollment status (minimum 12 credit hours per term)."
    },

    campusLife: {
      housing: "12 Residential Houses with historic dining halls, libraries, and vibrant student communities.",
      clubs: "Over 500 active student organizations including tech incubators, debate clubs, and cultural societies.",
      locationVibe: "Suburban Cambridge adjacent to Boston tech corridor, rich historic architecture, vibrant riverfront.",
      climate: "Four distinct seasons with snowy winters (Avg -3°C to 25°C)."
    }
  },

  {
    id: "stanford-university",
    name: "Stanford University",
    category: "STEM & Tech",
    location: "Stanford, California",
    state: "CA",
    type: "Private Research University",
    established: "1885",
    ranking: "#3 National Universities (US News)",
    globalRank: "#5 QS World Ranking",
    acceptanceRate: "3.9%",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1000&q=80",
    badge: "Silicon Valley Hub",
    overview: "Located in the heart of Silicon Valley, Stanford is world-famous for technological innovation, entrepreneurship, and venture-backed startup culture. Alumni include founders of Google, Yahoo, Hewlett-Packard, and Netflix.",

    courses: [
      { degree: "M.S. Computer Science (AI / Systems)", duration: "2 Years", fee: "$57,861 / year", intake: "Fall" },
      { degree: "MBA (Graduate School of Business)", duration: "2 Years", fee: "$79,644 / year", intake: "Fall" },
      { degree: "M.S. Artificial Intelligence & Robotics", duration: "2 Years", fee: "$57,861 / year", intake: "Fall" },
      { degree: "M.S. Management Science & Engineering", duration: "1.5 Years", fee: "$55,200 / year", intake: "Fall" },
      { degree: "B.S. Software Engineering", duration: "4 Years", fee: "$57,861 / year", intake: "Fall" }
    ],

    fees: {
      tuition: "$57,861 – $79,644 / year",
      livingCost: "$24,500 / year (Bay Area housing & living)",
      healthInsurance: "$4,380 / year",
      booksAndSupplies: "$1,400 / year",
      totalEstimate: "$88,141 – $109,924 / year",
      scholarships: "Knight-Hennessy Scholars Program (full funding + living stipend for graduate applicants). Research Assistantships (RA) widely available in CS and Engineering."
    },

    timeline: [
      { phase: "Fall MS Application Deadline", date: "December 6" },
      { phase: "MBA Round 1 Deadline", date: "September 12" },
      { phase: "MBA Round 2 Deadline", date: "January 4" },
      { phase: "Admission Notification", date: "March 15" },
      { phase: "Visa Documentation", date: "April – May" },
      { phase: "Fall Quarter Start", date: "Mid September" }
    ],

    rules: {
      gpa: "Minimum 3.6 / 4.0",
      englishTest: "TOEFL iBT min 100 (IELTS not accepted by most graduate departments)",
      standardizedTests: "GRE optional for select CS tracks; GMAT required for MBA",
      workRights: "CPT internships in Silicon Valley tech giants (Apple, Google, Meta) during summer; 36-month STEM OPT."
    },

    regulations: {
      visaType: "F-1 Visa",
      financialProof: "Bank statement showing proof of $90,000+ for 1st year total cost.",
      healthReq: "Vaden Health Services enrollment & proof of mandatory immunizations.",
      statusMaintenance: "Minimum 10 units per quarter to maintain valid F-1 status."
    },

    campusLife: {
      housing: "8,180-acre sprawling palm-tree campus with modern residential complexes and graduate apartments.",
      clubs: "Stanford AI Lab, Entrepreneurship Club, BASES startup competition.",
      locationVibe: "Sunny Northern California, proximity to San Francisco & San Jose tech ecosystems.",
      climate: "Mediterranean sunshine year-round (Avg 10°C to 28°C)."
    }
  },

  {
    id: "mit",
    name: "Massachusetts Institute of Technology (MIT)",
    category: "STEM & Tech",
    location: "Cambridge, Massachusetts",
    state: "MA",
    type: "Private Research University",
    established: "1861",
    ranking: "#2 National Universities (US News)",
    globalRank: "#1 QS World Ranking",
    acceptanceRate: "4.0%",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=80",
    badge: "World #1 Tech",
    overview: "MIT is globally celebrated for pioneering scientific discovery, advanced computing, engineering marvels, and practical hands-on problem solving. Homes to legendary labs like CSAIL and MIT Media Lab.",

    courses: [
      { degree: "M.Eng. Electrical Engineering & CS", duration: "1.5 Years", fee: "$57,590 / year", intake: "Fall" },
      { degree: "Master of Finance (MFin)", duration: "1 Year", fee: "$86,300 / year", intake: "Fall" },
      { degree: "M.S. Business Analytics (MBAn)", duration: "1 Year", fee: "$86,300 / year", intake: "Fall" },
      { degree: "M.S. Biotechnology & Bioengineering", duration: "2 Years", fee: "$57,590 / year", intake: "Fall" },
      { degree: "B.S. Mechanical Engineering", duration: "4 Years", fee: "$57,590 / year", intake: "Fall" }
    ],

    fees: {
      tuition: "$57,590 – $86,300 / year",
      livingCost: "$20,500 / year",
      healthInsurance: "$3,440 / year",
      booksAndSupplies: "$1,300 / year",
      totalEstimate: "$82,830 – $111,540 / year",
      scholarships: "Full funding via graduate Research Assistantships (RA) and Teaching Assistantships (TA) covering 100% tuition plus monthly living stipend."
    },

    timeline: [
      { phase: "Graduate Application Deadline", date: "December 15" },
      { phase: "Undergraduate Regular Action", date: "January 5" },
      { phase: "Financial Aid Submission", date: "February 15" },
      { phase: "Admission Results Released", date: "Pi Day (March 14)" },
      { phase: "Visa Form I-20 Issuance", date: "April – May" },
      { phase: "Classes Begin", date: "Early September" }
    ],

    rules: {
      gpa: "Minimum 3.8 / 4.0",
      englishTest: "TOEFL iBT min 100 / IELTS min 7.5",
      standardizedTests: "GRE optional or departmental recommendation. Strong math background essential.",
      workRights: "On-campus research positions from day 1. STEM OPT 36-month extension."
    },

    regulations: {
      visaType: "F-1 Student Visa",
      financialProof: "Official bank affidavit demonstrating $88,000+ liquid funds.",
      healthReq: "MIT Student Health Insurance Program (MIT SHIP) mandatory.",
      statusMaintenance: "Full-time registration (minimum 36 MIT units per term)."
    },

    campusLife: {
      housing: "On-campus dormitories along the Charles River with maker spaces and robotics garages.",
      clubs: "MIT Hackathon, Robotics Team, Sloan Entrepreneurship Club.",
      locationVibe: "Urban tech hub filled with innovation labs, biotech corridors, and historic coffee shops.",
      climate: "New England seasonal weather with vibrant foliage and crisp winters."
    }
  },

  {
    id: "columbia-university",
    name: "Columbia University",
    category: "Ivy League & Elite",
    location: "New York City, New York",
    state: "NY",
    type: "Private Research University",
    established: "1754",
    ranking: "#12 National Universities (US News)",
    globalRank: "#23 QS World Ranking",
    acceptanceRate: "3.9%",
    image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=1000&q=80",
    badge: "NYC Ivy League",
    overview: "Set in Manhattan, Columbia offers students unprecedented direct access to Wall Street, global financial institutions, tech giants, media headquarters, and international diplomacy at the United Nations.",

    courses: [
      { degree: "M.S. Data Science", duration: "1.5 Years", fee: "$62,400 / year", intake: "Fall / Spring" },
      { degree: "M.S. Computer Science", duration: "1.5 Years", fee: "$62,400 / year", intake: "Fall / Spring" },
      { degree: "Master of Science in Financial Engineering", duration: "1 Year", fee: "$75,000 / year", intake: "Fall" },
      { degree: "M.S. Journalism & Digital Media", duration: "1 Year", fee: "$69,500 / year", intake: "Fall" },
      { degree: "B.A. Economics & Political Science", duration: "4 Years", fee: "$65,340 / year", intake: "Fall" }
    ],

    fees: {
      tuition: "$62,400 – $75,000 / year",
      livingCost: "$24,000 / year (NYC Housing & Food)",
      healthInsurance: "$4,588 / year",
      booksAndSupplies: "$1,500 / year",
      totalEstimate: "$92,488 – $105,088 / year",
      scholarships: "Merit-based departmental fellowships, Dean's Scholarships for international master's students, and campus employment opportunities."
    },

    timeline: [
      { phase: "Priority Application Deadline", date: "January 15" },
      { phase: "Final Graduate Deadline", date: "February 15" },
      { phase: "Admission Notification", date: "March – April" },
      { phase: "I-20 Document Processing", date: "April – June" },
      { phase: "Fall Semester Orientation", date: "Late August" }
    ],

    rules: {
      gpa: "Minimum 3.5 / 4.0",
      englishTest: "TOEFL iBT min 100 or IELTS min 7.5",
      standardizedTests: "GRE required for Engineering & Data Science (Quant 163+ recommended)",
      workRights: "F-1 CPT eligible for NYC summer internships in banking, tech, and media; 3-Year STEM OPT extension."
    },

    regulations: {
      visaType: "F-1 Visa",
      financialProof: "Bank certification showing minimum $95,000 for 1st-year expenses.",
      healthReq: "Columbia Health Plan enrollment + mandatory COVID & MMR vaccination verification.",
      statusMaintenance: "Minimum 12 credits required per semester for F-1 compliance."
    },

    campusLife: {
      housing: "Historic Morningside Heights campus with apartment-style graduate residences.",
      clubs: "Columbia FinTech Club, Lion LaunchPad startup incubator, Columbia Daily Spectator.",
      locationVibe: "Pulsating Manhattan energy, Central Park proximity, world-class theater, and dining.",
      climate: "Four seasons with humid summers and cold, scenic winters."
    }
  },

  {
    id: "uc-berkeley",
    name: "University of California, Berkeley",
    category: "Public Flagship",
    location: "Berkeley, California",
    state: "CA",
    type: "Public Flagship University",
    established: "1868",
    ranking: "#15 National Universities (US News)",
    globalRank: "#10 QS World Ranking",
    acceptanceRate: "11.4%",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80",
    badge: "#1 Public University",
    overview: "UC Berkeley is widely recognized as the premier public university in the world. Famous for freedom of thought, radical scientific innovation, computer science research, and leadership in social activism.",

    courses: [
      { degree: "M.S. Electrical Engineering & CS (EECS)", duration: "2 Years", fee: "$34,200 / year (Out-of-state)", intake: "Fall" },
      { degree: "Master of Engineering (M.Eng.) Tech Leadership", duration: "1 Year", fee: "$58,000 / year", intake: "Fall" },
      { degree: "Full-Time MBA (Haas School of Business)", duration: "2 Years", fee: "$76,400 / year", intake: "Fall" },
      { degree: "M.S. Information & Data Science (MIDS)", duration: "1.5 Years", fee: "$42,000 / year", intake: "Fall / Spring" },
      { degree: "B.S. Bioengineering", duration: "4 Years", fee: "$44,000 / year", intake: "Fall" }
    ],

    fees: {
      tuition: "$34,200 – $76,400 / year",
      livingCost: "$22,000 / year",
      healthInsurance: "$3,800 / year",
      booksAndSupplies: "$1,350 / year",
      totalEstimate: "$61,350 – $103,550 / year",
      scholarships: "Graduate Student Instructor (GSI) and Graduate Student Researcher (GSR) positions providing partial to full tuition remissions and stipends."
    },

    timeline: [
      { phase: "UC Systemwide Application Window", date: "October 1 – November 30" },
      { phase: "Engineering Graduate Deadline", date: "December 15" },
      { phase: "Admission Notification", date: "Late February – March" },
      { phase: "Statement of Intent to Register (SIR)", date: "April 15 / May 1" },
      { phase: "Visa Processing", date: "May – July" },
      { phase: "Fall Term Commences", date: "Late August" }
    ],

    rules: {
      gpa: "Minimum 3.5 / 4.0",
      englishTest: "TOEFL iBT min 90 or IELTS min 7.0",
      standardizedTests: "GRE optional for many departments; check departmental specifications.",
      workRights: "On-campus jobs available; CPT approved for summer internships; 36-month STEM OPT."
    },

    regulations: {
      visaType: "F-1 / J-1 Visas",
      financialProof: "Financial verification showing at least $68,000 (out-of-state public rate).",
      healthReq: "UC Student Health Insurance Plan (SHIP) required.",
      statusMaintenance: "Must maintain a full course load (min 12 units/semester)."
    },

    campusLife: {
      housing: "Co-op housing communities, graduate halls overlooking San Francisco Bay.",
      clubs: "Cal Hacks (world's largest collegiate hackathon), Berkeley Blockchain, Haas Tech Club.",
      locationVibe: "Vibrant Bay Area college town with stunning views of Golden Gate Bridge.",
      climate: "Mild, comfortable coastal weather year-round."
    }
  },

  {
    id: "nyu",
    name: "New York University (NYU)",
    category: "Business & Finance",
    location: "New York City, New York",
    state: "NY",
    type: "Private Research University",
    established: "1831",
    ranking: "#35 National Universities (US News)",
    globalRank: "#38 QS World Ranking",
    acceptanceRate: "12.2%",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80",
    badge: "Wall Street & Tech",
    overview: "NYU has an unmatched urban campus integrated seamlessly into Greenwich Village and Brooklyn Tech Triangle. Home to NYU Stern School of Business and Tandon School of Engineering.",

    courses: [
      { degree: "M.S. Computer Science (Tandon)", duration: "2 Years", fee: "$54,900 / year", intake: "Fall / Spring" },
      { degree: "MS in Financial Economics (Stern)", duration: "1 Year", fee: "$78,200 / year", intake: "Fall" },
      { degree: "M.S. Cyber Security", duration: "2 Years", fee: "$54,900 / year", intake: "Fall / Spring" },
      { degree: "M.S. Integrated Marketing", duration: "1.5 Years", fee: "$49,800 / year", intake: "Fall / Spring" },
      { degree: "B.S. Business Administration", duration: "4 Years", fee: "$58,168 / year", intake: "Fall" }
    ],

    fees: {
      tuition: "$49,800 – $78,200 / year",
      livingCost: "$23,500 / year",
      healthInsurance: "$4,200 / year",
      booksAndSupplies: "$1,400 / year",
      totalEstimate: "$78,900 – $107,300 / year",
      scholarships: "NYU Tandon Merit Scholarships (offering up to 50% tuition reduction for top international MS applicants). NYU Stern Merit Grants."
    },

    timeline: [
      { phase: "Fall Priority Deadline", date: "December 1" },
      { phase: "Regular Graduate Deadline", date: "February 15" },
      { phase: "Spring Intake Deadline", date: "October 1" },
      { phase: "Admission Notification", date: "March – April" },
      { phase: "I-20 Form Request", date: "April – June" },
      { phase: "Classes Begin", date: "Early September" }
    ],

    rules: {
      gpa: "Minimum 3.3 / 4.0",
      englishTest: "TOEFL iBT min 90 or IELTS min 7.0 or Duolingo min 125",
      standardizedTests: "GRE optional for select Tandon programs; GMAT/GRE required for Stern MBA",
      workRights: "20 hours/week on-campus work. Proximity to Silicon Alley for CPT internships."
    },

    regulations: {
      visaType: "F-1 Visa",
      financialProof: "Proof of funds covering at least $82,000 for year 1.",
      healthReq: "NYU Health Insurance & immunization compliance mandatory.",
      statusMaintenance: "Minimum 9–12 graduate credits depending on school rules."
    },

    campusLife: {
      housing: "Washington Square residence halls, Brooklyn residence towers.",
      clubs: "NYU Stern Finance Society, NYU Entrepreneurs Network, Women in Tech.",
      locationVibe: "Unfiltered Greenwich Village and Manhattan culture, iconic parks, infinite career networking.",
      climate: "Dynamic 4-season climate."
    }
  },

  {
    id: "ut-austin",
    name: "University of Texas at Austin",
    category: "Public Flagship",
    location: "Austin, Texas",
    state: "TX",
    type: "Public Research University",
    established: "1883",
    ranking: "#32 National Universities (US News)",
    globalRank: "#58 QS World Ranking",
    acceptanceRate: "29%",
    image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=1000&q=80",
    badge: "Silicon Hills Hub",
    overview: "UT Austin sits at the epicenter of Austin's booming tech corridor 'Silicon Hills' (Tesla, Oracle, Dell, Apple, Samsung). Offers world-class engineering and business programs at affordable public tuition rates.",

    courses: [
      { degree: "M.S. Computer Science", duration: "2 Years", fee: "$28,500 / year (Out-of-state)", intake: "Fall" },
      { degree: "M.S. Business Analytics (MSBA)", duration: "1 Year", fee: "$48,000 / year", intake: "Summer / Fall" },
      { degree: "M.S. Petroleum & Energy Engineering", duration: "2 Years", fee: "$28,500 / year", intake: "Fall / Spring" },
      { degree: "M.S. Electrical & Computer Engineering", duration: "2 Years", fee: "$28,500 / year", intake: "Fall" },
      { degree: "B.S. Biomedical Engineering", duration: "4 Years", fee: "$40,996 / year", intake: "Fall" }
    ],

    fees: {
      tuition: "$28,500 – $48,000 / year",
      livingCost: "$14,500 / year (Affordable Texas cost of living)",
      healthInsurance: "$3,100 / year",
      booksAndSupplies: "$1,100 / year",
      totalEstimate: "$47,200 – $66,700 / year",
      scholarships: "Competitive Texas Competitive Waiver (reduces tuition to in-state rates for qualified international graduate assistants), saving up to $15,000/year."
    },

    timeline: [
      { phase: "Fall MS Application Deadline", date: "December 15" },
      { phase: "Spring MS Deadline", date: "September 1" },
      { phase: "Admission Results", date: "February – March" },
      { phase: "Visa Document Issuance", date: "April – May" },
      { phase: "Fall Orientation", date: "Mid-August" }
    ],

    rules: {
      gpa: "Minimum 3.4 / 4.0",
      englishTest: "TOEFL iBT min 79 or IELTS min 6.5",
      standardizedTests: "GRE required for CS and ECE departments (Quant 160+ recommended)",
      workRights: "On-campus research positions; CPT in booming Austin tech market; 3-Year STEM OPT."
    },

    regulations: {
      visaType: "F-1 Student Visa",
      financialProof: "Proof of $52,000+ liquid funds for out-of-state tuition and living.",
      healthReq: "UT Academic HealthPlans insurance mandatory for international students.",
      statusMaintenance: "Maintain 9 graduate credit hours per term."
    },

    campusLife: {
      housing: "West Campus student apartments, affordable off-campus housing near UT Shuttle routes.",
      clubs: "Longhorn Developer Group, Texas AI Association, UT Austin Rocket Team.",
      locationVibe: "Live music capital of the world, tech industry growth, zero state income tax in Texas.",
      climate: "Warm sunny weather with long summers (Avg 15°C to 36°C)."
    }
  },

  {
    id: "carnegie-mellon",
    name: "Carnegie Mellon University (CMU)",
    category: "STEM & Tech",
    location: "Pittsburgh, Pennsylvania",
    state: "PA",
    type: "Private Research University",
    established: "1900",
    ranking: "#24 National Universities (US News)",
    globalRank: "#52 QS World Ranking",
    acceptanceRate: "11.0%",
    image: "https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?auto=format&fit=crop&w=1000&q=80",
    badge: "#1 AI & Robotics",
    overview: "CMU is world-famous for founding the world's first Computer Science department. It consistently ranks #1 globally in Artificial Intelligence, Software Engineering, Cybersecurity, and Robotics.",

    courses: [
      { degree: "M.S. in Computer Science (MSCS)", duration: "1.5 Years", fee: "$54,000 / year", intake: "Fall" },
      { degree: "Master of Software Engineering (MSE)", duration: "1.5 Years", fee: "$56,500 / year", intake: "Fall" },
      { degree: "M.S. in Machine Learning (MSML)", duration: "2 Years", fee: "$54,000 / year", intake: "Fall" },
      { degree: "M.S. Information Technology Management (MISM)", duration: "1 Year", fee: "$52,000 / year", intake: "Fall / Spring" },
      { degree: "B.S. Artificial Intelligence", duration: "4 Years", fee: "$58,924 / year", intake: "Fall" }
    ],

    fees: {
      tuition: "$52,000 – $58,924 / year",
      livingCost: "$16,000 / year (Moderate Pittsburgh living cost)",
      healthInsurance: "$3,650 / year",
      booksAndSupplies: "$1,200 / year",
      totalEstimate: "$72,850 – $79,774 / year",
      scholarships: "Heinz College merit scholarships, Robotics Institute research fellowships, and teaching assistantships."
    },

    timeline: [
      { phase: "Early CS Deadline", date: "December 1" },
      { phase: "Final CS Deadline", date: "December 15" },
      { phase: "Admission Notification", date: "March 1" },
      { phase: "I-20 Form Request", date: "April 15" },
      { phase: "Fall Classes Begin", date: "Late August" }
    ],

    rules: {
      gpa: "Minimum 3.6 / 4.0",
      englishTest: "TOEFL iBT min 100 (Subscores 25+ in all bands) or IELTS min 7.5",
      standardizedTests: "GRE general test required for School of Computer Science (Quant 167+ recommended)",
      workRights: "On-campus research; CPT internships with top US software and robotics companies; 3-Year STEM OPT."
    },

    regulations: {
      visaType: "F-1 Student Visa",
      financialProof: "Proof of liquid funds covering $78,000+ for year 1.",
      healthReq: "CMU Student Health Insurance mandatory.",
      statusMaintenance: "Maintain 36 CMU units (full-time) per semester."
    },

    campusLife: {
      housing: "Oakland neighborhood student housing, graduate dormitories.",
      clubs: "CMU Tartans Hacking, CMU Robotics Club, Game Creation Society.",
      locationVibe: "Friendly Pittsburgh tech city, robotics alley, rich museum district.",
      climate: "Classic 4 seasons with beautiful autumn foliage and snowy winter."
    }
  }
];

export const CATEGORIES = [
  "All",
  "Ivy League & Elite",
  "STEM & Tech",
  "Business & Finance",
  "Public Flagship"
];
