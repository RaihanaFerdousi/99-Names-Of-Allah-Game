import React from 'react';
import { names } from '../data/names';
import { SearchIcon, Heart } from 'lucide-react';

interface SearchModeProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  learnedNames: Set<number>;
  onMarkLearned: (id: number) => void;
}

export const SearchMode: React.FC<SearchModeProps> = ({
  searchQuery,
  onSearchChange,
  learnedNames,
  onMarkLearned
}) => {
  const filteredNames = names.filter(name => 
    name.arabic.includes(searchQuery) ||
    name.transliteration.toLowerCase().includes(searchQuery.toLowerCase()) ||
    name.meaning.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Search input */}
      <div className="relative mb-12">
        <SearchIcon className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
        <input
          type="text"
          placeholder="Search by Arabic, transliteration, or meaning..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-16 pr-6 py-5 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-amber-200 focus:border-amber-400 text-xl bg-white/80 backdrop-blur-sm shadow-lg transition-all duration-300"
        />
      </div>

      {/* Results count */}
      <div className="mb-10 text-center">
        <span className="bg-white/70 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg border border-gray-200 text-gray-700 font-semibold text-lg">
          {filteredNames.length} of 99 names
          {searchQuery && ` matching "${searchQuery}"`}
        </span>
      </div>

      {/* Results grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredNames.map((name) => (
          <div
            key={name.id}
            className="card-gradient rounded-2xl card overflow-hidden transform transition-all duration-300 hover:scale-105 animate-slideIn"
          >
            {/* Header */}
            <div className="text-white px-5 py-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-cyan-300/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <span className="text-xs font-bold">{name.id}</span>
                </div>
              </div>
              <button
                onClick={() => onMarkLearned(name.id)}
                className={`p-2 rounded-full transition-all duration-300 transform hover:scale-110 ${
                  learnedNames.has(name.id)
                    ? 'bg-red-500 text-white animate-pulse-gentle shadow-lg'
                    : 'bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm'
                }`}
                title={learnedNames.has(name.id) ? 'Learned!' : 'Mark as learned'}
              >
                <Heart className={`w-5 h-5 ${learnedNames.has(name.id) ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 text-center geometric-pattern">
              <h3 className="text-3xl arabic-text text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600 mb-3">
                {name.arabic}
              </h3>
              <p className="text-lg transliteration-text text-blue-700 mb-3">
                {name.transliteration}
              </p>
              <div className="w-12 h-0.5 bg-gradient-to-r from-amber-400 to-emerald-500 mx-auto mb-3"></div>
              <p className="text-gray-700 font-medium leading-relaxed">
                {name.meaning}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filteredNames.length === 0 && searchQuery && (
        <div className="text-center py-20">
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-gray-200 max-w-md mx-auto">
            <SearchIcon className="w-16 h-16 text-gray-400 mx-auto mb-6" />
            <p className="text-gray-600 text-xl font-semibold mb-3">No names found</p>
            <p className="text-gray-500">Try searching by Arabic text, transliteration, or meaning.</p>
          </div>
        </div>
      )}
    </div>
  );
};