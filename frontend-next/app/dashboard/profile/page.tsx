'use client';

import { BookOpen, Briefcase, Award, Code, FileText, CheckCircle, AlertCircle } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-4xl font-bold text-white">My Career Profile</h1>
        <p className="text-slate-400">View and update your career information</p>
      </div>

      {/* Academic Snapshot */}
      <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-800/20 border border-purple-500/20">
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="w-6 h-6 text-purple-400" />
          <h2 className="text-2xl font-bold text-white">Academic Snapshot</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="text-slate-400 text-sm mb-2">Course</p>
            <p className="text-2xl font-bold text-white">B.Tech Computer Engineering</p>
          </div>
          <div>
            <p className="text-slate-400 text-sm mb-2">CGPA</p>
            <p className="text-2xl font-bold text-green-400">8.2 / 10</p>
          </div>
          <div>
            <p className="text-slate-400 text-sm mb-2">Graduation Year</p>
            <p className="text-2xl font-bold text-white">2026</p>
          </div>
          <div>
            <p className="text-slate-400 text-sm mb-2">Institute Tier</p>
            <p className="text-2xl font-bold text-white">Tier 1</p>
          </div>
        </div>
      </div>

      {/* Experience */}
      <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-800/20 border border-blue-500/20">
        <div className="flex items-center gap-3 mb-6">
          <Briefcase className="w-6 h-6 text-blue-400" />
          <h2 className="text-2xl font-bold text-white">Experience</h2>
        </div>
        <div className="space-y-6">
          <div className="border-l-2 border-blue-500 pl-4">
            <p className="font-bold text-white">Internship at Microsoft</p>
            <p className="text-slate-400 text-sm">June - August 2024 • 3 months</p>
            <p className="text-slate-300 mt-2">Developed cloud solutions using Azure</p>
          </div>
          <div className="border-l-2 border-blue-500 pl-4">
            <p className="font-bold text-white">Internship at Amazon</p>
            <p className="text-slate-400 text-sm">June - August 2023 • 3 months</p>
            <p className="text-slate-300 mt-2">Backend development with Java and Spring Boot</p>
          </div>
        </div>
        <p className="text-slate-400 mt-4 text-sm">Total Internships: <span className="text-green-400 font-bold">2</span></p>
      </div>

      {/* Certifications */}
      <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-800/20 border border-orange-500/20">
        <div className="flex items-center gap-3 mb-6">
          <Award className="w-6 h-6 text-orange-400" />
          <h2 className="text-2xl font-bold text-white">Certifications</h2>
        </div>
        <div className="space-y-3">
          {[
            'AWS Solutions Architect Associate',
            'Google Cloud Professional Data Engineer',
            'MongoDB M001: MongoDB Basics',
          ].map((cert) => (
            <div key={cert} className="flex items-center gap-3 p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
              <CheckCircle className="w-5 h-5 text-orange-400" />
              <span className="text-white">{cert}</span>
            </div>
          ))}
        </div>
        <p className="text-slate-400 mt-4 text-sm">Total Certifications: <span className="text-orange-400 font-bold">3</span></p>
      </div>

      {/* Skills */}
      <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-800/20 border border-purple-500/20">
        <div className="flex items-center gap-3 mb-6">
          <Code className="w-6 h-6 text-purple-400" />
          <h2 className="text-2xl font-bold text-white">Technical Skills</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Python', 'Java', 'SQL', 'React', 'AWS', 'Docker', 'Git', 'Linux'].map((skill) => (
            <div key={skill} className="p-3 bg-purple-600/20 rounded-lg border border-purple-500/30 text-center">
              <p className="text-white font-medium">{skill}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Resume Strength */}
      <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-800/20 border border-green-500/20">
        <div className="flex items-center gap-3 mb-6">
          <FileText className="w-6 h-6 text-green-400" />
          <h2 className="text-2xl font-bold text-white">Resume Strength</h2>
        </div>
        <div className="space-y-4">
          {[
            { item: 'Contact & Professional Summary', status: true },
            { item: 'Work Experience (Well Formatted)', status: true },
            { item: 'Projects with Results', status: true },
            { item: 'Skills Section', status: true },
            { item: 'Quantified Achievements', status: false },
          ].map((check) => (
            <div key={check.item} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
              <span className="text-slate-300">{check.item}</span>
              {check.status ? (
                <CheckCircle className="w-5 h-5 text-green-400" />
              ) : (
                <AlertCircle className="w-5 h-5 text-yellow-400" />
              )}
            </div>
          ))}
        </div>
        <p className="text-slate-400 mt-6 text-sm">Overall Resume Score: <span className="text-green-400 font-bold">8.5/10 (Good)</span></p>
      </div>

      {/* Action Button */}
      <button className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-semibold rounded-lg transition-all">
        Edit Profile
      </button>
    </div>
  );
}
