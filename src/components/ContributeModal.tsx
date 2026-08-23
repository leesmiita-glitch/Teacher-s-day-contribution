import React, { useState } from 'react';
import { X, QrCode, Copy, Check, Leaf } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Contribution } from '../types';

interface ContributeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitContribution: (contrib: Omit<Contribution, 'id' | 'isLocal'>) => void;
}

export function ContributeModal({
  isOpen,
  onClose,
  onSubmitContribution,
}: ContributeModalProps) {
  const [name, setName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [amount, setAmount] = useState<number | string>(100);
  const [quote, setQuote] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<Omit<Contribution, 'id' | 'isLocal'> | null>(null);
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [showQr, setShowQr] = useState(false);

  if (!isOpen) return null;

  const handlePresetAmount = (preset: number) => {
    setAmount(preset);
  };

  const handleCopyUpi = () => {
    navigator.clipboard.writeText('teachersday2026@upi');
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const numericAmount = typeof amount === 'string' ? parseFloat(amount) || 0 : amount;
    if (!name.trim() || numericAmount <= 0) return;

    const todayIndian = new Date().toLocaleDateString('en-GB').replace(/\//g, '-');

    const contributionPayload: Omit<Contribution, 'id' | 'isLocal'> = {
      sNo: 0,
      name: name.trim(),
      rollNo: rollNo.trim() || undefined,
      branch: 'CSE',
      year: '1',
      amount: numericAmount,
      date: todayIndian,
      quote:
        quote.trim() ||
        "Happy Teacher's Day! Thank you for shaping our minds and encouraging our dreams.",
    };

    // Save contribution
    onSubmitContribution(contributionPayload);
    setSubmittedData(contributionPayload);
    setIsSuccess(true);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#5A6F54', '#D4A373', '#8B6E4E', '#E5EADF'],
      });
    } catch {
      // ignore
    }
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    setName('');
    setRollNo('');
    setAmount(100);
    setQuote('');
    setShowQr(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#3D3D3D]/50 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative border border-[#E8E6DF] max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 text-[#8C897E] hover:text-[#3D3D3D] bg-[#F5F4EF] hover:bg-[#E8E6DF] rounded-full p-1.5 transition-all cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div>
            {/* Modal Header */}
            <div className="text-center mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5EADF] text-[#5A6F54] text-xs font-semibold uppercase tracking-wider mb-2">
                <Leaf className="w-3.5 h-3.5" />
                1st Year CSE (52 Students)
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#3D3D3D] italic font-bold">
                Contribute <span className="text-[#5A6F54]">Now</span>
              </h3>
              <p className="text-sm text-[#8C897E] mt-1">
                Join our collective tribute to appreciate the teachers who inspire us.
              </p>
            </div>

            {/* Quick UPI / QR Preview Toggle */}
            <div className="mb-5 p-3.5 rounded-2xl bg-[#F5F4EF] border border-[#E8E6DF]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-[#E5EADF] text-[#5A6F54]">
                    <QrCode className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#3D3D3D]">UPI ID: teachersday2026@upi</p>
                    <p className="text-[11px] text-[#8C897E]">Google Pay / PhonePe / Paytm</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyUpi}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white border border-[#E8E6DF] text-[#5A6F54] hover:bg-[#5A6F54] hover:text-white transition-colors flex items-center gap-1 shadow-sm cursor-pointer"
                >
                  {copiedUpi ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedUpi ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>

              {showQr && (
                <div className="mt-3 pt-3 border-t border-[#E8E6DF] text-center animate-in fade-in">
                  <div className="inline-block p-3 bg-white rounded-xl shadow-md border border-[#E8E6DF]">
                    {/* SVG QR Code */}
                    <svg viewBox="0 0 100 100" className="w-32 h-32 mx-auto">
                      <rect width="100" height="100" fill="#fff" />
                      <path
                        d="M10 10h30v30h-30zM50 10h10v10h-10zM70 10h20v20h-20zM60 20h10v20h-10zM80 30h10v10h-10zM20 20h10v10h-10zM10 50h10v20h-10zM30 50h20v10h-20zM20 70h20v20h-20zM50 50h10v10h-10zM70 50h20v30h-20zM50 70h10v20h-10zM60 80h10v10h-10z"
                        fill="#5A6F54"
                      />
                    </svg>
                    <p className="text-[11px] text-[#8C897E] font-semibold mt-1">Scan with any UPI App</p>
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={() => setShowQr(!showQr)}
                className="w-full text-center text-xs text-[#5A6F54] font-semibold mt-2 underline cursor-pointer"
              >
                {showQr ? 'Hide QR Code' : 'Show UPI QR Code'}
              </button>
            </div>

            {/* Contribution Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#8C897E] mb-1.5 ml-1">
                  Full Name <span className="text-[#5A6F54]">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  required
                  className="w-full rounded-xl border border-[#E8E6DF] bg-[#FDFCF8] focus:bg-white focus:border-[#5A6F54] focus:ring-2 focus:ring-[#5A6F54]/20 px-4 py-2.5 text-sm transition-all shadow-sm text-[#3D3D3D]"
                />
              </div>

              {/* Branch / Year Fixed Badge + Roll No */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#8C897E] mb-1.5 ml-1">
                    Batch / Section
                  </label>
                  <div className="w-full rounded-xl border border-[#E8E6DF] bg-[#F5F4EF] px-3.5 py-2.5 text-sm font-semibold text-[#5A6F54]">
                    1st Year • CSE
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#8C897E] mb-1.5 ml-1">
                    Roll No (Optional)
                  </label>
                  <input
                    type="text"
                    value={rollNo}
                    onChange={(e) => setRollNo(e.target.value)}
                    placeholder="e.g. 22"
                    className="w-full rounded-xl border border-[#E8E6DF] bg-[#FDFCF8] focus:bg-white focus:border-[#5A6F54] focus:ring-2 focus:ring-[#5A6F54]/20 px-3.5 py-2.5 text-sm transition-all shadow-sm text-[#3D3D3D]"
                  />
                </div>
              </div>

              {/* Amount with Presets */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#8C897E] mb-1.5 ml-1">
                  Contribution Amount (₹) <span className="text-[#5A6F54]">*</span>
                </label>
                <div className="flex gap-2 mb-2">
                  {[100, 250, 500, 1000].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => handlePresetAmount(preset)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        Number(amount) === preset
                          ? 'bg-[#5A6F54] text-white shadow-sm'
                          : 'bg-[#F5F4EF] border border-[#E8E6DF] text-[#8C897E] hover:bg-[#E5EADF]'
                      }`}
                    >
                      ₹{preset}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  min="10"
                  step="10"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount in ₹"
                  required
                  className="w-full rounded-xl border border-[#E8E6DF] bg-[#FDFCF8] focus:bg-white focus:border-[#5A6F54] focus:ring-2 focus:ring-[#5A6F54]/20 px-4 py-2.5 font-bold text-base text-[#5A6F54] transition-all shadow-sm"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#8C897E] mb-1.5 ml-1">
                  Gratitude Message / Quote for Teachers (Optional)
                </label>
                <textarea
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  rows={2}
                  placeholder="Thank you for always believing in us..."
                  className="w-full rounded-xl border border-[#E8E6DF] bg-[#FDFCF8] focus:bg-white focus:border-[#5A6F54] focus:ring-2 focus:ring-[#5A6F54]/20 px-4 py-2.5 text-sm resize-none transition-all shadow-sm text-[#3D3D3D]"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#5A6F54] text-white font-semibold py-3.5 rounded-full hover:bg-[#475943] transition-all hover:shadow-lg hover:-translate-y-0.5 shadow-md mt-4 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Confirm Contribution</span>
                <Leaf className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          /* Success Screen */
          <div className="text-center py-6 animate-in zoom-in-95 duration-200">
            <div className="text-5xl mb-4 inline-block">🌿</div>
            <h3 className="font-serif text-3xl text-[#3D3D3D] font-bold italic mb-2">
              Thank You, {submittedData?.name}!
            </h3>
            <p className="text-sm text-[#8C897E] mb-6 max-w-xs mx-auto">
              Your contribution of <strong className="text-[#5A6F54]">₹{submittedData?.amount}</strong> and warm wishes have been recorded in the collective celebration!
            </p>

            {/* Gratitude Pass Card */}
            <div className="bg-[#F5F4EF] p-5 rounded-2xl border border-[#E8E6DF] text-left mb-6 shadow-sm">
              <div className="flex justify-between items-center border-b border-[#E8E6DF] pb-2 mb-3">
                <span className="font-serif italic font-bold text-[#5A6F54]">Teacher's Day 2026</span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#D4A373]">1st Year CSE</span>
              </div>
              <p className="text-sm font-bold text-[#3D3D3D]">{submittedData?.name}</p>
              <p className="text-xs text-[#8C897E]">1st Year • CSE {submittedData?.rollNo ? `(Roll: ${submittedData.rollNo})` : ''}</p>
              <p className="text-xs italic text-[#3D3D3D] mt-2 bg-white p-2.5 rounded-lg border border-[#E8E6DF]">
                "{submittedData?.quote}"
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="w-full px-6 py-3 bg-[#5A6F54] text-white text-sm font-semibold rounded-full hover:bg-[#475943] transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                Back to Celebration
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
