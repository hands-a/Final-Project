// ==================== استيراد الصور من مجلد photo ====================
// ملاحظة: تأكد إن مسار الاستيراد '../photo/' أو './photo/' صحيح حسب مكان هذا الملف بالنسبة لمجلد photo
// ==================== استيراد الصور من مجلد photo ====================
// ==================== استيراد الصور من مجلد photo ====================
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

// الصور اللي كانت باسم OIP أو R
import imgReact from '../assets/photo/React.png';
import imgAngular from '../assets/photo/OIP (1).webp';
import imgTailwind from '../assets/photo/OIP (2).webp';
import imgMongo from '../assets/photo/OIP.webp';
import imgTensor from '../assets/photo/OIP.webp';
import imgDocker from '../assets/photo/OIP.webp';

export const coursesData = [
    // ==================== Front-End Track ====================
    {
        id: 1,
        title: "Modern React.js 18 & Redux Toolkit",
        instructor: "Abdullah Sayed",
        rating: 4.8,
        lessons: 140,
        duration: "25 Hours",
        level: "Beginner",
        price: 49.99,
        category: "Front-end",
        image: imgReact,
        description: "Master modern React.js from scratch. Build real-world applications using Hooks, Context API, Redux Toolkit, and React Router.",
        requirements: "Basic knowledge of HTML, CSS, and modern JavaScript (ES6+)."
    },
    {
        id: 2,
        title: "Next.js 14: The Complete Guide",
        instructor: "Rana Wael",
        rating: 4.8,
        lessons: 95,
        duration: "18 Hours",
        level: "Advanced",
        price: 50,
        category: "Front-end",
        image: imgNext,
        description: "Build full-stack, SEO-friendly React applications using Next.js 14. Learn App Router, Server Components, and Server Actions.",
        requirements: "Solid understanding of React.js and JavaScript."
    },
    {
        id: 3,
        title: "Mastering Angular 17",
        instructor: "Ahmed Sayed",
        rating: 4.5,
        lessons: 180,
        duration: "32 Hours",
        level: "Advanced",
        price: 30,
        category: "Front-end",
        image: imgAngular,
        description: "Comprehensive guide to Angular 17. Learn signals, standalone components, RxJS, and enterprise-level application architecture.",
        requirements: "HTML, CSS, JavaScript, and basic understanding of TypeScript."
    },
    {
        id: 4,
        title: "Vue.js 3: The Complete Guide",
        instructor: "Hamza Nour",
        rating: 4.1,
        lessons: 110,
        duration: "15 Hours",
        level: "Beginner",
        price: 35,
        category: "Front-end",
        image: imgVue,
        description: "Complete guide to Vue 3. Learn the Options API, Composition API, Vue Router, and Pinia for state management.",
        requirements: "Basic HTML, CSS, and JavaScript knowledge."
    },
    {
        id: 5,
        title: "Svelte & SvelteKit: The Future",
        instructor: "Mostafa Hassan",
        rating: 4.8,
        lessons: 60,
        duration: "8 Hours",
        level: "Intermediate",
        price: 20,
        category: "Front-end",
        image: imgSvelte,
        description: "Learn Svelte, the truly reactive framework without the virtual DOM overhead, and build full-stack apps with SvelteKit.",
        requirements: "Good grasp of Vanilla JavaScript and DOM manipulation."
    },
    {
        id: 6,
        title: "Tailwind CSS Styling Masterclass",
        instructor: "Abdelrahman Mostafa",
        rating: 4.7,
        lessons: 60,
        duration: "10 Hours",
        level: "Beginner",
        price: 0, // Free
        category: "Front-end",
        image: imgTailwind,
        description: "Master utility-first CSS. Build responsive, beautiful UI components and full landing pages rapidly using Tailwind CSS.",
        requirements: "Basic understanding of HTML and standard CSS."
    },

    // ==================== Back-End Track ====================
    {
        id: 7,
        title: "Node.js & Express Bootcamp",
        instructor: "Yamen Abdullah",
        rating: 4.7,
        lessons: 110,
        duration: "20 Hours",
        level: "Intermediate",
        price: 40,
        category: "Back-end",
        image: imgNode,
        description: "Build robust RESTful APIs with Node.js, Express, and MongoDB. Learn authentication, security, and deployment.",
        requirements: "Strong foundation in JavaScript."
    },
    {
        id: 8,
        title: "PHP & Laravel 10 for Beginners",
        instructor: "Yazan Abdullah",
        rating: 4.6,
        lessons: 130,
        duration: "22 Hours",
        level: "Beginner",
        price: 20,
        category: "Back-end",
        image: imgLaravel,
        description: "Learn PHP from scratch and transition into building modern, secure MVC applications using the Laravel 10 framework.",
        requirements: "Basic HTML and programming concepts."
    },
    {
        id: 9,
        title: "Java Spring Boot Masterclass",
        instructor: "Rana Abdullah",
        rating: 5,
        lessons: 200,
        duration: "40 Hours",
        level: "Advanced",
        price: 100,
        category: "Back-end",
        image: imgJava,
        description: "Enterprise application development with Java. Master Spring Boot, Spring Security, JPA/Hibernate, and Microservices.",
        requirements: "Solid understanding of Java Core and Object-Oriented Programming."
    },
    {
        id: 10,
        title: "C# .NET Core Web API",
        instructor: "Ahmed Mohamed",
        rating: 4.5,
        lessons: 160,
        duration: "28 Hours",
        level: "Intermediate",
        price: 80,
        category: "Back-end",
        image: imgCsharp,
        description: "Build scalable Web APIs using C# and .NET Core. Learn Entity Framework, JWT authentication, and clean architecture.",
        requirements: "C# Fundamentals."
    },
    {
        id: 11,
        title: "Go (Golang) Programming: The Complete Guide",
        instructor: "Mohamed Adel",
        rating: 4.8,
        lessons: 90,
        duration: "16 Hours",
        level: "Advanced",
        price: 60,
        category: "Back-end",
        image: imgGo,
        description: "Master Go programming for highly concurrent backend systems. Learn goroutines, channels, and fast API development.",
        requirements: "Prior programming experience in any backend language."
    },
    {
        id: 12,
        title: "Ruby on Rails 7: Full Stack Guide",
        instructor: "Omar Mahmoud",
        rating: 4.5,
        lessons: 120,
        duration: "20 Hours",
        level: "Intermediate",
        price: 45,
        category: "Back-end",
        image: imgRuby,
        description: "Build full-stack web applications rapidly with Ruby on Rails 7. Covers Active Record, Hotwire, and deployment.",
        requirements: "Basic knowledge of Ruby programming."
    },

    // ==================== Mobile App Track ====================
    {
        id: 13,
        title: "Flutter & Dart Development",
        instructor: "Hossam Mostafa",
        rating: 4.9,
        lessons: 130,
        duration: "24 Hours",
        level: "Beginner",
        price: 50,
        category: "Mobile App",
        image: imgFlutter,
        description: "Build beautiful, natively compiled, cross-platform mobile apps for iOS and Android from a single codebase using Flutter.",
        requirements: "No prior mobile development experience required. Basic programming logic helps."
    },
    {
        id: 14,
        title: "iOS 17 & Swift 5",
        instructor: "Ramy Mostafa",
        rating: 4.9,
        lessons: 160,
        duration: "30 Hours",
        level: "Advanced",
        price: 60,
        category: "Mobile App",
        image: imgSwift,
        description: "Create native iOS applications using Swift 5 and SwiftUI. Learn CoreData, networking, and App Store submission.",
        requirements: "A Mac computer. Prior programming experience recommended."
    },
    {
        id: 15,
        title: "Android Kotlin Development",
        instructor: "Mohamed Ahmed",
        rating: 4.6,
        lessons: 90,
        duration: "18 Hours",
        level: "Beginner",
        price: 60,
        category: "Mobile App",
        image: imgKotlin,
        description: "Native Android app development using Kotlin. Learn Android Studio, Jetpack Compose, and modern Android architecture.",
        requirements: "Basic understanding of Object-Oriented Programming."
    },

    // ==================== Data Science & Database ====================
    {
        id: 16,
        title: "Python for Data Science",
        instructor: "Omar Khaled",
        rating: 4.9,
        lessons: 200,
        duration: "35 Hours",
        level: "Advanced",
        price: 90,
        category: "Data Science",
        image: imgPython,
        description: "Data analysis and visualization mastery. Learn Pandas, NumPy, Matplotlib, and basic machine learning concepts.",
        requirements: "Basic Python programming knowledge."
    },
    {
        id: 17,
        title: "SQL & MySQL Database Mastery",
        instructor: "Mohamed Sayed",
        rating: 4.9,
        lessons: 50,
        duration: "8 Hours",
        level: "Beginner",
        price: 40,
        category: "Data Science",
        image: imgMysql,
        description: "Master relational databases. Learn to design schemas, write complex queries, joins, and optimize database performance.",
        requirements: "No prerequisites. Beginner friendly."
    },
    {
        id: 18,
        title: "MongoDB: The Complete Developer's Guide",
        instructor: "Ahmed Mahmoud",
        rating: 4.5,
        lessons: 60,
        duration: "10 Hours",
        level: "Intermediate",
        price: 40,
        category: "Data Science",
        image: imgMongo,
        description: "Master NoSQL database design. Learn CRUD operations, aggregation framework, and indexing with MongoDB.",
        requirements: "Basic understanding of JSON data structures."
    },
    {
        id: 19,
        title: "TensorFlow & Deep Learning",
        instructor: "Kareem Mohamed",
        rating: 4.5,
        lessons: 180,
        duration: "30 Hours",
        level: "Advanced",
        price: 50,
        category: "Data Science",
        image: imgTensor,
        description: "Build deep neural networks and AI models using Python and TensorFlow. Covers CNNs, RNNs, and NLP basics.",
        requirements: "Strong Python skills and basic calculus/linear algebra knowledge."
    },

    // ==================== Cyber Security & Tools ====================
    {
        id: 20,
        title: "Ethical Hacking (Kali Linux)",
        instructor: "Mazen Mohamed",
        rating: 4.8,
        lessons: 120,
        duration: "20 Hours",
        level: "Beginner",
        price: 30,
        category: "Cyber Security",
        image: imgKali,
        description: "Learn practical penetration testing and network security. Master Kali Linux tools to find vulnerabilities like a pro hacker.",
        requirements: "Basic understanding of computer networks and operating systems."
    },
    {
        id: 21,
        title: "Linux Command Line Bootcamp",
        instructor: "Ali Mohamed",
        rating: 4.9,
        lessons: 40,
        duration: "6 Hours",
        level: "Intermediate",
        price: 30,
        category: "Cyber Security",
        image: imgLinux,
        description: "Master the Linux terminal. Learn file manipulation, permissions, bash scripting, and process management.",
        requirements: "None. Suitable for absolute beginners."
    },
    {
        id: 22,
        title: "Git & GitHub: Complete Guide",
        instructor: "Ahmed Ali",
        rating: 4.8,
        lessons: 30,
        duration: "5 Hours",
        level: "Beginner",
        price: 0, // Free
        category: "DevOps",
        image: imgGit,
        description: "Essential version control for software developers. Learn branching, merging, pull requests, and resolving conflicts.",
        requirements: "Basic computer skills."
    },

    // ==================== DevOps ====================
    {
        id: 23,
        title: "Docker for Beginners",
        instructor: "Hazem Ali",
        rating: 4.5,
        lessons: 80,
        duration: "12 Hours",
        level: "Advanced",
        price: 50,
        category: "DevOps",
        image: imgDocker,
        description: "Containerize your applications. Learn Dockerfiles, images, containers, and multi-container apps using Docker Compose.",
        requirements: "Basic web development and terminal knowledge."
    },
    {
        id: 24,
        title: "AWS Cloud Architect",
        instructor: "Mostafa Ali",
        rating: 4.8,
        lessons: 150,
        duration: "25 Hours",
        level: "Intermediate",
        price: 50,
        category: "DevOps",
        image: imgAws,
        description: "Master Amazon Web Services. Learn EC2, S3, RDS, Lambda, and prepare for the AWS Solutions Architect certification.",
        requirements: "Basic understanding of networking and web architecture."
    },
    {
        id: 25,
        title: "Jenkins CI/CD",
        instructor: "Abdullah Ali",
        rating: 4.8,
        lessons: 45,
        duration: "8 Hours",
        level: "Intermediate",
        price: 70,
        category: "DevOps",
        image: imgJenkins,
        description: "Automate your software delivery. Build Continuous Integration and Continuous Deployment (CI/CD) pipelines with Jenkins.",
        requirements: "Experience with Git, GitHub, and basic Linux commands."
    },
];