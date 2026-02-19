import React from "react";
import { Link } from "react-router-dom";
import {
  FaPlay,
  FaCheckCircle,
  FaReact,
  FaCodeBranch,
  FaJava,
  FaNodeJs,
  FaPython,
} from "react-icons/fa";
import { RiRocketLine, RiCpuLine, RiCodeSSlashLine } from "react-icons/ri";
import { SiJavascript, SiTypescript, SiHtml5, SiCss3 } from "react-icons/si";

const Hero = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden bg-[#0a0a0a] text-white pt-20 lg:pt-0 mt-10">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,black,transparent)] z-0"></div>

      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[15%] right-[10%] opacity-10 animate-float-slow">
          <FaJava className="text-8xl text-orange-500 rotate-12" />
        </div>

        <div
          className="absolute bottom-[20%] left-[5%] opacity-10 animate-float-medium"
          style={{ animationDelay: "2s" }}
        >
          <FaPython className="text-7xl text-blue-500 -rotate-12" />
        </div>

        <div className="absolute top-[10%] left-[30%] opacity-10 animate-float-fast">
          <SiJavascript className="text-6xl text-yellow-500 rotate-45" />
        </div>

        <div
          className="absolute bottom-[10%] right-[30%] opacity-10 animate-float-slow"
          style={{ animationDelay: "1s" }}
        >
          <SiTypescript className="text-7xl text-blue-400 rotate-6" />
        </div>

        <div className="absolute top-[40%] left-[10%] opacity-5 text-6xl font-mono text-slate-500 animate-pulse-slow">
          &lt;/&gt;
        </div>
        <div
          className="absolute top-[60%] right-[5%] opacity-5 text-6xl font-mono text-slate-500 animate-pulse-slow"
          style={{ animationDelay: "1.5s" }}
        >
          {`{ }`}
        </div>

        {/* Node JS - بعيد جداً */}
        <div className="absolute top-[5%] left-[5%] opacity-5 animate-spin-slow duration-[20s]">
          <FaNodeJs className="text-9xl text-green-600 blur-sm" />
        </div>
      </div>

      {/* إضاءات محيطية (Glows) */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 hover:bg-white/10 transition-colors cursor-default">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              <span className="text-xs font-mono text-purple-300">
                Start Your Journey
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6 tracking-tight">
              Future of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-400 to-white">
                Creative Coding
              </span>
            </h1>

            <p className="text-slate-400 text-lg mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0 font-light">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos,
              quae.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                to="/register"
                className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-xl font-bold hover:bg-purple-50 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)]"
              >
                Start For Free <RiRocketLine />
              </Link>
              <Link
                to="/courses"
                className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2 backdrop-blur-sm"
              >
                <FaPlay className="text-xs" /> Explore Courses
              </Link>
            </div>

            <div className="mt-8 flex items-center justify-center lg:justify-start gap-4 text-sm text-slate-500 font-mono">
              <span className="flex items-center gap-1">
                <FaCodeBranch /> v2.4.0
              </span>
              <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
              <span className="flex items-center gap-1">
                <RiCpuLine /> Fast Load
              </span>
            </div>
          </div>

          <div className="w-full lg:w-1/2 relative h-[550px] flex items-center justify-center">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-to-tr from-purple-500/40 to-blue-500/40 rounded-full blur-[80px]"></div>

            <div className="relative z-20 w-full max-w-md bg-[#161b22]/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden transform transition-all hover:scale-[1.02] duration-500 group">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="text-xs font-mono text-slate-500">App.java</div>
              </div>

              <div className="p-6 font-mono text-sm leading-7 text-slate-300">
                <div className="flex">
                  <span className="text-pink-400 mr-2">class</span>{" "}
                  <span className="text-yellow-200">FutureDev</span> {"{"}
                </div>
                <div className="pl-4">
                  <span className="text-purple-400">public static void</span>{" "}
                  <span className="text-yellow-200">main</span>(String[] args){" "}
                  {"{"}
                </div>
                <div className="pl-8">
                  <span className="text-blue-300">System</span>.out.
                  <span className="text-yellow-200">println</span>(
                  <span className="text-green-300">"Hello Developer!"</span>);
                </div>
                <div className="pl-8 text-slate-500">// Start your career</div>
                <div className="pl-8">
                  <span className="text-blue-300">skillLevel</span>++;
                </div>
                <div className="pl-4">{"}"}</div>
                <div>{"}"}</div>

                {/* وميض المؤشر */}
                <div className="mt-2 w-2 h-4 bg-purple-500 animate-pulse"></div>
              </div>
            </div>

            {/* Widget: React Icon */}
            <div className="absolute bottom-10 -left-4 lg:left-0 bg-[#1e293b] border border-white/10 p-3 rounded-xl shadow-xl flex items-center gap-3 animate-float-medium z-30">
              <div className="w-10 h-10 bg-[#20232a] rounded-lg flex items-center justify-center">
                <FaReact className="text-[#61DAFB] text-xl animate-spin-slow" />
              </div>
              <div>
                <div className="text-xs text-slate-400">Learning</div>
                <div className="text-sm font-bold text-white">React.js</div>
              </div>
            </div>

            <div className="absolute top-1/2 -right-8 w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg animate-float-fast z-10 rotate-12">
              <FaJava className="text-2xl" />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .animate-float-slow { animation: float-slow 5s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 4s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 3s ease-in-out infinite; }
        .animate-spin-slow { animation: spin 8s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
};

export default Hero;
