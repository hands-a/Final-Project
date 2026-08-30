import imgFlutter from '../assets/photo/0dbfcc7a59cd1cf16282.png';
import imgAws from '../assets/photo/amazon.jpg';
import imgCsharp from '../assets/photo/C_Sharp_wordmark.svg.png';
import imgKotlin from '../assets/photo/kotlin.png';
import imgGit from '../assets/photo/Git-logo.svg.png';
import imgGo from '../assets/photo/Go_Logo_Blue.svg.png';
import imgNext from '../assets/photo/Icon_dark_background.png';
import imgJava from '../assets/photo/Java_programming_language_logo.svg.png';
import imgJenkins from '../assets/photo/Jenkins_logo.svg.png';
import imgKali from '../assets/photo/Kali-dragon-icon.svg.png';
import imgLaravel from '../assets/photo/Laravel.svg.png';
import imgMysql from '../assets/photo/MySQL_logo.svg.png';
import imgNode from '../assets/photo/Node.js_logo.svg.png';
import imgPython from '../assets/photo/Python-logo-notext.svg.png';
import imgRuby from '../assets/photo/Ruby_logo.svg.png';
import imgSvelte from '../assets/photo/Svelte_Logo.svg.png';
import imgSwift from '../assets/photo/swift-og.png';
import imgLinux from '../assets/photo/Tux.svg.png';
import imgVue from '../assets/photo/Vue.js_Logo_2.svg.png';
import imgReact from '../assets/photo/React.png';
import imgAngular from '../assets/photo/OIP (1).webp';
import imgMongo from '../assets/photo/OIP.webp';
import imgTensor from '../assets/photo/OIP (2).webp';
import imgDocker from '../assets/photo/R.jpg';

// ─────────────────────────────────────────────────────────────────
// STATIC COURSE DATASET
// Migrated from Strapi export (March 2026).
// IDs 1-25 are the application's internal sequential IDs.
// strapiId = original Strapi numeric ID.
// documentId = Strapi documentId (preserved for reference).
// Each course embeds its lesson(s) directly — no Strapi required.
// Image URLs (/uploads/...) pointed to localhost; replaced with
// local assets from src/assets/photo/.
// C# lesson videoUrl was a localhost:1337 admin URL — set to null.
// ─────────────────────────────────────────────────────────────────

