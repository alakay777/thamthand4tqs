
import React, { useState } from 'react';
import { FormStep, RegistrationData, SoldierInfo, VisitorInfo } from './types.ts';
import { MilitaryLogo, RANKS, RELATIONSHIPS, RULES_CONTENT } from './constants.tsx';
import StepIndicator from './components/StepIndicator.tsx';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<FormStep>(FormStep.Rules);
  const [regId, setRegId] = useState('');
  const [data, setData] = useState<RegistrationData>({
    agreedToRules: false,
    soldier: {
      fullName: '',
      dob: '',
      rank: RANKS[0],
      position: 'Học viên',
      homeTown: '',
    },
    visitor: {
      fullName: '',
      dob: '',
      idNumber: '',
      address: '',
      relationship: RELATIONSHIPS[0],
      visitorCount: 1,
      visitTime: '08:00',
    },
  });

  const nextStep = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentStep(prev => prev + 1);
  };
  const prevStep = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentStep(prev => prev - 1);
  };

  const handleSoldierChange = (field: keyof SoldierInfo, value: string) => {
    setData(prev => ({
      ...prev,
      soldier: { ...prev.soldier, [field]: value }
    }));
  };

  const handleVisitorChange = (field: keyof VisitorInfo, value: string | number) => {
    setData(prev => ({
      ...prev,
      visitor: { ...prev.visitor, [field]: value }
    }));
  };

  const handleSubmit = () => {
    const randomId = 'TD4-' + Math.random().toString(36).slice(2, 8).toUpperCase();
    setRegId(randomId);
    setCurrentStep(FormStep.Success);
  };

  return (
    <div className="min-h-screen bg-red-950 py-6 md:py-12 px-4 relative selection:bg-yellow-500 selection:text-red-900 overflow-x-hidden">
      {/* Lớp nền họa tiết quân đội chìm */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }}></div>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)] pointer-events-none"></div>
      
      <div className="max-w-2xl mx-auto bg-white rounded-[2.5rem] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden border border-red-900/30 relative z-10 transition-all duration-500">
        
        {/* Header Section */}
        <div className="relative bg-gradient-to-br from-red-700 via-red-800 to-red-950 text-white py-12 text-center px-6 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px'}}></div>
          </div>
          
          <MilitaryLogo />
          
          <div className="relative z-10">
            <h2 className="text-2xl md:text-4xl font-black tracking-[0.1em] md:tracking-[0.2em] uppercase mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] leading-tight">Trường Quân Sự</h2>
            <h1 className="text-xl md:text-3xl font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase opacity-90 text-yellow-400 leading-tight">Tiểu Đoàn 4</h1>
            <div className="mt-6 flex justify-center items-center gap-4">
              <div className="h-[2px] w-16 bg-gradient-to-r from-transparent to-yellow-500/50"></div>
              <div className="w-3 h-3 rotate-45 border-2 border-yellow-500"></div>
              <div className="h-[2px] w-16 bg-gradient-to-l from-transparent to-yellow-500/50"></div>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-10 bg-white">
          {currentStep !== FormStep.Success && <StepIndicator currentStep={currentStep} />}

          {/* PAGE 1: RULES */}
          {currentStep === FormStep.Rules && (
            <div className="space-y-8 animate-fade-in">
              <div className="text-center">
                <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Quy định thăm thân</h3>
                <p className="text-slate-500 text-sm mt-1 font-medium">Đảm bảo an toàn và kỷ luật quân đội</p>
              </div>
              
              <div className="bg-red-50/40 rounded-3xl p-7 space-y-5 border border-red-100 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]">
                {RULES_CONTENT.map((rule, idx) => (
                  <div key={idx} className="flex gap-5 text-sm text-slate-700 leading-relaxed items-start group">
                    <span className="flex-shrink-0 w-7 h-7 bg-red-800 text-white rounded-xl flex items-center justify-center text-xs font-black shadow-lg shadow-red-200 group-hover:scale-110 transition-transform">
                      {idx + 1}
                    </span>
                    <p className="pt-0.5 font-semibold text-slate-800">{rule}</p>
                  </div>
                ))}
              </div>

              <label className="flex items-center gap-5 p-6 bg-red-50/50 rounded-3xl cursor-pointer hover:bg-red-100/50 transition-all border-2 border-transparent hover:border-red-200 group active:scale-[0.99]">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    className="peer h-7 w-7 cursor-pointer appearance-none rounded-lg border-2 border-slate-300 bg-white checked:bg-red-800 checked:border-red-800 transition-all shadow-sm"
                    checked={data.agreedToRules}
                    onChange={(e) => setData({ ...data, agreedToRules: e.target.checked })}
                  />
                  <svg className="absolute h-5 w-5 text-white opacity-0 peer-checked:opacity-100 top-1 left-1 pointer-events-none transition-all duration-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <span className="text-sm font-black text-slate-800 group-hover:text-red-900 transition-colors uppercase tracking-tight">
                  Tôi cam kết thực hiện đúng các quy định trên.
                </span>
              </label>

              <button
                disabled={!data.agreedToRules}
                onClick={nextStep}
                className={`w-full py-5 rounded-2xl font-black text-lg shadow-2xl transition-all transform active:scale-[0.97] tracking-widest uppercase ${
                  data.agreedToRules 
                    ? 'bg-red-800 hover:bg-red-900 text-white cursor-pointer shadow-red-200' 
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                }`}
              >
                TIẾP THEO
              </button>
            </div>
          )}

          {/* PAGE 2: SOLDIER INFO */}
          {currentStep === FormStep.SoldierInfo && (
            <div className="space-y-8 animate-fade-in">
              <div className="text-center">
                <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Thông tin Quân nhân</h3>
                <p className="text-slate-500 text-sm mt-1 font-medium">Thông tin học viên Tiểu đoàn 4 cần thăm gặp</p>
              </div>
              
              <div className="grid gap-6">
                <div className="space-y-2">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Họ và tên học viên</label>
                  <input
                    type="text"
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-red-700 focus:bg-white outline-none transition-all text-slate-800 font-bold placeholder:font-medium"
                    placeholder="VÍ DỤ: NGUYỄN VĂN A"
                    value={data.soldier.fullName}
                    onChange={(e) => handleSoldierChange('fullName', e.target.value.toUpperCase())}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Ngày sinh</label>
                    <input
                      type="date"
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-red-700 focus:bg-white outline-none transition-all text-slate-800 font-bold"
                      value={data.soldier.dob}
                      onChange={(e) => handleSoldierChange('dob', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Cấp bậc</label>
                    <select
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-red-700 focus:bg-white outline-none transition-all text-slate-800 font-bold cursor-pointer appearance-none"
                      value={data.soldier.rank}
                      onChange={(e) => handleSoldierChange('rank', e.target.value)}
                    >
                      {RANKS.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Quê quán (Trú quán)</label>
                  <textarea
                    rows={2}
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-red-700 focus:bg-white outline-none transition-all text-slate-800 font-bold resize-none placeholder:font-medium"
                    placeholder="Địa chỉ thường trú..."
                    value={data.soldier.homeTown}
                    onChange={(e) => handleSoldierChange('homeTown', e.target.value)}
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button onClick={prevStep} className="flex-1 py-4 border-2 border-slate-200 rounded-2xl font-black text-slate-500 hover:bg-slate-50 transition-all uppercase text-sm tracking-widest">
                  QUAY LẠI
                </button>
                <button
                  onClick={nextStep}
                  disabled={!data.soldier.fullName || !data.soldier.dob || !data.soldier.homeTown}
                  className="flex-1 py-4 bg-red-800 hover:bg-red-900 text-white rounded-2xl font-black shadow-2xl disabled:bg-slate-200 disabled:text-slate-400 transition-all active:scale-[0.97] uppercase text-sm tracking-widest"
                >
                  TIẾP THEO
                </button>
              </div>
            </div>
          )}

          {/* PAGE 3: VISITOR INFO */}
          {currentStep === FormStep.VisitorInfo && (
            <div className="space-y-8 animate-fade-in">
              <div className="text-center">
                <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Thông tin Thân nhân</h3>
                <p className="text-slate-500 text-sm mt-1 font-medium">Thông tin người đại diện đăng ký thăm gặp</p>
              </div>
              
              <div className="grid gap-5">
                <div className="space-y-2">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Họ tên người đăng ký</label>
                  <input
                    type="text"
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-red-700 focus:bg-white outline-none transition-all text-slate-800 font-