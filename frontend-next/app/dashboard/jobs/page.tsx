'use client';

import { Briefcase, MapPin, DollarSign } from 'lucide-react';

export default function JobsPage() {
  const jobs = [
    {
      id: 1,
      title: 'Software Engineer',
      company: 'Microsoft',
      salary: '₹8–12L',
      fit: 92,
      skills: ['Java', 'Python', 'AWS'],
      location: 'Bangalore',
      description: 'Build cloud-based solutions for enterprise clients',
    },
    {
      id: 2,
      title: 'Backend Developer',
      company: 'Amazon',
      salary: '₹7–10L',
      fit: 88,
      skills: ['Java', 'SQL', 'AWS'],
      location: 'Hyderabad',
      description: 'Design and develop scalable backend services',
    },
    {
      id: 3,
      title: 'Data Analyst',
      company: 'Google',
      salary: '₹6–9L',
      fit: 85,
      skills: ['Python', 'SQL', 'Analytics'],
      location: 'Bangalore',
      description: 'Analyze large datasets and create insights',
    },
    {
      id: 4,
      title: 'Frontend Developer',
      company: 'Meta',
      salary: '₹7–11L',
      fit: 82,
      skills: ['React', 'JavaScript', 'CSS'],
      location: 'Remote',
      description: 'Build user interfaces for billion-user platforms',
    },
    {
      id: 5,
      title: 'DevOps Engineer',
      company: 'LinkedIn',
      salary: '₹8–11L',
      fit: 80,
      skills: ['Docker', 'Kubernetes', 'AWS'],
      location: 'Pune',
      description: 'Manage infrastructure and deployment pipelines',
    },
    {
      id: 6,
      title: 'Product Analyst',
      company: 'Uber',
      salary: '₹6–8L',
      fit: 78,
      skills: ['SQL', 'Analytics', 'Python'],
      location: 'Mumbai',
      description: 'Drive product decisions with data insights',
    },
  ];

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-4xl font-bold text-white">Job Opportunities</h1>
        <p className="text-slate-400">AI-matched roles based on your profile • {jobs.length} opportunities available</p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search jobs..."
          className="flex-1 px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition"
        />
        <select className="px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-purple-500 transition">
          <option>All Companies</option>
          <option>Microsoft</option>
          <option>Amazon</option>
          <option>Google</option>
        </select>
      </div>

      {/* Job Cards */}
      <div className="grid gap-6">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-800/20 border border-purple-500/20 hover:border-purple-500/50 transition group cursor-pointer"
          >
            <div className="grid md:grid-cols-3 gap-6">
              {/* Left Section */}
              <div className="md:col-span-2 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-purple-600/20 rounded-lg mt-1">
                      <Briefcase className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-purple-400 transition">
                        {job.title}
                      </h3>
                      <p className="text-slate-400 text-lg">{job.company}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 justify-end text-green-400 font-semibold mb-1">
                      <DollarSign className="w-4 h-4" />
                      {job.salary}
                    </div>
                    <div className="flex items-center gap-1 justify-end text-slate-400 text-sm">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </div>
                  </div>
                </div>

                <p className="text-slate-300">{job.description}</p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-purple-600/20 border border-purple-500/30 rounded-full text-sm text-purple-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Section - Match Score */}
              <div className="flex flex-col items-center justify-center space-y-3 p-4 bg-purple-600/10 rounded-xl border border-purple-500/20">
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <svg className="w-24 h-24 transform -rotate-90">
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="rgba(71, 85, 105, 0.5)"
                      strokeWidth="4"
                      fill="none"
                    />
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="rgb(168, 85, 247)"
                      strokeWidth="4"
                      fill="none"
                      strokeDasharray={`${(job.fit / 100) * 251} 251`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute text-center">
                    <p className="text-2xl font-bold text-purple-400">{job.fit}%</p>
                    <p className="text-xs text-slate-400">Match</p>
                  </div>
                </div>
                <button className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center">
        <button className="px-8 py-3 bg-slate-700/50 hover:bg-slate-700 text-white font-semibold rounded-lg border border-slate-600 transition-colors">
          Load More Opportunities
        </button>
      </div>
    </div>
  );
}