export const coursesData = [

  // ==================== Front-End Track ====================
  {
    id: 1,
    strapiId: 64,
    documentId: "i749jtat26bigy69l67b153v",
    title: "Modern React.js 18 & Redux Toolkit",
    instructor: "Abdullah Sayed",
    rating: 4.8,
    duration: "25 Hours",
    level: "Beginner",
    price: 49.99,
    category: "Front-end",
    image: imgReact,
    description: "Master modern React.js from scratch. Build real-world applications using Hooks, Context API, Redux Toolkit, and React Router.",
    requirements: "Basic knowledge of HTML, CSS, and modern JavaScript (ES6+).",
    lessons: [
      {
        id: 2,
        documentId: "p2zrs9a9z6ey8b0724qi689z",
        title: "Modern React.js 18 & Redux Toolkit",
        videoUrl: "https://www.youtube.com/watch?v=TtPXvEcE11E&t=20172s",
        duration: "25 Hours",
        isFreePreview: true,
      }
    ]
  },
  {
    id: 2,
    strapiId: 77,
    documentId: "qt6gutnht6ocdhnf1bcecjoy",
    title: "Next.js 14: The Complete Guide",
    instructor: "Rana Wael",
    rating: 4.8,
    duration: "18 Hours",
    level: "Advanced",
    price: 50,
    category: "Front-end",
    image: imgNext,
    description: "Build full-stack, SEO-friendly React applications using Next.js 14. Learn App Router, Server Components, and Server Actions.",
    requirements: "Solid understanding of React.js and JavaScript.",
    lessons: [
      {
        id: 4,
        documentId: "vw07m33skh4ihfgwcguvtpfn",
        title: "Next.js 14: The Complete Guide",
        videoUrl: "https://www.youtube.com/watch?v=Sklc_fQBmcs",
        duration: "18 Hours",
        isFreePreview: false,
      }
    ]
  },
  {
    id: 3,
    strapiId: 65,
    documentId: "j3734t3c9wf0i83tqzzvdass",
    title: "Mastering Angular 17",
    instructor: "Ahmed Sayed",
    rating: 4.5,
    duration: "32 Hours",
    level: "Advanced",
    price: 30,
    category: "Front-end",
    image: imgAngular,
    description: "Comprehensive guide to Angular 17. Learn signals, standalone components, RxJS, and enterprise-level application architecture.",
    requirements: "HTML, CSS, JavaScript, and basic understanding of TypeScript.",
    lessons: [
      {
        id: 6,
        documentId: "wm4mlkho4499yjt51onst6la",
        title: "Mastering Angular 17",
        videoUrl: "https://www.youtube.com/watch?v=jSgyjJoOBbc&list=PLkzso0fG0dbCIot9jtVReV-126k6fd6tu",
        duration: "32 Hours",
        isFreePreview: false,
      }
    ]
  },
  {
    id: 4,
    strapiId: 60,
    documentId: "fip7mv15tcz5056rureh5yn8",
    title: "Vue.js 3: The Complete Guide",
    instructor: "Hamza Nour",
    rating: 4.1,
    duration: "15 Hours",
    level: "Beginner",
    price: 35,
    category: "Front-end",
    image: imgVue,
    description: "Complete guide to Vue 3. Learn the Options API, Composition API, Vue Router, and Pinia for state management.",
    requirements: "Basic HTML, CSS, and JavaScript knowledge.",
    lessons: [
      {
        id: 53,
        documentId: "q2uh9ryftmtwuj8k2xf6164i",
        title: "Vue.js 3: The Complete Guide",
        videoUrl: "https://www.youtube.com/watch?v=YrxBCBibVo0&list=PL4cUxeGkcC9hYYGbV60Vq3IXYNfDk8At1",
        duration: "15 Hours",
        isFreePreview: false,
      }
    ]
  },
  {
    id: 5,
    strapiId: 63,
    documentId: "hpnbkmu9gdxrilq31hqh3fhg",
    title: "Svelte & SvelteKit: The Future",
    instructor: "Mostafa Hassan",
    rating: 4.8,
    duration: "8 Hours",
    level: "Intermediate",
    price: 20,
    category: "Front-end",
    image: imgSvelte,
    description: "Learn Svelte, the truly reactive framework without the virtual DOM overhead, and build full-stack apps with SvelteKit.",
    requirements: "Good grasp of Vanilla JavaScript and DOM manipulation.",
    lessons: [
      {
        id: 10,
        documentId: "uriqrq1yyh5xmz8za4e94lvp",
        title: "Svelte & SvelteKit: The Future",
        videoUrl: "https://www.youtube.com/watch?v=aYyZUDFZTrM",
        duration: "8 Hours",
        isFreePreview: null,
      }
    ]
  },
  {
    id: 6,
    strapiId: 80,
    documentId: "tc8ojodciefof4mh96v07yja",
    title: "Tailwind CSS Styling Masterclass",
    instructor: "Abdelrahman Mostafa",
    rating: 4.7,
    duration: "10 Hours",
    level: "Beginner",
    price: 0,
    category: "Front-end",
    image: imgAngular, // OIP (1).webp used as placeholder — original was Tailwind SVG (no local equiv mapping)
    description: "Master utility-first CSS. Build responsive, beautiful UI components and full landing pages rapidly using Tailwind CSS.",
    requirements: "Basic understanding of HTML and standard CSS.",
    lessons: [
      {
        id: 12,
        documentId: "wwdgjm1dk9kfd8b2qotygiox",
        title: "Tailwind CSS Styling Masterclass",
        videoUrl: "https://www.youtube.com/watch?v=6biMWgD6_JY&t=159s",
        duration: "10 Hours",
        isFreePreview: true,
      }
    ]
  },

  // ==================== Back-End Track ====================
  {
    id: 7,
    strapiId: 72,
    documentId: "o2orhimiwqokgo5xja0ztwoz",
    title: "Node.js & Express Bootcamp",
    instructor: "Yamen Abdullah",
    rating: 4.7,
    duration: "20 Hours",
    level: "Intermediate",
    price: 40,
    category: "Back-End",
    image: imgNode,
    description: "Build robust RESTful APIs with Node.js, Express, and MongoDB. Learn authentication, security, and deployment.",
    requirements: "Strong foundation in JavaScript.",
    lessons: [
      {
        id: 14,
        documentId: "edpb8enge5lc21s5ieq5flnj",
        title: "Node.js & Express Bootcamp",
        videoUrl: "https://www.youtube.com/watch?v=Oe421EPjeBE",
        duration: "20 Hours",
        isFreePreview: false,
      }
    ]
  },
  {
    id: 8,
    strapiId: 74,
    documentId: "pxj6mik4tyrirdvma5qnsoih",
    title: "PHP & Laravel 10 for Beginners",
    instructor: "Yazan Abdullah",
    rating: 4.6,
    duration: "22 Hours",
    level: "Beginner",
    price: 20,
    category: "Back-End",
    image: imgLaravel,
    description: "Learn PHP from scratch and transition into building modern, secure MVC applications using the Laravel 10 framework.",
    requirements: "Basic PHP and programming concepts.",
    lessons: [
      {
        id: 16,
        documentId: "mm0sue5hbtpoqqanoilk9i5i",
        title: "PHP & Laravel 10 for Beginners",
        videoUrl: "https://www.youtube.com/watch?v=Rz6SMgKrSYE&list=PL0eyrZgxdwhy7Woo2VRRDMmTXXYT_iaYO",
        duration: "22 Hours",
        isFreePreview: null,
      }
    ]
  },
  {
    id: 9,
    strapiId: 55,
    documentId: "arewclog76ee00e3r56ntiac",
    title: "Java Spring Boot Masterclass",
    instructor: "Rana Abdullah",
    rating: 5,
    duration: "50 Hours",
    level: "Advanced",
    price: 100,
    category: "Back-End",
    image: imgJava,
    description: "Enterprise application development with Java. Master Spring Boot, Spring Security, JPA/Hibernate, and Microservices.",
    requirements: "Solid understanding of Java Core and Object-Oriented Programming.",
    lessons: [
      {
        id: 18,
        documentId: "eyhqwvwvuyg0cd1yb77emumn",
        title: "Java Spring Boot Masterclass",
        videoUrl: "https://www.youtube.com/watch?v=gQHs8pnlagM&list=PLhfxuQVMs-nzbKxB2Zb7F9kjXntJhcP5k",
        duration: "40 Hours",
        isFreePreview: null,
      }
    ]
  },
  {
    id: 10,
    strapiId: 56,
    documentId: "ffk9aaqrgg6nraboy3yajx1v",
    title: "C# .NET Core Web API",
    instructor: "Ahmed Mohamed",
    rating: 4.5,
    duration: "30 Hours",
    level: "Intermediate",
    price: 80,
    category: "Back-End",
    image: imgCsharp,
    description: "Build scalable Web APIs using C# and .NET Core. Learn Entity Framework, JWT authentication, and clean architecture.",
    requirements: "C# Fundamentals.",
    lessons: [
      {
        id: 20,
        documentId: "mr568wgvnfou6teo6k4kcelc",
        title: "C# .NET Core Web API",
        // Original videoUrl was http://localhost:1337/admin/... — a Strapi admin URL, NOT a real video.
        videoUrl: null,
        duration: "28 Hours",
        isFreePreview: null,
      }
    ]
  },
  {
    id: 11,
    strapiId: 69,
    documentId: "kz4igmjnsa1dyaiw5oyw028z",
    title: "Go (Golang) Programming: The Complete Guide",
    instructor: "Mohamed Adel",
    rating: 4.8,
    duration: "17 Hours",
    level: "Advanced",
    price: 60,
    category: "Back-End",
    image: imgGo,
    description: "Master Go programming for highly concurrent backend systems. Learn goroutines, channels, and fast API development.",
    requirements: "Prior programming experience in any backend language.",
    lessons: [
      {
        id: 22,
        documentId: "d47febc9vw8lnzre5jjzxgkx",
        title: "Go (Golang) Programming: The Complete Guide",
        videoUrl: "https://www.youtube.com/watch?v=PrKUGpP7OKo&list=PLD0Vy7NjzXS63cTV76LPnqDttqcIIPrpM",
        duration: "16 Hours",
        isFreePreview: null,
      }
    ]
  },
  {
    id: 12,
    strapiId: 82,
    documentId: "x4fhvjscf2ouv3os4w22oadt",
    title: "Ruby on Rails 7: Full Stack Guide",
    instructor: "Omar Mahmoud",
    rating: 4.5,
    duration: "20 Hours",
    level: "Intermediate",
    price: 45,
    category: "Back-End",
    image: imgRuby,
    description: "Build full-stack web applications rapidly with Ruby on Rails 7. Covers Active Record, Hotwire, and deployment.",
    requirements: "Basic knowledge of Ruby programming.",
    lessons: [
      {
        id: 24,
        documentId: "uhtqzbp3efjzdba20jek7fsu",
        title: "Ruby on Rails 7: Full Stack Guide",
        videoUrl: "https://www.youtube.com/watch?v=xnzkjjlOjEc",
        duration: "20 Hours",
        isFreePreview: null,
      }
    ]
  },

  // ==================== Mobile App Track ====================
  {
    id: 13,
    strapiId: 81,
    documentId: "vopjexvb3056qnmk8n4h9fo3",
    title: "Flutter & Dart Development",
    instructor: "Hossam Mostafa",
    rating: 4.9,
    duration: "25 Hours",
    level: "Beginner",
    price: 50,
    category: "Mobile App",
    image: imgFlutter,
    description: "Build beautiful, natively compiled, cross-platform mobile apps for iOS and Android from a single codebase using Flutter.",
    requirements: "No prior mobile development experience required. Basic programming logic helps.",
    lessons: [
      {
        id: 26,
        documentId: "sorll6ee5cnxnqoy2oh4257a",
        title: "Flutter & Dart Development",
        videoUrl: "https://www.youtube.com/watch?v=AuzjFFjirBc&list=PLGVaNq6mHinjCPki-3xraQdGWKVz7PhgI",
        duration: "24 Hours",
        isFreePreview: null,
      }
    ]
  },
  {
    id: 14,
    strapiId: 71,
    documentId: "mwwrhcm8ch05qcfa12xc0rf7",
    title: "iOS 17 & Swift 5",
    instructor: "Ramy Mostafa",
    rating: 4.9,
    duration: "30 Hours",
    level: "Advanced",
    price: 60,
    category: "Mobile App",
    image: imgSwift,
    description: "Create native iOS applications using Swift 5 and SwiftUI. Learn CoreData, networking, and App Store submission.",
    requirements: "A Mac computer. Prior programming experience recommended.",
    lessons: [
      {
        id: 28,
        documentId: "fdt0h91r7r1dizn833sseq7c",
        title: "iOS 17 & Swift 5",
        videoUrl: "https://www.youtube.com/watch?v=WNrBtBs9snQ",
        duration: "30 Hours",
        isFreePreview: null,
      }
    ]
  },
  {
    id: 15,
    strapiId: 62,
    documentId: "gv5m567xs5o9a6tfvnhek0mr",
    title: "Android Kotlin Development",
    instructor: "Mohamed Ahmed",
    rating: 4.6,
    duration: "18 Hours",
    level: "Beginner",
    price: 60,
    category: "Mobile App",
    image: imgKotlin,
    description: "Native Android app development using Kotlin. Learn Android Studio, Jetpack Compose, and modern Android architecture.",
    requirements: "Basic understanding of Object-Oriented Programming.",
    lessons: [
      {
        id: 30,
        documentId: "m103z02e7kdpedcot3a9b9ju",
        title: "Android Kotlin Development",
        videoUrl: "https://www.youtube.com/watch?v=jIgCPcAlDKI&list=PLti2cUZX-C8c25FXmBb5pvvjStboKqPYx",
        duration: "18 Hours",
        isFreePreview: true,
      }
    ]
  },

  // ==================== Data Science & Database ====================
  {
    id: 16,
    strapiId: 66,
    documentId: "ieqmbljuzt4uymjmr71x3653",
    title: "Python for Data Science",
    instructor: "Omar Khaled",
    rating: 4.9,
    duration: "35 Hours",
    level: "Advanced",
    price: 90,
    category: "Data Science",
    image: imgPython,
    description: "Data analysis and visualization mastery. Learn Pandas, NumPy, Matplotlib, and basic machine learning concepts.",
    requirements: "Basic Python programming knowledge.",
    lessons: [
      {
        id: 32,
        documentId: "aelwf7qkyd6fqrunjhhswa1u",
        title: "python for data science full course",
        videoUrl: "https://www.youtube.com/watch?v=CMEWVn1uZpQ",
        duration: "35 Hours",
        isFreePreview: null,
      }
    ]
  },
  {
    id: 17,
    strapiId: 68,
    documentId: "k4pjz6fjcpel3az04pf727oz",
    title: "SQL & MySQL Database Mastery",
    instructor: "Mohamed Sayed",
    rating: 4.9,
    duration: "25 Hours",
    level: "Beginner",
    price: 40,
    category: "Data Science",
    image: imgMysql,
    description: "Master relational databases. Learn to design schemas, write complex queries, joins, and optimize database performance.",
    requirements: "No prerequisites. Beginner friendly.",
    lessons: [
      {
        id: 34,
        documentId: "iaso8o7ncp1xnumwf4ry831o",
        title: "SQL & MySQL Database Mastery",
        videoUrl: "https://www.youtube.com/watch?v=t60b_MplxAA&list=PLOghUv2IDLKHKlkQNuzN8SPLYuVhhLlpa",
        duration: "8 Hours",
        isFreePreview: null,
      }
    ]
  },
  {
    id: 18,
    strapiId: 70,
    documentId: "m9oruq0eeae5bw17p6lfqbtn",
    title: "MongoDB: The Complete Developer's Guide",
    instructor: "Ahmed Mahmoud",
    rating: 4.5,
    duration: "20 Hours",
    level: "Intermediate",
    price: 40,
    category: "Data Science",
    image: imgMongo,
    description: "Master NoSQL database design. Learn CRUD operations, aggregation framework, and indexing with MongoDB.",
    requirements: "Basic understanding of JSON data structures.",
    lessons: [
      {
        id: 36,
        documentId: "qbolsj51j4l0ihav2gw01juo",
        title: "MongoDB: The Complete Developer's Guide",
        videoUrl: "https://www.youtube.com/watch?v=Puc2EjkdycU&list=PL1BztTYDF-QPwd9Qg-nxQk1UYtorhzXLc",
        duration: "10 Hours",
        isFreePreview: null,
      }
    ]
  },
  {
    id: 19,
    strapiId: 78,
    documentId: "r1jjtth5p97tvq6mnv7k74iu",
    title: "TensorFlow & Deep Learning",
    instructor: "Kareem Mohamed",
    rating: 4.5,
    duration: "30 Hours",
    level: "Advanced",
    price: 50,
    category: "Data Science",
    image: imgTensor,
    description: "Build deep neural networks and AI models using Python and TensorFlow. Covers CNNs, RNNs, and NLP basics.",
    requirements: "Strong Python skills and basic calculus/linear algebra knowledge.",
    lessons: [
      {
        id: 38,
        documentId: "rr0ld89g40ofgv24ikl8k94t",
        title: "TensorFlow & Deep Learning",
        videoUrl: "https://www.youtube.com/watch?v=19LQRx78QVU&list=PLgNJO2hghbmiXg5d4X8DURJP9yv9pgjIu",
        duration: "30 Hours",
        isFreePreview: null,
      }
    ]
  },

  // ==================== Cyber Security ====================
  {
    id: 20,
    strapiId: 67,
    documentId: "i8xagrwc5uocqiw41icxmr60",
    title: "Ethical Hacking (Kali Linux)",
    instructor: "Mazen Mohamed",
    rating: 4.8,
    duration: "25 Hours",
    level: "Beginner",
    price: 30,
    category: "Cyber Security",
    image: imgKali,
    description: "Learn practical penetration testing and network security. Master Kali Linux tools to find vulnerabilities like a pro hacker.",
    requirements: "Basic understanding of computer networks and operating systems.",
    lessons: [
      {
        id: 40,
        documentId: "jgwnka4uzlucznn3axyrc0bi",
        title: "Ethical Hacking (Kali Linux)",
        videoUrl: "https://www.youtube.com/watch?v=AnwgxRtWXLI",
        duration: "20 Hours",
        isFreePreview: null,
      }
    ]
  },
  {
    id: 21,
    strapiId: 73,
    documentId: "p9zs6p1n50sm07kg4fi6b412",
    title: "Linux Command Line Bootcamp",
    instructor: "Ali Mohamed",
    rating: 4.9,
    duration: "50 Hours",
    level: "Intermediate",
    price: 30,
    category: "Cyber Security",
    image: imgLinux,
    description: "Master the Linux terminal. Learn file manipulation, permissions, bash scripting, and process management.",
    requirements: "None. Suitable for absolute beginners.",
    lessons: [
      {
        id: 42,
        documentId: "fm5h8gyi6filokjf7mv9supv",
        title: "Linux Command Line Bootcamp",
        videoUrl: "https://www.youtube.com/watch?v=gd7BXuUQ91w",
        duration: "6 Hours",
        isFreePreview: true,
      }
    ]
  },

  // ==================== DevOps ====================
  {
    id: 22,
    strapiId: 75,
    documentId: "pygrgv1u9a49apuitwgos271",
    title: "Git & GitHub: Complete Guide",
    instructor: "Ahmed Ali",
    rating: 4.8,
    duration: "5 Hours",
    level: "Beginner",
    price: 0,
    category: "DevOps",
    image: imgGit,
    description: "Essential version control for software developers. Learn branching, merging, pull requests, and resolving conflicts.",
    requirements: "Basic computer skills.",
    lessons: [
      {
        id: 44,
        documentId: "how9z5dgncwlnb27fhu6igi8",
        title: "Git & GitHub: Complete Guide",
        videoUrl: "https://www.youtube.com/watch?v=mAFoROnOfHs",
        duration: "5 Hours",
        isFreePreview: true,
      }
    ]
  },
  {
    id: 23,
    strapiId: 79,
    documentId: "sv8bpbp21biz6ohty4mv0o3e",
    title: "Docker for Beginners",
    instructor: "Hazem Ali",
    rating: 4.5,
    duration: "30 Hours",
    level: "Advanced",
    price: 50,
    category: "DevOps",
    image: imgDocker,
    description: "Containerize your applications. Learn Dockerfiles, images, containers, and multi-container apps using Docker Compose.",
    requirements: "Basic web development and terminal knowledge.",
    lessons: [
      {
        id: 46,
        documentId: "f4n5bb6vzeqdg4lgya2irwd4",
        title: "Docker for Beginners",
        videoUrl: "https://www.youtube.com/watch?v=pTFZFxd4hOI",
        duration: "12 Hours",
        isFreePreview: null,
      }
    ]
  },
  {
    id: 24,
    strapiId: 61,
    documentId: "fjy3cnwmi01dermj5hf37c47",
    title: "AWS Cloud Architect",
    instructor: "Mostafa Ali",
    rating: 4.8,
    duration: "30 Hours",
    level: "Intermediate",
    price: 50,
    category: "DevOps",
    image: imgAws,
    description: "Master Amazon Web Services. Learn EC2, S3, RDS, Lambda, and prepare for the AWS Solutions Architect certification.",
    requirements: "Basic understanding of networking and web architecture.",
    lessons: [
      {
        id: 48,
        documentId: "rtmn3wb1gwnuk0o68zm8es9k",
        title: "AWS Cloud Architect",
        videoUrl: "https://www.youtube.com/watch?v=hrOtumNwBG4",
        duration: "25 Hours",
        isFreePreview: null,
      }
    ]
  },
  {
    id: 25,
    strapiId: 76,
    documentId: "q0snib671s61luhbeullsrn4",
    title: "Jenkins CI/CD",
    instructor: "Abdullah Ali",
    rating: 4.8,
    duration: "30 Hours",
    level: "Intermediate",
    price: 70,
    category: "DevOps",
    image: imgJenkins,
    description: "Automate your software delivery. Build Continuous Integration and Continuous Deployment (CI/CD) pipelines with Jenkins.",
    requirements: "Experience with Git, GitHub, and basic Linux commands.",
    lessons: [
      {
        id: 50,
        documentId: "c4c2rqam6c0q3761l8k6qtpp",
        title: "Jenkins CI/CD",
        videoUrl: "https://www.youtube.com/watch?v=6YZvp2GwT0A",
        duration: "8 Hours",
        isFreePreview: true,
      }
    ]
  },
];