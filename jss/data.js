export const school = {
  name: "RPS Public School",
  fullName: "Rao Pahlad Singh Public School",
  city: "Dharuhera",
  state: "Haryana",
  affiliation: "531312",
  schoolCode: "41300",
  foundation: "2015",
  openingDate: "01 Apr 2015",
  level: "Senior Secondary",
  type: "Independent",
  address: "V.P.O. Ghatal Mahaniyawas, Dharuhera–Bhiwadi Expressway, Dharuhera, Rewari, Haryana 123401",
  phone: "+91-9467064534",
  email: "rpsdharuhera@gmail.com",
  website: "https://rpsdharuhera.edu.in/",
  vision: "RPS states that it aims to nurture upright global citizens, empower students to acquire, demonstrate and articulate knowledge and skills, and pursue excellence through a curriculum combining traditional and progressive education."
};

export const campusFacts = [
  ["12,416", "m² CAMPUS AREA"],
  ["14,397", "m² BUILT-UP AREA"],
  ["4,113", "m² PLAYGROUND"],
  ["85", "CLASSROOMS"],
  ["4,631+", "LIBRARY BOOKS"],
  ["7", "SCIENCE / STEM LABS*"]
];

export const zones = [
  { id: "entrance", name: "MAIN ENTRANCE", title: "Welcome to RPS", position: [0, 5, 38], target: [0, 3, 0], route: "campus" },
  { id: "academic", name: "ACADEMIC QUAD", title: "Academic Environment", position: [-28, 15, 25], target: [-6, 5, 0], route: "academics" },
  { id: "science", name: "SCIENCE & TECHNOLOGY", title: "Science & Technology", position: [28, 13, 18], target: [11, 4, -1], route: "facilities" },
  { id: "library", name: "LIBRARY", title: "Library", position: [24, 11, -20], target: [9, 3, -9], route: "facilities" },
  { id: "activity", name: "ACTIVITY CENTRE", title: "Activity Centre", position: [-25, 11, -17], target: [-11, 3, -7], route: "campus" },
  { id: "sports", name: "SPORTS GROUNDS", title: "Sports & Cricket", position: [5, 16, -45], target: [5, 1, -22], route: "facilities" },
  { id: "overview", name: "CENTRAL CAMPUS", title: "RPS Dharuhera", position: [58, 44, 63], target: [0, 0, 0], route: "explore" }
];

