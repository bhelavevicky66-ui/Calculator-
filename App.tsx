
import React, { useState, useCallback } from 'react';
import { LucideMenu, LucideMaximize2, LucideDelete } from 'lucide-react';

const App: React.FC = () => {
  const [currentVal, setCurrentVal] = useState<string>('0');
  const [prevExpr, setPrevExpr] = useState<string>('');
  const [lastOp, setLastOp] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState<boolean>(false);
  const [history, setHistory] = useState<{ expression: string; result: string }[]>([]);

  const performCalculation = (left: number, op: string, right: number): number => {
    switch (op) {
      case '+': return left + right;
      case '-': return left - right;
      case '×': return left * right;
      case '÷': return right !== 0 ? left / right : NaN;
      default: return right;
    }
  };

  const handleInput = useCallback((val: string) => {
    if (/[0-9]/.test(val)) {
      if (waitingForOperand || currentVal === '0') {
        setCurrentVal(val);
        setWaitingForOperand(false);
      } else {
        setCurrentVal(currentVal + val);
      }
      return;
    }

    if (val === '.') {
      if (waitingForOperand) {
        setCurrentVal('0.');
        setWaitingForOperand(false);
      } else if (!currentVal.includes('.')) {
        setCurrentVal(currentVal + '.');
      }
      return;
    }

    if (['+', '-', '×', '÷'].includes(val)) {
      const current = parseFloat(currentVal);
      if (lastOp && !waitingForOperand) {
        const result = performCalculation(parseFloat(prevExpr), lastOp, current);
        setPrevExpr(result + ' ' + val);
        setCurrentVal(String(result));
      } else {
        setPrevExpr(current + ' ' + val);
      }
      setLastOp(val);
      setWaitingForOperand(true);
      return;
    }

    if (val === '=') {
      if (!lastOp) return;
      const current = parseFloat(currentVal);
      const left = parseFloat(prevExpr);
      const result = performCalculation(left, lastOp, current);

      const newHistoryItem = {
        expression: `${prevExpr} ${currentVal} =`,
        result: String(result)
      };
      setHistory(prev => [newHistoryItem, ...prev]);

      setPrevExpr('');
      setCurrentVal(String(result));
      setLastOp(null);
      setWaitingForOperand(true);
      return;
    }

    if (val === 'C') {
      setCurrentVal('0');
      setPrevExpr('');
      setLastOp(null);
      setWaitingForOperand(false);
      return;
    }

    if (val === 'CE') {
      setCurrentVal('0');
      return;
    }

    if (val === 'backspace') {
      if (currentVal.length > 1) {
        setCurrentVal(currentVal.slice(0, -1));
      } else {
        setCurrentVal('0');
      }
      return;
    }

    if (val === '+/-') {
      setCurrentVal(String(parseFloat(currentVal) * -1));
      return;
    }

    if (val === '1/x') {
      setCurrentVal(String(1 / parseFloat(currentVal)));
      return;
    }

    if (val === 'x²') {
      setCurrentVal(String(Math.pow(parseFloat(currentVal), 2)));
      return;
    }

    if (val === '√x') {
      setCurrentVal(String(Math.sqrt(parseFloat(currentVal))));
      return;
    }

    if (val === '%') {
      setCurrentVal(String(parseFloat(currentVal) / 100));
      return;
    }
  }, [currentVal, prevExpr, lastOp, waitingForOperand]);

  const Button = ({ label, action, className = "" }: { label: string | React.ReactNode, action: string, className?: string }) => (
    <div onClick={() => handleInput(action)} className={`btn ${className}`}>
      {label}
    </div>
  );

  return (
    <div className="calc-app">
      <div className="main-calculator">
        <div className="header">
          <div className="flex items-center gap-4">
            <LucideMenu size={18} className="cursor-pointer" />
            <h1 className="text-xl font-semibold">Standard</h1>
            <LucideMaximize2 size={14} className="text-gray-500 cursor-pointer" />
          </div>
        </div>

        <div className="display-section">
          <div className="prev-expr">{prevExpr}</div>
          <div className="current-val">{currentVal}</div>
        </div>

        <div className="memory-row px-2">
          <div className="mem-btn">MC</div>
          <div className="mem-btn">MR</div>
          <div className="mem-btn">M+</div>
          <div className="mem-btn">M-</div>
          <div className="mem-btn">MS</div>
        </div>

        <div className="keypad">
          <Button label="%" action="%" className="btn-op" />
          <Button label="CE" action="CE" className="btn-op" />
          <Button label="C" action="C" className="btn-op" />
          <Button label={<LucideDelete size={18} />} action="backspace" className="btn-op" />

          <Button label={<span><sup>1</sup>/<sub>x</sub></span>} action="1/x" className="btn-op" />
          <Button label={<span>x<sup>2</sup></span>} action="x²" className="btn-op" />
          <Button label="²√x" action="√x" className="btn-op" />
          <Button label="÷" action="÷" className="btn-op text-2xl" />

          <Button label="7" action="7" className="btn-num" />
          <Button label="8" action="8" className="btn-num" />
          <Button label="9" action="9" className="btn-num" />
          <Button label="×" action="×" className="btn-op text-2xl" />

          <Button label="4" action="4" className="btn-num" />
          <Button label="5" action="5" className="btn-num" />
          <Button label="6" action="6" className="btn-num" />
          <Button label="−" action="-" className="btn-op text-2xl" />

          <Button label="1" action="1" className="btn-num" />
          <Button label="2" action="2" className="btn-num" />
          <Button label="3" action="3" className="btn-num" />
          <Button label="+" action="+" className="btn-op text-2xl" />

          <Button label="+/−" action="+/-" className="btn-num" />
          <Button label="0" action="0" className="btn-num" />
          <Button label="." action="." className="btn-num" />
          <Button label="=" action="=" className="btn-teal text-3xl" />
        </div>
      </div>

      <div className="sidebar">
        <div className="flex gap-4 mb-4">
          <div className="tab-btn active">History</div>
          <div className="tab-btn text-gray-500">Memory</div>
        </div>
        <div className="flex-1 overflow-y-auto p-2 scrollbar-thin">
          {history.length === 0 ? (
            <div className="flex flex-col justify-center items-center h-full text-gray-400">
              <p className="text-sm font-semibold">There's no history yet</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {history.map((item, index) => (
                <div key={index} className="flex flex-col items-end gap-1 p-2 hover:bg-gray-100 rounded cursor-pointer transition-colors">
                  <div className="text-sm text-gray-500">{item.expression}</div>
                  <div className="text-xl font-semibold text-gray-800">{item.result}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
