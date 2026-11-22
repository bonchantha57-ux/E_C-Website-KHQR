import React, { useState } from 'react';
import { Database, Key, Link2, Copy, Check, Code2, Layers, ArrowLeft, Table } from 'lucide-react';
import { ERD_TABLES, ERD_RELATIONSHIPS, SQL_SCHEMA } from '../data/erdData';

export default function ErdView({ onBackToShop }) {
  const [copied, setCopied] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);

  const handleCopySql = () => {
    navigator.clipboard.writeText(SQL_SCHEMA);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <button
            onClick={onBackToShop}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Shopping Flow</span>
          </button>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                E-Commerce Database Design & ERD
              </h1>
              <p className="text-xs sm:text-sm text-slate-500">
                Practical Exercise &bull; ទំនាក់ទំនងរវាង Tables ទាំង ៥: Customers, Categories, Products, Orders, Order_Items
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleCopySql}
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-black text-white text-xs sm:text-sm font-bold rounded-xl shadow-sm transition-all cursor-pointer"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Copied SQL Script!' : 'Copy SQL Schema (DDL)'}</span>
        </button>
      </div>

      {/* Relationships Overview */}
      <div className="bg-gradient-to-r from-indigo-500/10 via-blue-500/10 to-indigo-500/10 border border-indigo-200/80 rounded-2xl p-5">
        <h2 className="text-sm font-bold text-indigo-900 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Link2 className="w-4 h-4 text-indigo-600" />
          <span>Entity Relationships (ទំនាក់ទំនងរវាង Tables ទាំង ៥)</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {ERD_RELATIONSHIPS.map((rel, idx) => (
            <div key={idx} className="bg-white p-3.5 rounded-xl border border-indigo-100 shadow-2xs">
              <div className="flex items-center justify-between font-bold text-xs text-slate-800 mb-1">
                <span className="text-indigo-600">{rel.from}</span>
                <span className="bg-indigo-100 text-indigo-800 text-[10px] px-2 py-0.5 rounded-full font-mono font-extrabold">
                  {rel.type}
                </span>
                <span className="text-blue-600">{rel.to}</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-snug">{rel.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Database Tables Schema Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-600" />
            <span>5 Core Tables Schema Definition</span>
          </h2>
          <span className="text-xs text-slate-500">PK = Primary Key &bull; FK = Foreign Key</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ERD_TABLES.map((table) => (
            <div
              key={table.name}
              className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden shadow-xs hover:shadow-md ${
                selectedTable === table.name ? 'border-blue-500 ring-2 ring-blue-100' : 'border-slate-200'
              }`}
              onClick={() => setSelectedTable(table.name)}
            >
              {/* Table Header */}
              <div className="bg-slate-900 text-white p-3.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Table className="w-4 h-4 text-blue-400" />
                  <h3 className="font-bold text-sm tracking-wide font-mono">{table.name}</h3>
                </div>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
                  {table.columns.length} columns
                </span>
              </div>

              <div className="p-2 bg-slate-50 text-[11px] text-slate-500 border-b border-slate-100 font-medium px-3.5">
                {table.description}
              </div>

              {/* Table Columns */}
              <div className="divide-y divide-slate-100 text-xs">
                {table.columns.map((col) => (
                  <div key={col.name} className="p-2.5 px-3.5 flex items-center justify-between hover:bg-slate-50">
                    <div className="flex items-center gap-2 min-w-0">
                      {col.isPK && (
                        <span className="inline-flex items-center gap-0.5 bg-amber-100 text-amber-800 text-[9px] font-extrabold px-1.5 py-0.5 rounded shadow-2xs">
                          <Key className="w-2.5 h-2.5 text-amber-600" /> PK
                        </span>
                      )}
                      {col.isFK && (
                        <span className="inline-flex items-center gap-0.5 bg-blue-100 text-blue-800 text-[9px] font-extrabold px-1.5 py-0.5 rounded shadow-2xs">
                          <Link2 className="w-2.5 h-2.5 text-blue-600" /> FK
                        </span>
                      )}
                      <span className="font-semibold text-slate-800 truncate font-mono text-[11px]">{col.name}</span>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                        {col.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SQL Script Viewer */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="bg-slate-950 p-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2 text-slate-300">
            <Code2 className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-mono font-bold">schema.sql (Complete MySQL / PostgreSQL DDL)</span>
          </div>
          <button
            onClick={handleCopySql}
            className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Code'}</span>
          </button>
        </div>

        <div className="p-4 overflow-x-auto max-h-96">
          <pre className="text-xs font-mono text-emerald-400 leading-relaxed">
            <code>{SQL_SCHEMA}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
