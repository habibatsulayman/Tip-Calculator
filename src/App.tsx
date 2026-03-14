import { useState } from "react";

function App() {
  const [bill, setBill] = useState<string>("");
  const [numberOfPeople, setNumberOfPeople] = useState<string>("");
  const [tipPercentage, setTipPercentage] = useState<number | null>(null);
  const [customTip, setCustomTip] = useState<string>("");

  const handleReset = () => {
    setBill("");
    setNumberOfPeople("");
    setTipPercentage(null);
    setCustomTip("");
  };

  const billNum = Number(bill);
  const peopleNum = Number(numberOfPeople);
  const customTipNum = Number(customTip);

  let effectiveTip = tipPercentage !== null ? tipPercentage : (customTip !== "" ? customTipNum : null);

  let tipAmount = 0;
  let totalPerPerson = 0;

  if (billNum > 0 && peopleNum > 0 && effectiveTip !== null) {
    const totalTip = billNum * (effectiveTip / 100);
    tipAmount = totalTip / peopleNum;
    totalPerPerson = (totalTip + billNum) / peopleNum;
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 md:p-12 mb-10 h-full">
      <img src="/images/logo.svg" alt="SPLITTER logo" className="mb-12 md:mb-20 w-16" />

      <div className="bg-white rounded-3xl p-6 md:p-8 md:grid md:grid-cols-2 md:gap-10 w-full max-w-4xl shadow-xl">
        {/* Left Form Section */}
        <div className="flex flex-col">
          {/* Bill Input */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="bill" className="text-dark-grayish-cyan font-bold text-sm">
                Bill
              </label>
            </div>
            <div className="relative">
              <i className="fa fa-usd absolute left-4 top-1/2 -translate-y-1/2 text-grayish-cyan"></i>
              <input
                id="bill"
                type="number"
                placeholder="0"
                value={bill}
                onChange={(e) => setBill(e.target.value)}
                className="w-full bg-very-light-grayish-cyan text-very-dark-cyan font-bold text-2xl text-right rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-strong-cyan cursor-pointer overflow-hidden placeholder-dark-grayish-cyan"
              />
            </div>
          </div>

          {/* Number of People */}
          <div className="mb-6 md:mb-0">
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="people" className="text-dark-grayish-cyan font-bold text-sm">
                Number of People
              </label>
            </div>
            <div className="relative">
              <i className="fa fa-user absolute left-4 top-1/2 -translate-y-1/2 text-grayish-cyan"></i>
              <input
                id="people"
                type="number"
                placeholder="0"
                value={numberOfPeople}
                onChange={(e) => setNumberOfPeople(e.target.value)}
                className="w-full bg-very-light-grayish-cyan text-very-dark-cyan font-bold text-2xl text-right rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-strong-cyan cursor-pointer placeholder-dark-grayish-cyan"
              />
            </div>
          </div>

          {/* Tip Selection */}
          <div className="mb-8 mt-6">
            <label className="text-dark-grayish-cyan font-bold text-sm mb-4 block">
              Select Tip %
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[5, 10, 15, 25, 50].map((tip) => (
                <button
                  key={tip}
                  onClick={() => {
                    setTipPercentage(tip);
                    setCustomTip("");
                  }}
                  className={`py-3 rounded text-lg md:text-xl font-bold transition-colors cursor-pointer ${tipPercentage === tip && customTip === ""
                    ? "bg-strong-cyan text-very-dark-cyan"
                    : "bg-very-dark-cyan text-white hover:bg-light-grayish-cyan hover:text-very-dark-cyan"
                    }`}
                >
                  {tip}%
                </button>
              ))}
              <input
                type="number"
                placeholder="Custom"
                value={customTip}
                onChange={(e) => {
                  setCustomTip(e.target.value);
                  setTipPercentage(null);
                }}
                className="w-full bg-very-light-grayish-cyan text-very-dark-cyan font-bold text-lg md:text-xl text-center md:text-right rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-strong-cyan cursor-pointer placeholder-dark-grayish-cyan"
              />
            </div>
          </div>
        </div>

        {/* Right Result Section */}
        <div className="bg-very-dark-cyan rounded-xl p-6 pt-10 pb-8 flex flex-col justify-between">
          <div className="flex flex-col gap-10">
            {/* Tip Amount */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-bold text-sm">Tip Amount</h3>
                <p className="text-grayish-cyan font-bold text-xs">/ person</p>
              </div>
              <div className="text-strong-cyan font-bold text-3xl md:text-4xl tracking-tight">
                ${tipAmount.toFixed(2)}
              </div>
            </div>

            {/* Total */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-bold text-sm">Total</h3>
                <p className="text-grayish-cyan font-bold text-xs">/ person</p>
              </div>
              <div className="text-strong-cyan font-bold text-3xl md:text-4xl tracking-tight">
                ${totalPerPerson.toFixed(2)}
              </div>
            </div>
          </div>

          <button
            onClick={handleReset}
            className={`w-full font-bold text-lg rounded py-3 mt-10 transition-colors uppercase ${billNum > 0 || peopleNum > 0 || tipPercentage || customTip
              ? "bg-strong-cyan text-very-dark-cyan hover:bg-light-grayish-cyan cursor-pointer"
              : "bg-strong-cyan/20 text-very-dark-cyan cursor-not-allowed"
              }`}
            disabled={!(billNum > 0 || peopleNum > 0 || tipPercentage || customTip)}
          >
            Reset
          </button>
        </div>
      </div>

      <div className="text-xs text-center mt-12 text-dark-grayish-cyan">
        Challenge by{" "}
        <a href="https://www.frontendmentor.io?ref=challenge" target="_blank" rel="noreferrer" className="text-very-dark-cyan hover:text-strong-cyan font-bold transition-colors">
          Frontend Mentor
        </a>
        . Coded by <a href="#" className="text-very-dark-cyan hover:text-strong-cyan font-bold transition-colors">Habeebah Olasubomi</a>.
      </div>
    </main>
  );
}

export default App;