export const details = {
  explore: {
    kicker: "DIGITAL CAMPUS",
    title: "RPS Dharuhera",
    copy: "An interactive digital interpretation of RPS Public School, Dharuhera. The 3D campus geometry is a visualization; factual school information is kept separate and sourced from public school or CBSE records.",
    sections: [
      ["PROFILE", [
        ["Affiliation", "CBSE · 531312"],
        ["School code", "41300"],
        ["Foundation", "2015"],
        ["Level", "Senior Secondary"]
      ]],
      ["LOCATION", [
        ["Address", school.address],
        ["Phone", school.phone],
        ["Email", school.email],
        ["Website", "Official RPS website"]
      ]]
    ],
    sources: [
      ["Official website", school.website],
      ["CBSE affiliation", "https://saras.cbse.gov.in/SARAS/AffiliatedList/AfflicationDetails/531312"]
    ]
  },
  campus: {
    kicker: "CAMPUS",
    title: "Space to learn",
    copy: "CBSE affiliation documentation reports 12,416.372 m² of school campus area, 14,397.353 m² of total built-up area, 4,113 m² of playground area and 85 classrooms.",
    sections: [
      ["CAMPUS DATA", [
        ["Campus", "12,416.372 m²"],
        ["Built-up", "14,397.353 m²"],
        ["Playground", "4,113 m²"],
        ["Classrooms", "85"]
      ]]
    ],
    sources: [
      ["CBSE affiliation document", "https://rpsdharuhera.edu.in/pdf/Affiliation_letter_from_CBSE.pdf"]
    ]
  },
  academics: {
    kicker: "ACADEMICS",
    title: "Learn. Demonstrate. Lead.",
    copy: "RPS describes its academic environment through CBSE education, senior-secondary schooling and preparation/selection pathways that the school publicly highlights across JEE, NEET, NDA, CLAT, CUET and other competitions.",
    sections: [
      ["STUDY ENVIRONMENT", [
        ["Board", "CBSE"],
        ["Senior secondary", "Classes through XII"],
        ["Competitive pathways", "JEE · NEET · NDA · CLAT · CUET"],
        ["Approach", "Traditional + progressive curriculum"]
      ]]
    ],
    sources: [
      ["RPS official website", school.website],
      ["CBSE school record", "https://saras.cbse.gov.in/SARAS/AffiliatedList/AfflicationDetails/531312"]
    ]
  },
  achievements: {
    kicker: "ACHIEVEMENTS",
    title: "A culture of achievement",
    copy: "The school publicly highlights academic results and competitive selections. Recent published pages also include cultural and sports achievements.",
    sections: [
      ["PUBLISHED HIGHLIGHTS", [
        ["JEE", "School-published selections and result pages"],
        ["NEET", "School-published selections and result pages"],
        ["NDA", "School-published selections and result pages"],
        ["KALA KUMBH 2025", "1st position · Live Kathak Duet · Junior category"]
      ]]
    ],
    sources: [
      ["RPS achievements overview", "https://rpsdharuhera.edu.in/"],
      ["KALA KUMBH 2025", "https://rpsdharuhera.edu.in/cultural-Achievement-.aspx"],
      ["Sports achievements", "https://www.rpsdharuhera.edu.in/Sports-Achievements-2627"]
    ]
  },
  facilities: {
    kicker: "FACILITIES",
    title: "Spaces for curiosity",
    copy: "CBSE documentation lists a composite science lab, dedicated Physics, Chemistry, Biology, Mathematics and Computer Science labs, alongside a library containing more than 4,600 books. The school also publishes cricket coaching information.",
    sections: [
      ["LABORATORIES", [
        ["Composite science", "01"],
        ["Physics", "02"],
        ["Chemistry", "02"],
        ["Biology", "02"],
        ["Mathematics", "01"],
        ["Computer Science", "01"]
      ]],
      ["LIBRARY & SPORT", [
        ["Library", "4,631+ books"],
        ["Cricket", "Ground + practice nets + coaching"],
        ["Activities", "Workshops, competitions and student activities"]
      ]]
    ],
    sources: [
      ["CBSE affiliation document", "https://rpsdharuhera.edu.in/pdf/Affiliation_letter_from_CBSE.pdf"],
      ["Cricket facility", "https://rpsdharuhera.edu.in/cricket.aspx"]
    ]
  },
  about: {
    kicker: "OUR VISION",
    title: "Upright global citizens",
    copy: school.vision,
    sections: [
      ["IDENTITY", [
        ["Institution", school.fullName],
        ["Society", "Rao Pahlad Singh Education Society, Mahendergarh"],
        ["Status", "Independent · Senior Secondary"],
        ["Affiliation period", "01 Apr 2024 → 31 Mar 2029"]
      ]]
    ],
    sources: [
      ["RPS official website", school.website],
      ["CBSE school record", "https://saras.cbse.gov.in/SARAS/AffiliatedList/AfflicationDetails/531312"]
    ]
  },
  contact: {
    kicker: "CONTACT",
    title: "Find RPS Dharuhera",
    copy: "Use the official school channels below for admissions, enquiries, records and campus information.",
    sections: [
      ["OFFICIAL CONTACT", [
        ["Phone", school.phone],
        ["Email", school.email],
        ["Location", school.address],
        ["Website", "rpsdharuhera.edu.in"]
      ]]
    ],
    sources: [
      ["Official contact", school.website],
      ["Online admission", "https://dhr.rpscampus.in/"]
    ]
  }
};
