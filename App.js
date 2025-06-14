import React, { useState } from "react";

const defaultRows = [
  { horse: "", popularity: "", odds: "", winRate: 0, expectedValue: 0, judgement: "" },
];

const getWinRate = (popularity) => {
  const rates = {
    1: 0.32,
    2: 0.21,
    3: 0.15,
    4: 0.10,
    5: 0.07,
    6: 0.05,
    7: 0.04,
    8: 0.035,
    9: 0.03,
    10: 0.025,
  };
  return rates[parseInt(popularity)] || 0.02;
};

export default function ExpectedValueApp() {
  const [rows, setRows] = useState(defaultRows);

  const updateRow = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;

    const pop = parseInt(updated[index].popularity);
    const odds = parseFloat(updated[index].odds);
    const winRate = getWinRate(pop);
    const expectedValue = winRate * odds;
    const judgement = expectedValue >= 1 ? "◎買い" : "×見送り";

    updated[index].winRate = winRate;
    updated[index].expectedValue = expectedValue;
    updated[index].judgement = judgement;

    setRows(updated);
  };

  const addRow = () => {
    setRows([...rows, { horse: "", popularity: "", odds: "", winRate: 0, expectedValue: 0, judgement: "" }]);
  };

  const clearRows = () => {
    setRows(defaultRows);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">期待値算出アプリ</h1>
      <table className="w-full table-auto border border-gray-300 mb-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-1">馬名</th>
            <th className="border px-2 py-1">人気</th>
            <th className="border px-2 py-1">単勝オッズ</th>
            <th className="border px-2 py-1">想定勝率</th>
            <th className="border px-2 py-1">期待値</th>
            <th className="border px-2 py-1">判定</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              <td className="border px-2 py-1">
                <input
                  type="text"
                  value={row.horse}
                  onChange={(e) => updateRow(i, "horse", e.target.value)}
                  className="w-full border px-1"
                />
              </td>
              <td className="border px-2 py-1">
                <input
                  type="number"
                  value={row.popularity}
                  onChange={(e) => updateRow(i, "popularity", e.target.value)}
                  className="w-full border px-1"
                />
              </td>
              <td className="border px-2 py-1">
                <input
                  type="number"
                  value={row.odds}
                  onChange={(e) => updateRow(i, "odds", e.target.value)}
                  className="w-full border px-1"
                />
              </td>
              <td className="border px-2 py-1 text-center">{row.winRate.toFixed(3)}</td>
              <td className="border px-2 py-1 text-center">{row.expectedValue.toFixed(3)}</td>
              <td className="border px-2 py-1 text-center font-bold">
                {row.judgement === "◎買い" ? <span className="text-red-500">◎買い</span> : <span className="text-gray-500">×見送り</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex gap-2">
        <button onClick={addRow} className="bg-blue-500 text-white px-4 py-1 rounded">＋ 行を追加</button>
        <button onClick={clearRows} className="bg-gray-400 text-white px-4 py-1 rounded">クリア</button>
      </div>
    </div>
  );
}
